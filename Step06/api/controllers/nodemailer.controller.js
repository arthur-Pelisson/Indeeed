const nodemailer = require('nodemailer');

//function send mail with data of poeple

//je sius trop fort
exports.mail = (messageData) => {

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "750e1a6dee67e6",
          pass: "9529239cbd771f"
        }
      });
    
    const message = {
        from: messageData.email, 
        to: 'to@email.com',
        subject: 'Apply for job',
        html: `<h1>${messageData.name}</h1><br><p>${messageData.texte}</p><br><h3>Tel: ${messageData.telephone}</h3>`
    };

    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
};

