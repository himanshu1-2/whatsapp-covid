const path = require('path')
async function sendFile(client, fileName, caption, sheetContact) {
    const __dirname = path.resolve()
    await client
        .sendFile(
            sheetContact,
            path.join(__dirname, `./public/${fileName}`),
            caption,

        )
        .then((result) => {
            // console.log('Result: ', result); //return object success
        }).catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });
}
module.exports = {
    sendFile
}