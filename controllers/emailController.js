const mustache = require('mustache')
const fs = require('fs');

exports.index = async (req, res)  => {
    

    var from    = "noreply@oaktree.id";
    var to      = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;
    var data    = req.body.data;
    var template= req.body.template;

    const nodemailer = require("nodemailer");

    // try{
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.oaktree.id",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "noreply@oaktree.id", // generated ethereal user
                pass: "U_h1t9f5", // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
            
        });

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
        };

        if(template !== undefined){
            var template = fs.readFileSync(template,{encoding:'utf-8'});
            mailOptions.html = mustache.render(template, data)
        } else {
            mailOptions.text = message
        }

        await transporter.sendMail(mailOptions , (err, info) => {
            if(err){
                console.log(err);
            }
            res.json({
                status: "success",
                message: "Email successfully",
                data: info
            })
        });

        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    // } catch(err){
    //     console.log(err)
    //     res.status(500).send(err)
    // }
    
     
}