async function sendTextIndividual(client, sheetContact, message) {

    await client
        .sendText(sheetContact, message)
        .then(async (result) => {
            //console.log('Result: ', result);
            //return object success
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
        });

}
module.exports = {
    sendTextIndividual
}