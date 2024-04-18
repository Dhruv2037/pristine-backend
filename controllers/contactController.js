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
 
  mailController.mailOptions.to = [email,"dhruvpatel16122037@gmail.com"];
  mailController.mailOptions.subject = service;
  mailController.mailOptions.html = `<b><lable style="color:black">Name:<lable>${name}<br>
  <lable style="color:black">Email:<lable>${email}<br>
  <lable style="color:black">phone:<lable>${phone}<br>
  <lable style="color:black">Service:<lable>${service}<br>
  <lable style="color:black">Message:<lable>${message}<b>`;
  mailController.sendEmail(mailController.transporter,mailController.mailOptions);
  res.status(200).json({ message: "message sent  successfull!.", contact });
}catch(error)
{
  res.status(404).json({message : "Something wrong!", error});
}
});


module.exports = {contactUsRegister}; 