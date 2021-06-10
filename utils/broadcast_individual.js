const { sheetService } = require('../services/google_sheet');
const { sendTextIndividual } = require('../services/send_message_individual');
const { DOCUMENTS, DELAYS } = require('../config/constants.json');
const { sendImage } = require('../services/sendImage');
const { sendFile } = require('../services/sendFile');
const { downloadFile } = require('./downloadFile')
async function broadcastMessageIndividual(client, googleSheets, msg) {
    const sheets = await sheetService(googleSheets);
    const contacts = await sheets.readSheet(DOCUMENTS.BROADCAST_INDIVIDUAL.DOC_REF, DOCUMENTS.BROADCAST_INDIVIDUAL.SHEET)
    let promise = Promise.resolve();
    // get contact list from sheet

    contacts.forEach(contact => {
        promise = promise.then(async () => {
            if (contact.active === 'yes') {
                let sheetContact = contact.contacts;
                sheetContact = '91' + sheetContact + '@c.us'
                // format received 10 digit numbers with enable 'yes' from sheet
                // message text received as input to function
                // send message in loop with delay
                // text msg send demo
                //91923456789@c.us
                if (msg.isMedia === true && msg.type === 'image' || msg.isMMS === true) {
                    const fileName = await downloadFile(client, msg)
                    sendImage(client, fileName, msg.caption, sheetContact)

                }
                else if (msg.type === 'document') {
                    const fileName = await downloadFile(client, msg)
                    sendFile(client, fileName, msg.caption, sheetContact)
                }
                else
                    sendTextIndividual(client, sheetContact, msg.body)
            }
            return new Promise((resolve) => {
                setTimeout(resolve, DELAYS.BROADCAST);
            })
        })

    })
    promise.then(function () {
        console.log('BROADCAST_INDIVIDUAL:-- FINISHED BROADCAST --')
    });
}
module.exports = {
    broadcastMessageIndividual
}

// get contact list from sheet
// format received 10 digit numbers with enable 'yes' from sheet
// message text received as input to function
// send message in loop with delay

        // text msg send demo
        // client
        //     .sendText('91923456789@c.us', '👋 Demo message from. Rohan')
        //     .then((result) => {
        //         console.log('Result: ', result); //return object success
        //     })
        //     .catch((erro) => {
        //         console.error('Error when sending: ', erro); //return object error
        //     });

