const FACEBOOK_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const CAT_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/d/df/Doge_homemade_meme.jpg';

const request = require('request');

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: CAT_IMAGE_URL}
                }
            }
        }
    });
};