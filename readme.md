# BEAT-COVID WHATSAPP BOT

## INSTALLATION

1. install node.js -> Download file from https://nodejs.org/en/download/ for your OS and execute it.
2. Clone Repo
3. npm i
4. Add .env file at the root
5. Create required google sheets
6. start with node `node index.js`. -> Scan code from console

### Get Google creds AND PREPARE .env FILE

(GET SAMPLE .env FIRST)

1. create Google creds following - https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication with with `service account method`.
2. Add client_email and private_key received in above STEP to .env
3. Create required google sheets as per run mode with agreed format. Take Sheet ids from URL
   e.g https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxx/
4. Add sheet ids - xxxxxxxxxxx from above STEP to .env file for each corresponding sheet.
6. Share these sheets withh client_email obtained in first step.

### .env file 

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=""
GOOGLE_PRIVATE_KEY=""
```

### TEChnical MANAGEMENT

1. Delays in ms can be configured in constants.json in config in DELAYS section.

### GOOGLE SHEET MANAGAMENT AND COMMANDS

e.g. BULK MESSAGE

1. Add active - yes/no and message - xyz in google sheet.
2. only rows with active - yes will be consumed for operation
3. Once sheet is prepared someone with authority can trigger operation by sending `INITIATE_XXX` command to registered number.

NOTES -

1. google document name desn't matter
2. Sheets name inside document needs to be accurate

## FEATURES

1. Messages will be automatically logged to Google sheet if project is running.
2. Bulk message
3. Accept group invite

## USAGE INSTRUCTIONS
App can be used in 2 modes
- RUN_MODE_SCRAP
- RUN_MODE_BULK_MSG

Note:
1. To enable any mode set that mode to 'YES' in env. e.g. - RUN_MODE_BULK_MSG='YES'
2. Both modes can be enable together as well.

###  RUN_MODE_SCRAP

This mode will do

- Message scrapping  
- Initiate group invite Accept - command based 

How to use-

1. Set below mentioned env variables in addition to common variables.
```
RUN_MODE_SCRAP="YES"
GOOGLE_MESSAGES_SHEET_ID=''
GOOGLE_GROUP_INVITE_SHEET_ID=""
MONGODB_URL=mongodb://127.0.0.1:27017/whatsapp
AWS_USER_KEY=""
AWS_USER_SECRET=""
AWS_BUCKET_NAME=""
```
2. For Group invite accept - Prepare sheet taking reference from asset folder. Initiate operation by sending the command.


### RUN_MODE_BULK_MSG
This mode will do

- Initiate group invite Accept - command based 
- Broadcast Group Messages
- Broad Individual Messages

1. Set below mentioned env variables in addition to common variables.
```
RUN_MODE_BULK_MSG="YES"
GOOGLE_GROUP_INVITE_SHEET_ID=""
GOOGLE_BROADCAST_INDIVIDUAL_SHEET_ID=""
BROADCAST_INDIVIDUAL_NUMBER="91xxccx@c.us,91xxccx@c.us"
BROADCAST_GROUP_NUMBER=""
```
2. For message broadcast get your number configured. (Added in env for req operation[group/indiv]). Any message sent from this number will be forwarded to all groups/indi respectively.
3. For Group invite accept - same as in first mode

