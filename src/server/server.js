require('./config');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT });
const Twitter = require('twitter');


let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
 
let stream = client.stream('statuses/filter', {track: '#food'});

wss.on('connection', function connection(ws) {
    
//    for (let index = 0; index < 5; index++) {
//        setTimeout(() => {
//            ws.send('counting'+index);       
//        }, 2500);
//    }
    stream.on('data', function(event) {
        ws.send(`
            tweet date: ${event.created_at}.
            tweet text: ${event.text}.
            user handler: ${event.user.screen_name}.
            user profile image: ${event.user.profile_image_url}.
        `);
    });
});




stream.on('error', function(error) {
    throw error;
});