
class Mailgun {

    constructor() {
        this.apiKey = 'key-';
        this.domain = 'sandboxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.mailgun.org';
        this.mailgun = require('mailgun-js')({ apiKey: this.apiKey, domain: this.domain });
    }
    // Send email with html template
    sendEmailWithTemplate(to, subject, template, data) {
        const mailgun = this.mailgun;
        const mailData = {
            from: 'Excited User <>',
            to: to,
            subject: subject,
            html: template(data)
        };
        return new Promise((resolve, reject) => {
            mailgun.messages().send(mailData, function (error, body) {
                if (error) {
                    reject(error);
                }
                resolve(body);
            });
        }
    }
}