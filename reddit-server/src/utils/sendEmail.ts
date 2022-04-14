import nodemailer from "nodemailer";

export async function sendEmail(to: string, text: string) {
  //   let testAccount = await nodemailer.createTestAccount();

  //   console.log("testAccount", testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "nddcq6k5fmjrae2o@ethereal.email", // generated ethereal user
      pass: "kdC4nx8pyJ5QyPn1Fh", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Reddit 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: "Change Password Mail", // Subject line
    html: text,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
