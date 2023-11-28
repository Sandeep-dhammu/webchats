import nodemailer from "nodemailer";

const nodeMailConfig = {
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "31fec053576496",
    pass: "9f538c25e2d872",
  },
};

const sendEmail = (email) => {
  const transport = nodemailer.createTransport(nodeMailConfig);

  const mailOptions = {
    from: "Web Chat <bihesy@socam.me>",
    to: email.toMail,
    subject: email.subject,
    html: email.body,
  };

  const response = transport.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    if (info) console.log(info);
  });
};

export default sendEmail;
