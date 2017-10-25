const MS_IMAGES_API_KEY = process.env.Ocp_Apim_Subscription_Key;

const request = require('request');

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


module.exports = (req, res) => {
    if (req.body.result.action === 'image') {
        const imageName = req.body.result.parameters['image_name'];
        const apiUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + imageName;

        request({
            uri: apiUrl,
            method: 'GET',
            headers: {'Ocp-Apim-Subscription-Key': MS_IMAGES_API_KEY}
        }, (err, response, body) => {
            const imageIndex = getRandomInt(0, JSON.parse(body).value.length-1);

            console.log(`Random Index No ${imageIndex}`);

            const imageUri = JSON.parse(body).value[imageIndex].contentUrl;
            const imageUrl = imageUri.substring(0, imageUri.indexOf('?'));

            return res.json({
                speech: imageUri,
                displayText: imageUri,
                source: 'image_name'
            });
        })
    }
}