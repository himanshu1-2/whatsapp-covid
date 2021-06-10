const mongoose = require("mongoose");
exports.message = {
    isGroupMsg: true,
    msgtype: "some type",
    chat: {
        id: new mongoose.Types.ObjectId(),
        name: "some name"
    },
    sender: {
        id: new mongoose.Types.ObjectId(),
        pushname: "some name"

    },
    body: "some text",
    caption: "some caption",
    lat: 123.77,
    lng: 1234.77,
    timestamp: Date.now(),

}
