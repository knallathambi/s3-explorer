const aws = require('aws-sdk');
const {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    BUCKET_NAME
} = require('../server/config/aws-s3.json');

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    s3ForcePathStyle: true
});

async function test1() {
    const data = await s3.getObject({
        Bucket: BUCKET_NAME,
        Key: 'root/taas/testscript_templates/python_quickstart/run.py'
    }).promise();
    const { Body, ContentType, ContentLength, LastModified, ETag, ContentEncoding } = data;
    const content = Body.toString();
    console.dir(content);
}

(async function main() {
    try {
        await test1();
    } catch(err) {
        console.error(test1);
    }
})();