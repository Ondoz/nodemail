
exports.index = async (req, res)  => {
    

    var from    = "noreply@oaktree.id";
    var to      = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;
    const nodemailer = require("nodemailer");

    try{
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.oaktree.id",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "noreply@oaktree.id", // generated ethereal user
                pass: "U_h1t9f5", // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
            
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            html: message, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.json({
            status: "success",
            message: "Email successfully",
            data: null
        })  
    } catch(err){
        console.log(err)
        res.status(500).send(err)
    }
    
     
}