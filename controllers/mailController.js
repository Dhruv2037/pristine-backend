const nodemailer =  require("nodemailer");
const env = require("dotenv").config();



const transporter = nodemailer.createTransport({
    service : "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.App_Password,
    },
  });

  const mailOptions =  {
    from: {
        name:"Pristine Highlights",
        address : process.env.USER
    }, // sender address
   // to: ["dhruvpatel16122037@gmail.com","premkarthik66@gmail.com"], // list of receivers
    subject: "test", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }



  const sendEmail = async (transporter,mailOptions) =>{
    try{
        console.log(transporter,mailOptions);
        await transporter.sendMail(mailOptions);
        console.log("mail has been sent");
    }catch(error)
    {
        console.log(error);
    }
  };


  
  module.exports = {transporter,mailOptions,sendEmail};

