import Discord from 'discord.js';
import { TOKEN } from './config.js';
import { start } from './twitter.js';

export default class Bot {
  constructor() {}

  start() {
    const client = new Discord.Client();
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
      start(client);
    });

    client.on('message', (msg) => {
      if (msg.content === 'ping') {
        msg.reply('Pong!');
      }
    });

    client.login(TOKEN);
  }
}
