// Monitoring Using API (Also Live Streaming)

import * as dotenv from "dotenv";
// import notifier from "node-notifier";
// import open from "open";
import Twit from "twit";
dotenv.config();

const apiKey = process.env.apiKey;
const apiSecretKey = process.env.apiSecretKey;
const accessToken = process.env.accessToken;
const accessTokenSecret = process.env.accessTokenSecret;

// Create establish connection with Twitter API using Twit through OAuth
let T = new Twit({
  consumer_key: apiKey,
  consumer_secret: apiSecretKey,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
});

// !1.GET RECENT TWEETS
(async () => {
  // let recentTweets = await T.get(
  //   "search/tweets",
  //   { q: "#tech since:2020-04-15", count: 100 },
  //   function (err, data, response) {
  //     const tweets = data.statuses
  //       // .map((tweet) => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
  //       // .map(tweet => tweet.text)
  //       .filter((tweet) => tweet.toLowerCase().includes("web"));
  //     console.log(tweets);
  //   });
  // !2.REAL TIME MONITORING USING STREAM (HASHTAG)
  // !NOT WORKING BECAUSE I HAVE TO USE V2 FILTERED AND SAMPLE VOLUME STREAM AS ALTERNATIVES

  // let stream = T.stream("statuses/filter", { track: "#tech" });
  // stream.on("tweet", function (tweet) {
  //   console.log(tweet.text);
  //   console.log("LANG: ", franc(tweet.text));
  //   console.log("---------------------------------");
  // });

  // !3. REAL TIME MONITORING USING STREAM (LOCATION)
  // !NOT WORKING BECAUSE I HAVE TO USE V2 FILTERED AND SAMPLE VOLUME STREAM AS ALTERNATIVES

  var sanFrancisco = ["-122.75", "36.8", "-121.75", "37.8"];
  var stream = T.stream("statuses/filter", { locations: sanFrancisco });

  //SHOW NOTIFICATION FOR EACH RECEIVED TWEET
  stream.on("tweet", function (tweet) {
    console.log(tweet.text);
    let url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

    notifier.notify({
      title: tweet.user.name,
      message: tweet.text,
    });

    notifier.on("click", async function (notifierObject, options, event) {
      console.log("clicked");
      await open(url);
    });
  });
})();
