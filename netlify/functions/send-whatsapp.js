const twilio = require("twilio");

exports.handler = async (event) => {

  try {

    const payload = JSON.parse(event.body);

    const phone = payload.phone;

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const result =
      await client.messages.create({

        from:
          process.env.TWILIO_WHATSAPP_NUMBER,

        contentSid:
          process.env.TWILIO_CONTENT_SID,

        contentVariables:
          JSON.stringify({
            1: payload.subject || "Email Received"
          }),

        to:
          `whatsapp:${phone}`

      });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        sid: result.sid
      })
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };

  }

};