const mime = require('mime-types');
const fs = require('fs').promises
async function downloadFile(client, msg) {
    const fileName = `${Date.now()}-beat-covid-whatsapp1.${mime.extension(msg.mimetype)}`
    const buffer = await client.decryptFile(msg);
    await fs.writeFile(`public/${fileName}`, buffer);
    return fileName
}
module.exports = {
    downloadFile
}