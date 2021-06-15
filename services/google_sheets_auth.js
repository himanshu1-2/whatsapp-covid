const { GoogleSpreadsheet } = require('google-spreadsheet');
const { RUN_MODE_SCRAP, RUN_MODE_BULK_MSG } = process.env;

// const privatekey = JSON.parse(process.env.GOOGLE_CREDENTIALS)
//  const clientEmail = JSON.parse(process.env.GOOGLE_CREDENTIALS.client_email)
//console.log("sdasd", process.env.GOOGLE_CREDENTIALS)


async function authGoogleSheets() {
    try {
        const docObject = {}
        // Initialize the sheet - doc ID is the long id in the sheets URL
        // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        // console.log('AUTHENTICATING SHEETS');
        //  console.log(process.env.GOOGLE_PRIVATE_KEY)
        //console.log("privatekey original", process.env.GOOGLE_PRIVATE_KEY)
        console.log('GOOGLE_SHEET_AUTH: STARTING');
        //console.log("asad", process.env.GOOGLE_CREDENTIALS)


        // FOR ALL MODE
        // broadcast sheet -- no longer needed
        // const docBroadcast = new GoogleSpreadsheet(process.env.GOOGLE_BROADCAST_SHEET_ID);
        // await docBroadcast.useServiceAccountAuth({
        //     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        //     private_key: process.env.GOOGLE_PRIVATE_KEY,
        // });
        // await docBroadcast.loadInfo(); // loads document properties and worksheets
        // docObject.docBroadcast = docBroadcast;
        // console.log(docBroadcast.title, `Loaded`);
        //console.log(process.env.GOOGLE_CREDENTIALS.client_email)

        // group invite sheet
        const docGroupInvite = new GoogleSpreadsheet(process.env.GOOGLE_GROUP_INVITE_SHEET_ID);
        await docGroupInvite.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY
        });
        await docGroupInvite.loadInfo(); // loads document properties and worksheets
        docObject.docGroupInvite = docGroupInvite;
        console.log(docGroupInvite.title, `Loaded`);

        // MODE DEPENDENT
        if (RUN_MODE_BULK_MSG === 'YES') {
            const docBroadcastIndividual = new GoogleSpreadsheet(process.env.GOOGLE_BROADCAST_INDIVIDUAL_SHEET_ID);
            await docBroadcastIndividual.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY,
            });
            await docBroadcastIndividual.loadInfo();
            docObject.docBroadcastIndividual = docBroadcastIndividual;
            console.log(docBroadcastIndividual.title, `Loaded`);
        }
        if (RUN_MODE_SCRAP === 'YES') {
            const docMessages = new GoogleSpreadsheet(process.env.GOOGLE_MESSAGES_SHEET_ID);
            await docMessages.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY
            });
            await docMessages.loadInfo(); // loads document properties and worksheets
            docObject.docMessages = docMessages;
            console.log(docMessages.title, `Loaded`);
        }


        console.log('GOOGLE_SHEET_AUTH: FINISHED');

        return docObject;

    } catch (error) {
        console.log('-- ERROR IN GOOGLE SHEET AUTH ---');
        console.log(error);
    }
}

module.exports = {
    authGoogleSheets
};
