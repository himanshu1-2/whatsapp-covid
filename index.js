require('dotenv').config();
const venom = require('venom-bot');
const fs = require('fs');
const commands = require('./config/commands.json');
const { runCommand } = require('./utils/command');
const { logMessage } = require('./utils/log_message');
//const { chatReply } = require('./services/send_message');
const { authGoogleSheets } = require('./services/google_sheets_auth');

const { broadcastMessageIndividual } = require('./utils/broadcast_individual')
const { broadcastMessageGroup } = require('./utils/broadcast_group')
const { RUN_MODE_SCRAP, RUN_MODE_BULK_MSG } = process.env;
const express = require('express')
const chromiumArgs = [
    '--disable-web-security', '--no-sandbox', '--disable-web-security',
    '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache',
    '--disable-offline-load-stale-cache', '--disk-cache-size=0',
    '--disable-background-networking', '--disable-default-apps', '--disable-extensions',
    '--disable-sync', '--disable-translate', '--hide-scrollbars', '--metrics-recording-only',
    '--mute-audio', '--no-first-run', '--safebrowsing-disable-auto-update',
    '--ignore-certificate-errors', '--ignore-ssl-errors', '--ignore-certificate-errors-spki-list'
];
const app = express();
app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(process.env.port, function () {
    console.log(`Listening on Port 3000`);
});
if (RUN_MODE_SCRAP === 'YES') {
    require('./config/db');
}

venom
    .create(
        'sessionName',
        undefined,

        (statusSession, session) => {
            console.log('Status Session: ', statusSession);
            //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
            //Create session wss return "serverClose" case server for close
            console.log('Session name: ', session);
            // Retrieve all groups

        },
        undefined
    )
    .then(async (client) => {
        const googleSheets = await authGoogleSheets();
        // .env ==>  FEATURE_SCRAP=YES||NO,  FEATURE_BULK_MSG=YES||NO
        client.onMessage(async message => {
            // checkIfCommand
            if (commands[message.body] && (RUN_MODE_SCRAP === 'YES' || RUN_MODE_BULK_MSG === 'YES')) {
                runCommand(client, googleSheets, message.body);
            } else if (RUN_MODE_BULK_MSG === 'YES') {
                if (process.env.BROADCAST_INDIVIDUAL_NUMBER.split(',').includes(message.from))
                    broadcastMessageIndividual(client, googleSheets, message)

                if (process.env.BROADCAST_GROUP_NUMBER.split(',').includes(message.from))
                    broadcastMessageGroup(client, message)

            } else if (RUN_MODE_SCRAP === 'YES') {
                logMessage(client, googleSheets, message);
            }

        })


    })
    .catch((erro) => {
        console.log(erro);
    });
