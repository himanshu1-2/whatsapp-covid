const path = require('path');
async function sendImage(client, fileName, caption, sheetContact) {
    const __dirname = path.resolve()
    await client
        .sendImage(
            sheetContact,
            path.join(__dirname, `/public/${fileName}`),
            'image-name',
            caption
        )
        .then((result) => {
            // console.log('Result: ', result); //return object success
        }).catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
}
module.exports = {
    sendImage
}