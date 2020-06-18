const tmi = require('tmi.js');
require('dotenv').config();

// Define configuration options
const opts = {
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// create client with the options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// connect to Twitch
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim().toLowerCase();

  // !bedjes
  if (commandName === '!bedjes') {
    const num = scoreBedjes(commandName);
      if (num <= 1) {
        client.say(target, `/me geeft dit maar ${num} bedje, sorry.`);
        console.log(`* Executed ${commandName}`);
      } else {
        client.say(target, `/me geeft dit ${num} bedjes.`);
        console.log(`* Executed ${commandName}`);
      }
  }

  // miljaar
  if (commandName === 'miljaar') {
    client.say(target, 'Schudden en beven');
    console.log(`* Executed ${commandName}`);
  }

  // wauw
  if (commandName === 'wauw') {
    client.say(target, 'onvoorstelbaar');
    console.log(`* Executed ${commandName}`);
  }

  // f
  if (commandName === 'f') {
    client.say(target, 'f');
    console.log(`* Executed ${commandName}`);
  }
  
  // hype
  if (commandName === 'hype') {
    client.say(target, 'hype');
    console.log(`* Executed ${commandName}`);
  }

  // bon
  if (commandName === 'bon') {
    client.say(target, 'ja');
    console.log(`* Executed ${commandName}`);
  }

  // play
  if (commandName === '!playboys') {
    client.say(target, '!play');
    console.log(`* Executed ${commandName}`);
  }

  // tabel van madel
  if (commandName === 'de tabel van madel') {
    client.say(target, 'Tabel was juist hé?');
    console.log(`* Executed ${commandName}`);
  }

}

// aantal bedjes berekenen
function scoreBedjes () {
  const maxBedjes = 5;
  return Math.floor(Math.random() * maxBedjes) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
