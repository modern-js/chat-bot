const GETTY_IMAGES_API_KEY = process.env.GETTY_IMAGES_API_KEY;
const MS_IMAGES_API_KEY = process.env.Ocp_Apim_Subscription_Key;

const request = require('request');

module.exports = (req, res) => {
    if (req.body.result.action === 'image') {
        const imageName = req.body.result.parameters['image_name'];
        const apiUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + imageName;

        request({
            uri: apiUrl,
            methos: 'GET',
            headers: {'Ocp-Apim-Subscription-Key': MS_IMAGES_API_KEY}
        }, (err, response, body) => {
            console.log(body);
            const imageUri = JSON.parse(body).value[0].contentUrl;
            const imageUrl = imageUri.substring(0, imageUri.indexOf('?'));

            return res.json({
                speech: imageUri,
                displayText: imageUri,
                source: 'image_name'
            });
        })
    }
}