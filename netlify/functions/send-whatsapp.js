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

    console.log(
      "Received Payload:",
      JSON.stringify(payload, null, 2)
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Payload received",
        data: payload
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