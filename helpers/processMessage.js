const FACEBOOK_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const API_AI_TOKEN = process.env.API_AI_TOKEN;
const CAT_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/d/df/Doge_homemade_meme.jpg';

const apiAiClient = require('apiai')(API_AI_TOKEN);
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'test-bot-2f5e2'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};