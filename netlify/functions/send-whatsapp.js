const twilio = require("twilio");

exports.handler = async (event) => {
  try {

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "No payload received"
        })
      };
    }

    const payload = JSON.parse(event.body);

    const phone = payload.phone;
    const subject = payload.subject;

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const fromNumber =
      process.env.TWILIO_WHATSAPP_NUMBER;

    const toNumber =
      `whatsapp:+917200524344`;

    console.log("FROM =", fromNumber);
    console.log("TO =", toNumber);

    const result =
      await client.messages.create({

        from: fromNumber,

        to: toNumber,

        body:
`Hello,

Thank you for contacting us.

We have received your email.

Subject: ${subject}

Our team will get back to you shortly.

Regards`
      });

    console.log(
      "Message SID:",
      result.sid
    );

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