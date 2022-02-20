import {Client} from 'faunadb'
import {Collection, Create} from 'faunadb/query'
import {SMTPClient} from 'emailjs'
export async function handler({body}) {
  const {email, message, name, subject} = JSON.parse(body)
  const {FAUNA, SMTP_PASSWORD, SMTP_RECEIVER, SMTP_USERNAME} = process.env
  function response(data, status) {
    return {
      body: JSON.stringify(data),
      statusCode: status
    }
  }
  return new Client({
    secret: FAUNA
  }).query(Create(Collection('Submissions'), {
    data: {
      email,
      message,
      name,
      subject
    }
  })).then(() => {
    return new SMTPClient({
      host: 'smtp-relay.sendinblue.com',
      password: SMTP_PASSWORD,
      port: 587,
      tls: true,
      user: SMTP_USERNAME
    }).sendAsync({
      from: `${name} <${email}>`,
      'reply-to': `${name} <${email}>`,
      subject,
      text: message,
      to: SMTP_RECEIVER
    }).then(() => {
      return response({
        success: true
      }, 200)
    }).catch(error => {
      return response({
        error,
        stage: 'email',
        success: false
      }, 500)
    })
  }).catch(error => {
    return response({
      error,
      stage: 'database',
      success: false
    }, 500)
  })
}