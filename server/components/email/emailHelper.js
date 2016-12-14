'use strict';

import config from '../../config/environment';
import nodemailer from 'nodemailer';



/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function sendEmail(email, ccTo, subject, body, filename, path, cid) {
  
var smtpConfig = {
    service: 'gmail',
    auth: {
        user: config.email.user,
        pass: config.email.pass
    },
    tls: {
        rejectUnauthorized: false
    }
};

var transporter = nodemailer.createTransport(smtpConfig);


   var mailOptions = {
        from: config.email.emailHead+' <'+config.email.fromEmail+'>', // sender address 
        to: email, // list of receivers 
        cc: ccTo, // list of cc members array
        bcc: [config.email.bcc], // list of bcc members array
        subject: subject, // Subject line 
        html: body
    };

    if(filename){
        mailOptions.attachments=[{
        filename: fileName,
        path: path,
        cid: cid //same cid value as in the html img src
    }];

    }
      
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error);
            return error;
        }else{
          console.log(info.response);
         return info.response; 
        }
    });

}


exports.sendEmail = sendEmail;