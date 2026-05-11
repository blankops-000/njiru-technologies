export interface INotificationProvider {
  send(to: string, message: string, options?: any): Promise<boolean>;
}

export interface ISmsProvider extends INotificationProvider {}
export interface IEmailProvider {
  sendEmail(to: string, subject: string, html: string): Promise<boolean>;
}
export interface IWhatsAppProvider extends INotificationProvider {
  sendTemplate(to: string, templateName: string, params: any[]): Promise<boolean>;
}
