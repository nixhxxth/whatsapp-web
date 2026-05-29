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

    const payload =
      JSON.parse(event.body);

    const {
      sender,
      subject,
      phone
    } = payload;

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const messageText =

`Hello,

Thank you for contacting us.

We have received your email.

Subject: ${subject}

Our team will get back to you shortly.

Regards`;

    const result =
      await client.messages.create({

        from:
          process.env
          .TWILIO_WHATSAPP_NUMBER,

        to:
          `whatsapp:${phone}`,

        body:
          messageText

      });

    console.log(
      "WhatsApp Sent:",
      result.sid
    );

    return {

      statusCode: 200,

      body: JSON.stringify({

        success: true,

        sid: result.sid,

        phone: phone

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