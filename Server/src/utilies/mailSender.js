// here we send our otp through mail id
// we write the logic from otp mailSender
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
// here we receive information  otp via mail 
const mailSender = async(email , title , body) => {
    // create Transporter --> as because of that nodemailer don't know where and how to send the mail and connect to the mail server
    const transporter = nodemailer.createTransport({
        service : 'gmail', // which email service you used like(outlook , gmail,yahoo..)
        auth : { // how you authenticate
            user : process.env.EMAIL,
            pass : process.env.PASSWORD
        }
    })
    // how to send mail 
     const mailOptions = {
        from : process.env.EMAIL,
        to : email,
        subject : title,
        html : body
    }
    console.log(mailOptions);
    // response
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email Sent: ${info.response}`);

    return info; 
}
export default mailSender;