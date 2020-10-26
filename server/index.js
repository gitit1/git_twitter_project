const {port, consumer_key, consumer_secret, access_token, access_token_secret } = require('./config');

const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ port: port });

const Twit = require('twit');
const clc = require('cli-color');

let twitter = new Twit({ consumer_key, 
    consumer_secret, 
    access_token, 
    access_token_secret, 
    timeout_ms: 60*1000,
    strictSSL: true
});

const SERCH_TERM = '#food';
let stream = twitter.stream('statuses/filter', { track: SERCH_TERM });


wss.on('connection', function connection(ws) {
    console.log(clc.xterm(28).bgXterm(7)('[WS] New Client Connection'));

    if (wss.clients.size===1) {
        console.log(clc.xterm(178).bgXterm(39)('[Twitter API]- Restarting the Stream'));
        stream.start();
    } 
});

stream.on('error', function (error) {
    console.log(clc.xterm(196).bgXterm(39)(`[Twitter API] Error on Streaming: ${error}`))
});

stream.on('tweet', function (tweet) {
    console.log(clc.blackBright.bgXterm(39)(`[Twitter API] Recieved New Tweet: ${tweet.id}]`));
    if(wss.clients.size===0){
        preConnect = 0;
        console.log(clc.xterm(196).bgXterm(7)('[WS] No Clients Connected'));
        console.log(clc.xterm(196).bgXterm(39)('[Twitter API] Stopping the Stream'));
        stream.stop();
    }
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            const tweet_id = tweet.id;
            const tweet_date = tweet.created_at;
            const tweet_text = tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text;
            const tweet_media = (tweet.extended_entities && tweet.extended_entities.media)
                                ? tweet.extended_entities.media :
                                (tweet.extended_tweet && tweet.extended_tweet.extended_entities && tweet.extended_tweet.extended_entities.media) 
                                ? tweet.extended_tweet.extended_entities.media :
                                (tweet.entities && tweet.entities.media) ?  tweet.entities.media : [];
            const tweet_links = (tweet.entities && tweet.entities.urls) ? tweet.entities.urls : [];
            const user_name = tweet.user.name;
            const user_handler = tweet.user.screen_name;
            const user_profile_image = tweet.user.profile_image_url;

            client.send(JSON.stringify({tweet_id, tweet_date, tweet_text, tweet_media, tweet_links, user_name, user_handler, user_profile_image}));
        }
    });
});

for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, () => {
      console.log(sig);
  
      // Stop accepting new connections.
      server.close();
  
      // Close all clients gracefully.
      for (const ws of wss.clients) ws.close();
    });
}