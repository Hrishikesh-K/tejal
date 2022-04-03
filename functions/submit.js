import {AkismetClient} from 'akismet-api'
import {Client} from 'faunadb'
import {Collection} from 'faunadb/query'
import {Create} from 'faunadb/query'
import {SMTPClient} from 'emailjs'
export async function handler({headers, body}) {
  const {email, message, name, subject} = JSON.parse(body)
  const {AKISMET, FAUNA, SMTP_PASSWORD, SMTP_RECEIVER, SMTP_USERNAME} = process.env
  function response(data, status) {
    return {
      body: JSON.stringify(data),
      statusCode: status
    }
  }
  return new AkismetClient({
    blog: 'https://www.tejalshinde.com/',
    key: AKISMET
  }).checkSpam({
    content: message,
    email,
    ip: headers['x-nf-client-connection-ip'],
    name,
    referrer: headers['referrer'],
    useragent: headers['user-agent']
  }).then(spam => {
    return new Client({
      secret: FAUNA
    }).query(Create(Collection('Submissions'), {
      data: {
        email,
        message,
        name,
        spam,
        subject
      }
    })).then(() => {
      if (spam) {
        return response({
          spam,
          success: true
        }, 200)
      } else {
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
            spam,
            success: true
          }, 200)
        }).catch(error => {
          return response({
            error,
            spam,
            stage: 'email',
            success: false
          }, 500)
        })
      }
    }).catch(error => {
      return response({
        error,
        spam,
        stage: 'database',
        success: false
      }, 500)
    })
  }).catch(error => {
    return response({
      error,
      spam: false,
      stage: 'spam',
      success: false
    }, 500)
  })
}