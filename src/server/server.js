const {port, consumer_key, consumer_secret, access_token_key, access_token_secret } = require('./config');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: port });
const Twitter = require('twitter');


let client = new Twitter({ consumer_key, consumer_secret, access_token_key, access_token_secret });

let stream = client.stream('statuses/filter', { track: '#food' });

wss.on('connection', function connection(ws) {

    //    for (let index = 0; index < 5; index++) {
    //        setTimeout(() => {
    //            ws.send('counting'+index);       
    //        }, 2500);
    //    }
    stream.on('data', function (event) {
        ws.send(`
            tweet date: ${event.created_at}.
            tweet text: ${event.text}.
            user handler: ${event.user.screen_name}.
            user profile image: ${event.user.profile_image_url}.
        `);
    });
});




stream.on('error', function (error) {
    throw error;
});