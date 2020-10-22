const {port, consumer_key, consumer_secret, access_token, access_token_secret } = require('./config');

const WebSocket = require('ws');
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

const searhPrhase = '#food';


wss.on('connection', function connection(ws) {
    console.log(clc.cyan('[new connect detected]'))
});

let stream = twitter.stream('statuses/filter', { track: searhPrhase });
stream.on('error', function (error) {
    console.log(clc.red('error on streaming:',error))
});

stream.on('tweet', function (tweet) {
    console.log(clc.blackBright('[got new tweet]',tweet.id))

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                tweet_id: tweet.id,
                tweet_date: tweet.created_at,
                tweet_text: tweet.text,
                user_name: tweet.user.name,
                user_handler: tweet.user.screen_name,
                user_profile_image: tweet.user.profile_image_url
            }));
        }
    });
});