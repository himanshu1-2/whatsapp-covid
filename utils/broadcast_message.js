const { sheetService } = require('../services/google_sheet');
const { getAllChatGroups } = require('../services/get_groups');
const { chatReply } = require('../services/send_message');
const { DOCUMENTS, DELAYS } = require('../config/constants.json');

async function broadcastMessage(client, googleSheets) {
    const sheets = await sheetService(googleSheets);
    // read message from google sheet

    const messages = await sheets.readSheet(DOCUMENTS.BROADCAST.DOC_REF, DOCUMENTS.BROADCAST.SHEET);
    // messages.forEach(message => {
    //     if (message.enable === 'yes') {
    //         sendMessage();
    //     }
    // });
    console.log('BROADCAST: -- STARTING BROADCAST --')

    if (messages[0].active === 'yes') {
        const message = messages[0].message;

        // get all groups
        const chatGroups = await getAllChatGroups(client);

        // send message in loop to ALL THE GROUPS
        let promise = Promise.resolve();
        chatGroups.forEach(group => {
            promise = promise.then(() => {
                // if (group.name === 'Me and')
                chatReply(client, group.id._serialized, message);
                console.log('BROADCAST: SENDING TO', group.id);
                return new Promise((resolve) => {
                    setTimeout(resolve, DELAYS.BROADCAST);
                })
            })
        });
        promise.then(function () {
            console.log('BROADCAST:-- FINISHED BROADCAST --')
        });
    }
}

module.exports = {
    broadcastMessage
}
