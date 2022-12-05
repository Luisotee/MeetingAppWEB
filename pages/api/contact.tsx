import { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();

const PASSWORD = process.env.PASSWORD;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    port: 465,
    service: "gmail",
    auth: {
      user: "meetingappupxaf@gmail.com",
      pass: process.env.PASSWORD,
    },
    secure: true,
  });

  send();

  console.log(req.body);

  await new Promise((resolve, reject) => {
    transporter.verify(function (error: any, sucess: any) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(sucess);
      }
    });
  });

  async function send() {
    console.log("dentro do send: ", req.body);

    if (req.body != null) {
      const result = await transporter.sendMail({
        from: "meetingappupxaf@gmail.com",
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message,
      });
      console.log(JSON.stringify(result, null, 4));
    }
  }

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(send, (err: any, info: any) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  console.log(res);
  res.send(200);
};
