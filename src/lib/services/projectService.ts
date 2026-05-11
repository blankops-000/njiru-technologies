import prisma from '../prisma';
import { z } from 'zod';
import { createProjectSchema, updateProjectSchema } from '../validators/project';
import { inngest } from '@/queues/inngest/client';
import { ConflictError, NotFoundError } from '../utils/errors';

export class ProjectService {
  static async createProject(data: z.infer<typeof createProjectSchema>) {
    // Generate slug from title if not provided
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    return await prisma.project.create({
      data: {
        ...data,
        slug,
        status: 'discovery',
        startDate: data.startDate ? new Date(data.startDate) : null,
        deadline: data.deadline ? new Date(data.deadline) : null,
      },
    });
  }

  static async changeStatus(projectId: string, newStatus: string, actorId?: string) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { invoices: true }
    });

    if (!project) throw new NotFoundError('Project not found');

    const oldStatus = project.status;

    // Validate transition: discovery -> design requires paid deposit
    if (oldStatus === 'discovery' && newStatus === 'design') {
      const hasPaidDeposit = project.invoices.some(inv => inv.status === 'paid');
      if (!hasPaidDeposit) {
        throw new ConflictError('Deposit not paid. Cannot transition to design.');
      }
    }

    // Update status
    const updated = await prisma.project.update({
      where: { id: projectId },
      data: { status: newStatus },
    });

    // Audit log
    await prisma.projectActivity.create({
      data: {
        projectId,
        actorId,
        action: 'STATUS_CHANGED',
        oldValue: oldStatus,
        newValue: newStatus,
        description: `Status changed from ${oldStatus} to ${newStatus}`,
      },
    });

    // Fire Inngest event for client notification (e.g. delivery milestone)
    if (newStatus === 'delivered') {
      await inngest.send({
        name: 'project.status.changed',
        data: { projectId, newStatus, contactId: project.contactId },
      });
    }

    return updated;
  }

  static async updateProject(id: string, data: z.infer<typeof updateProjectSchema>, actorId?: string) {
    if (data.status) {
      // Use specialized method for status changes to ensure rules are enforced
      await this.changeStatus(id, data.status, actorId);
      delete data.status;
    }

    if (Object.keys(data).length === 0) {
      return prisma.project.findUnique({ where: { id }});
    }

    const updateData: any = { ...data };
    if (data.startDate) updateData.startDate = new Date(data.startDate);
    if (data.deadline) updateData.deadline = new Date(data.deadline);
    if (data.actualDeliveryDate) updateData.actualDeliveryDate = new Date(data.actualDeliveryDate);

    return await prisma.project.update({
      where: { id },
      data: updateData,
    });
  }
}
