const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Contact = require("../models/contactModel.js");
const dotenv = require("dotenv").config();
const mailController =  require("./mailController.js");

const contactUsRegister = asyncHandler(async (req, res, next) => {
  console.log("Request Body:", req.body);
  const { name, email, service, phone,message } = req.body;
  if (!name || !email || !service || !phone) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }
 try{
  const contact = await Contact.create({
    name,
    email,
    service,
    phone,
    message
  });
 
  // mailController.mailOptions.to = [email,"hrshptl299@gmail.com","pristinehighprofileservice@gmail.com"];
  // mailController.mailOptions.subject = service;
  // mailController.mailOptions.html = `<b><lable style="color:black">Name:<lable>${name}<br>
  // <lable style="color:black">Email:<lable>${email}<br>
  // <lable style="color:black">phone:<lable>${phone}<br>
  // <lable style="color:black">Service:<lable>${service}<br>
  // <lable style="color:black">Message:<lable>${message}<b>`;
  // mailController.sendEmail(mailController.transporter,mailController.mailOptions);
  // res.status(200).json({ message: "message sent  successfull!.", contact });

  mailController.mailOptions.to = [email, "hrshptl299@gmail.com", "pristinehighprofileservice@gmail.com"];
mailController.mailOptions.subject = service;
mailController.mailOptions.html = `
  <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
      <div style="padding: 20px; border: 1px solid #ccc; border-radius: 5px; max-width: 600px; margin: auto;">
        <h2 style="color: #333;">Contact Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
      </div>
    </body>
  </html>
`;
mailController.sendEmail(mailController.transporter, mailController.mailOptions);
res.status(200).json({ message: "Message sent successfully!", contact });

}catch(error)
{
  res.status(404).json({message : "Something wrong!", error});
}
});


module.exports = {contactUsRegister}; 