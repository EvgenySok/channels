// const nodemailer = require('nodemailer')
// const mg = require('nodemailer-mailgun-transport')

// require('dotenv').config()

// const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env

// const nodemailerMailgun = nodemailer.createTransport(
//   mg({
//     auth: {
//       api_key: MAILGUN_API_KEY,
//       domain: MAILGUN_DOMAIN,
//     },
//   })
// )

// const sendMailToCompleteRegistration = (mail, linc) => {
//   const message = `To confirm registration, follow the link or ignore this message. ${linc}`

//   const mailOpts = {
//     from: `office@${MAILGUN_DOMAIN}.com`,
//     to: mail,
//     subject: 'test subject',
//     text: message,
//     html: `<b>${message}</b>`,
//   }

//   nodemailerMailgun.sendMail(mailOpts, (err, response) => {
//     if (err) {
//       // response.message = "Mail error.";
//       console.log(err, response)
//     } else {
//       // response.message = "Mail send.";
//       console.log(err, response)
//     }
//   })

// }

// exports.sendMailToCompleteRegistration = sendMailToCompleteRegistration
const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env

const mailgun = require('mailgun-js')({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN })

const sendMailToCompleteRegistration = (mail, linc) => {
  const message = `To confirm registration, follow the link or ignore this message. ${linc}`

  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: mail,
    subject: 'Hello',
    text: `<b>${message}</b>`,
  }

  mailgun.messages().send(data, (error, body) => {
    
    console.log(error)
    console.log(body)
  })
}

exports.sendMailToCompleteRegistration = sendMailToCompleteRegistration
