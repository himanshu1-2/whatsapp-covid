const AWS = require('aws-sdk')
exports.awsUpload = (fileName, buffer) => {

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_USER_KEY,
        secretAccessKey: process.env.AWS_USER_SECRET,
        signatureVersion: 'v4',
        // useAccelerateEndpoint: true
        // region: 'ap-south-1'
    })
    return s3.upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${new Date().toISOString()}-${fileName}`,
        Body: buffer
    }).promise()

}