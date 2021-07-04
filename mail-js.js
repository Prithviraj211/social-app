const nodemailer = require('nodemailer')
const { google } = require('googleapis');

const CLIENT_ID = '808915853553-cvkqh3u3bnbbhjcql5nhgud5sia1jir6.apps.googleusercontent.com';
const CLEINT_SECRET = 'SxDIKYm0cRXXvdYtWltaNAfk';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04dI2F7XNu5wuCgYIARAAGAQSNwF-L9IrW0Tv6rgGLcK_aUXc5hlJRxcN0C3Z27GUtH96zG8nqZMEGNg5Xfo11HLtJ21IdyYbCT4';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const accessToken =  oAuth2Client.getAccessToken();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: 'singhprithviraj300@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
})

let mail = mailOptions => {

    return new Promise((resolve, reject) => {
        let o = Object.assign({}, {from: `"Social Media App" <${process.env.MAIL}>`,}, mailOptions )
     
        transporter.sendMail(o, (err, res) => {
            err ? reject(err) : resolve('Mail sent..Check your inbox..')
        })
    })
}

module.exports = mail
