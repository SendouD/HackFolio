const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jananathan.m22@iiits.in',
        pass: 'otcc afkt puer wdca'
    }
});

async function donation_success(recieverID, amount) {
    

    const info = await transporter.sendMail({
      from: `"hackfolio " <jananathan.m22@iiits.in>`,
      to: `${recieverID}`,
      subject: "Confirmation of Donation ",
      text: `Your Donation of RS ${amount} is successful the receipt is attached with this Mail . Thank You for being a part of making a change :>`,
    });
    
  
  }
  module.exports={donation_success}