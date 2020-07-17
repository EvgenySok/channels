const { MAILGUN_API_KEY, DOMAIN } = process.env

const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_KEY,
  domain: DOMAIN,
  host: 'api.eu.mailgun.net',
})

const sendMailToCompleteRegistration = (mail, linc) => {
  const message = `To confirm registration, follow the link or ignore this message. ${linc}`

  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: mail,
    subject: 'Hello',
    text: message,
  }

  mailgun.messages().send(data, (error, body) => {
    console.log('error',error)
    console.log('body',body)
  })
}

exports.sendMailToCompleteRegistration = sendMailToCompleteRegistration
