const nodemailer = require("nodemailer")

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.STMP_PASSWORD
      },
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта" + process.env.API_URL,
      text: "",
      html:
        `
          <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
          </div>
        `,
      dsn: {
        id: 'some random message specific id',
        return: 'headers',
        notify: ['failure', 'delay'],
        recipient: 'sender@example.com'
      }
    })
  }
}

module.exports = new MailService()