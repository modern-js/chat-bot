const FACEBOOK_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const API_AI_TOKEN = process.env.API_AI_TOKEN;
const CAT_IMAGE_URL = 'http://upload.wikimedia.org/wikipedia/commons/4/4d/Group_of_cats.jpg';

const apiAiClient = require('apiai')(API_AI_TOKEN);
const request = require('request');

const sendImage = (senderId, imageUri) => {
    console.log(`Image URI: \n${imageUri}`);
    return request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: imageUri }
                }
            }
        }
    });
};


const sendTextMessage = (senderId, text) => {
    console.log(`Text contents: \n${text}`);
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

        console.log(`Response result: \n${JSON.stringify(response.result)}`);

        if (response.result.metadata.intentName === 'image.search') {
            console.log(`Sending image`);
            sendImage(senderId, result);
        } else {
            console.log(`Sending text`);
            sendTextMessage(senderId, result);
        }
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};