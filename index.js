const rwClient = require("./twitterClient");

const tweet = async () => {
  try {
    const response = await rwClient.v1.tweet(
      "This tweet was sent from Node.js using the Twitter API 🤓"
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

tweet();
