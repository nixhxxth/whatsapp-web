exports.handler = async (event) => {

  try {

    const payload =
      JSON.parse(event.body);

    console.log(
      "Received Payload:",
      payload
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