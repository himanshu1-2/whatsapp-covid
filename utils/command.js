const { broadcastMessage } = require('./broadcast_message');
const { acceptGroupInvite } = require('../services/accept_invite');

function runCommand(client, googleSheets, cmd) {
    switch (cmd) {
        case 'INITIATE_MSG_BROADCAST@007':
            //  broadcastMessage(client, googleSheets);
            break;
        case 'INITIATE_INVITE_ACCEPT@007':
            acceptGroupInvite(client, googleSheets);
            break;
        default:
            break;
    }
}

module.exports = {
    runCommand
}