
// jshint esversion: 6
/*
 handlePushEvent
*/
var nodemailer = require('nodemailer');

function main({
  repository: {
    url: repo_url,
    full_name
  },
  head_commit: {message, author: {email: from_email, name: from_name, username: from_username}},
  ref,
  before,
  after,
  compare,
  commits = [],
  email_to,
  email_username,
  email_password
}) {
  var from, subject, email_body = "";

  subject = `${full_name} git commit: ${message}`;

  email_body += `Repository: ${full_name}\n`;
  email_body += `Branch: ${ref} ${before} -> ${after}\n`;
  email_body += `Project: ${repo_url}\n`;
  email_body += `Compare: ${compare}\n\n`;

  commits.forEach((commit) => {
    email_body += `Commit: ${commit.message}\n`;
    email_body += `Diff: ${commit.url}\n`;
    email_body += `Tree: ${repo_url}/tree/${commit.id}\n`;
    email_body += `Author: ${commit.author.name} ${commit.author.email} ${commit.author.username}\n`;
    email_body += `Committer: ${commit.committer.name} ${commit.committer.email} ${commit.committer.username}\n\n`;
  });

  return sendCommitEmail({
    from: `"${from_name}:${from_username}" <${from_email}>`,
    to: email_to,
    subject: subject,
    text: email_body,
    username: email_username,
    password: email_password
  });

}

function sendCommitEmail({
  username: username,
  password: password,
  smtp: smtp = 'smtp.gmail.com',
  from: from,
  to: to,
  subject: subject,
  text: text,
  html: html
}) {

  const url = `smtps://${username}:${password}@${smtp}`;
  const transporter = nodemailer.createTransport(url);

  function sendEmail(resolve, reject) {
    transporter.sendMail(
      {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
      }, (error, info) => {
        if (error) {
          console.error(`error sending email ${error}`);
          reject(JSON.stringify(error));
        } else {
          console.log(`Message sent:  ${info.response}`);
          resolve({ info: info });
        }
      });
  }
  return new Promise(sendEmail);
}

