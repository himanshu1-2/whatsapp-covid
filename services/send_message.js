async function chatReply(client, chatId, message) {
    // Reply to a message

    await client
        .sendMessageOptions(
            chatId,
            message,
            {
                // quotedMessageId: reply,
            }
        )
        .then((retorno) => {
            resp = retorno;
        })
        .catch((e) => {
            console.log(e);
        });
}

module.exports = {
    chatReply
}