const twilio = require("twilio");

exports.handler = async (event) => {

  try {

    if (!event.body) {
      throw new Error("No payload received");
    }

    const payload = JSON.parse(event.body);

    const phone = payload.phone;
    const subject = payload.subject || "Email Received";

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const result = await client.messages.create({

      from: "whatsapp:+14155238886",

      to: `whatsapp:${phone}`,

      body:
`Hello,

Thank you for contacting us.

We have received your email.

Subject: ${subject}

Our team will contact you shortly.

Regards`
    });

    console.log("Message SID:", result.sid);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        sid: result.sid
      })
    };

  } catch (error) {

    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };

  }

};