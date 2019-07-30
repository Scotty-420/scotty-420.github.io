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

function sendmail(name, email, message){

  var mailOptions={
    from: gmailEmail,
    to: gmailEmail,
    subject:'New form submitted',
  //  html:<h1>New form Submitted:{{newMessageRef}}</h1>

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
  sendmail(name, email, message);
  return null;
});
