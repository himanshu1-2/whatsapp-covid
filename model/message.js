const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    isGroup: {
        type: Boolean,
        default: false
    },
    msgType: {
        type: String
    },
    groupChatId: {
        type: String
    },
    groupName: {
        type: String

    },
    senderId: {
        type: String
    },
    senderName: { type: String },
    body: { type: String },
    caption: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    timestamp: {
        type: Date
    },
    attachment: {
        type: String
    },
    attachmentPath: {
        type: String
    },
    dump: {
        type: String
    }

}, {
    timestamp: true
});
const message = mongoose.model("Message", messageSchema);
module.exports = message