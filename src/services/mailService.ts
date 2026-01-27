import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export class MailService {
    static async sendPasswordResetEmail(email: string, token: string) {
        const resetUrl = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

        const mailOptions = {
            from: `"Gestão NewTech" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: 'Recuperação de Senha - Sistema de Gestão',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #2563eb; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Recuperação de Senha</h1>
                    </div>
                    <div style="padding: 30px; line-height: 1.6; color: #333;">
                        <p>Olá,</p>
                        <p>Recebemos um pedido para redefinir a senha da sua conta no Sistema de Gestão NewTech.</p>
                        <p>Para prosseguir com a redefinição, clique no botão abaixo:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Redefinir Senha</a>
                        </div>
                        <p>Se você não solicitou esta redefinição, ignore este e-mail. Este link é válido por 1 hora.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                        <p style="font-size: 12px; color: #999;">Esta é uma mensagem automática, por favor não responda.</p>
                    </div>
                </div>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            return { success: true };
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, error };
        }
    }
}
