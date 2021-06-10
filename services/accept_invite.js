const { sheetService } = require('../services/google_sheet');
const { DOCUMENTS, DELAYS } = require('../config/constants.json');

async function acceptGroupInvite(client, googleSheets) {
    // read sheet 
    // get array of ids
    // accept invite in loop with delay
    // await client.joinGroup('DLTw8AvVbLkCchmaFob36Y')

    try {
        const sheets = await sheetService(googleSheets);
        const invites = await sheets.readSheet(DOCUMENTS.GROUP_INVITE.DOC_REF, DOCUMENTS.GROUP_INVITE.SHEET);
        const inviteCodeArr = invites
            .filter(invite => {
                if (invite.active === 'yes') return true;
            })
            .map(invite => {
                return invite.invite_url.split('.com/')[1]
            })
        console.log('INVITE: -- STARTING INVITE ACCEPT --')
        if (inviteCodeArr.length) {
            let promise = Promise.resolve();
            inviteCodeArr.forEach(invite => {
                if (invite) {
                    promise = promise.then(() => {
                        client.joinGroup(invite);
                        console.log('INVITE: SENDING TO', invite);
                        return new Promise((resolve) => {
                            setTimeout(resolve, DELAYS.ACCEPT_INVITE);
                        })
                    })
                }
                //setTimeout(() => client.joinGroup(invite), DELAYS.ACCEPT_INVITE);
            });
            promise.then(function () {
                console.log('INVITE:-- FINISHED INVITE ACCEPT --')
            });
        }
    } catch (error) {
        console.log('-- ERROR IN ACCEPTING INVITE ----');
        console.log(error);
    }
}

module.exports = {
    acceptGroupInvite
}
