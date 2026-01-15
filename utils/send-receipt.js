import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendReciept(payment) {
    const result = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: payment.email,
        subject: "Your Donation Receipt",
        html: `
            <h2>Thank you for your donation ❤️</h2>
            <p><b>Name: </b>${payment.name}</p>
            <p><b>Email: </b>${payment.email}</p>
            <p><b>Amount: </b>${payment.amount}</p>
            <p><b>Transaction ID: </b>${payment.payment_id}</p>
            <p><b>Domain: </b>${payment.domain}</p>
            <p><b>Date: </b>${new Date(payment.date).toLocaleString("en-IN")}</p>
            <hr />
            <p>Adopt-a-Need Foundation</p>
        `
    });

    console.log(result);
    
};