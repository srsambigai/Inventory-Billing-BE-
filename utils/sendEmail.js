const nodemailer = require("nodemailer");

exports.sendEmail = async (receiverEmail, subject, emailContent) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:"srsambigai@gmail.com",
        pass:process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from:"srsambigai@gmail.com",
      to: receiverEmail,
      subject: subject,
      text: JSON.stringify(emailContent),
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log("Error while sending email");
    return false;
  }
};