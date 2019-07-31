const functions = require('firebase-functions');
const nodemailer= require('nodemailer');

const gmailEmail= functions.config().gmail.email;
const gmailPassword= functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
//host: 'smtp.gmail.com'
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  }
});

function sendmail(name, email, message,phone){

  var mailOptions={
    from: gmailEmail,
    to: gmailEmail,
    subject:'New form submitted',
    html:`<h1>New Contact Request</h1>
    <h3>Name</h3>
    <p>${name}</p>
    <h3>Email</h3>
    <p>${email}</p>
    <h3>Message</h3>
    <p>${message}</p>
    <h3>Phone</h3>
    <p>${phone}</p>`
  };

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        console.log(error);
      }
      else {
        console.log('Email sent:' + info.response);
      }
    });
};

exports.sendEmails = functions.database.ref('/messages/{name}').onCreate((snapshot, context) =>{
  const val = snapshot.val();
  const name = val.name;
  const email= val.email;
  const message= val.message;
  const phone = val.phone;
  sendmail(name, email, message,phone);
  return null;
});
