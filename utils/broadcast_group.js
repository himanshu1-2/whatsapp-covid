const { getAllChatGroups } = require('../services/get_groups');
const { chatReply } = require('../services/send_message');
const { sendImage } = require('../services/sendImage');
const { sendFile } = require('../services/sendFile');
const { DELAYS } = require('../config/constants.json');
const { downloadFile } = require('./downloadFile')
async function broadcastMessageGroup(client, msg) {
    console.log('BROADCAST: -- STARTING BROADCAST --')
    // get all groups
    let fileName = ''
    const chatGroups = await getAllChatGroups(client);
    if ((msg.isMedia === true && msg.type === 'image') || msg.isMMS === true || msg.type === 'document') {
        fileName = await downloadFile(client, msg)
    }
    // send message in loop to ALL THE GROUPS
    let promise = Promise.resolve();
    chatGroups.forEach(group => {
        promise = promise.then(async () => {
            if (group.name === 'Me and' || group.name === 'Me you') {
                if (msg.isMedia === true && msg.type === 'image') {
                    sendImage(client, fileName, msg.caption, group.id._serialized)


                }
                else if (msg.type === 'document') {
                    sendFile(client, fileName, msg.caption, group.id._serialized)

                }
                else {
                    chatReply(client, group.id._serialized, msg.body);

                }
                console.log('BROADCAST: SENDING TO', group.id);
            }



            return new Promise((resolve) => {
                setTimeout(resolve, DELAYS.BROADCAST);
            })
        })
    });
    promise.then(function () {
        console.log('BROADCAST:-- FINISHED BROADCAST --')
    });
}


module.exports = {
    broadcastMessageGroup
}
