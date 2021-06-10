async function getAllChatGroups(client) {
    return await client.getAllChatsGroups();
    // chats.forEach(chat => {
    //     console.log(chat.id, chat.name, '-- ** --')
    // })
}

module.exports = {
    getAllChatGroups
}
