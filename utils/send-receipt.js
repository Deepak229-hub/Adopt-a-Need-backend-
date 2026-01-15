import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
    },
});

export default async function sendReciept(payment) {
    const html = `
        <h2>Thank you for your donation ❤️</h2>
        <p><b>Name: </b>${payment.name}</p>
        <p><b>Email: </b>${payment.email}</p>
        <p><b>Amount: </b>${payment.amount}</p>
        <p><b>Transaction ID: </b>${payment.payment_id}</p>
        <p><b>Domain: </b>${payment.domain}</p>
        <p><b>Date: </b>${new Date(payment.date).toLocaleString("en-IN")}</p>
        <hr />
        <p>Adopt-a-Need Foundation</p>
    `;

    await transporter.sendMail({
        from: `"Adopt-a-Need" <${process.env.EMAIL_ID}>`,
        to: payment.email,
        subject: "Your Donation Receipt",
        html,
    });
};