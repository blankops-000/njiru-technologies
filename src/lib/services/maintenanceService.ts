import prisma from '../prisma';
import { z } from 'zod';
import { createMaintenancePlanSchema, updateMaintenancePlanSchema } from '../validators/maintenance';
import { NotificationService } from './notificationService';

export class MaintenanceService {
  static async createPlan(data: z.infer<typeof createMaintenancePlanSchema>) {
    return await prisma.maintenancePlan.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        nextBillingDate: new Date(data.nextBillingDate),
        status: 'active',
      },
    });
  }

  static async updatePlan(id: string, data: z.infer<typeof updateMaintenancePlanSchema>) {
    const updateData: any = { ...data };
    if (data.nextBillingDate) updateData.nextBillingDate = new Date(data.nextBillingDate);
    if (data.endDate) updateData.endDate = new Date(data.endDate);

    return await prisma.maintenancePlan.update({
      where: { id },
      data: updateData,
    });
  }

  static async checkRenewals() {
    // Find plans due in <= 7 days
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const plans = await prisma.maintenancePlan.findMany({
      where: {
        status: 'active',
        nextBillingDate: {
          lte: sevenDaysFromNow,
        },
      },
      include: { contact: true },
    });

    for (const plan of plans) {
      await NotificationService.notifyAdmin(
        `Upcoming Renewal: Plan for ${plan.contact.fullName} is due on ${plan.nextBillingDate.toISOString().split('T')[0]}`
      );
    }

    return plans.length;
  }
}
