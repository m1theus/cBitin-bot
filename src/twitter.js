import fs from 'fs';
import Twitter from 'twitter';
import {
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} from './config.js';

const discordUsers = JSON.parse(
  fs.readFileSync('src\\data\\discord_users.json')
);
const twitterUsers = JSON.parse(
  fs.readFileSync('src\\data\\twitter_users.json')
);

export const start = (discordClient) => {
  const client = new Twitter({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token_key: TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  });

  twitterUsers.forEach((user) =>
    createTweetStream(user, client, discordClient)
  );
};

const createTweetStream = (twitterUser, twitterClient, discordClient) => {
  const channel = discordClient.channels.cache.find(
    (channel) => channel.name === 'cbitin-bot'
  );

  twitterClient.stream('statuses/filter', { follow: twitterUser }, (stream) => {
    stream.on('data', ({ id_str, user }) => {
      if (twitterUsers == user.id_str) {
        const tweetMessage = `https://twitter.com/${user.screen_name}/status/${id_str}`;
        channel.send(tweetMessage);
        sendMessageUser(discordClient, tweetMessage);
      }
    });
    stream.on('error', (error) => {
      console.log(`c=Twitter m=onError error=${error}`);
    });
  });
};

const sendMessageUser = async (discordClient, message) => {
  discordUsers.forEach((user) => {
    discordClient.users.fetch(user, false).then((user) => {
      user.send(message);
    });
  });
};
