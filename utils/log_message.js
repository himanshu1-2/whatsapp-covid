const mime = require('mime-types');

const { awsUpload } = require('../utils/awsUpload');
const { sheetService } = require('../services/google_sheet');
const { DOCUMENTS } = require('../config/constants.json');
const Message = require('../model/message');

async function logMessage(client, googleSheets, message) {
    try {
        const sheets = await sheetService(googleSheets);
        if (message.isMedia === true || message.type === 'image' || message.type === 'document' || message.isMMS === true) {
            const buffer = await client.decryptFile(message);
            // At this point you can do whatever you want with the buffer
            // Most likely you want to write it into a file
            const fileName = `beat-covid-whatsapp.${mime.extension(message.mimetype)}`;
            const data = await awsUpload(fileName, buffer);
            message.attachment = message.filename || '';
            message.attachmentPath = data.Location;
        }
        // let arrayToadd = [];
        // console.log(msg);
        // console.log(msg.isGroupMsg, msg.chat.id, msg.chat.name, msg.sender.id, msg.sender.pushname, msg.body, msg.type, msg.timestamp);
        let msgToLog = {
            isGroup: message.isGroupMsg,
            msgType: message.type,
            groupChatId: message.chat.id,
            groupName: message.chat.name,
            senderId: message.sender.id,
            senderName: message.sender.pushname,
            body: message.body,
            caption: message.caption,
            lat: message.lat,
            lng: message.lng,
            timestamp: message.timestamp,
            attachment: message.attachment || '',
            attachmentPath: message.attachmentPath || '',
            dump: JSON.stringify(message)
        };

        //arrayToadd.push(msgToLog);
        Message.create(msgToLog);
        //sheets.addToSheet(DOCUMENTS.MESSAGES.DOC_REF, DOCUMENTS.MESSAGES.SHEET, msgToLog);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    logMessage
}