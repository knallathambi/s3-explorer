const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    BUCKET_NAME
} = require('../config/aws-s3.json');

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    s3ForcePathStyle: true
});

router.get('/', async (req, res) => {
    const { key } = req.query;
    try {
        const resp = await s3.getObject({
            Bucket: BUCKET_NAME,
            Key: key
        }).promise();
        const { Body, ContentType } = resp;
        res.set('Content-Type', ContentType);
        res.send(Body)
    } catch (err) {
        console.error(err);
        res.status(400).json( { error: err.message })
    }
});

router.get('/bucket', (req, res) => {
    res.send(BUCKET_NAME)
})

router.put('/', async (req, res) => {
    const { key, contentType } = req.query;
    try {
        const resp = await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: key
        }).promise();
        const { Body, ContentType } = resp;
        res.set('Content-Type', ContentType);
        res.send(Body)
    } catch (err) {
        console.error(err);
        res.status(400).json( { error: err.message })
    }
});

router.get('/list', async (req, res) => {
    const { prefix='' } = req.query;
    try {
        const resp = await s3.listObjects({
            Bucket: BUCKET_NAME,
            Prefix: prefix
        }).promise();
        const objList = await Promise.all( resp.Contents.map( async item => {
            const headResp = await s3.headObject({Bucket: BUCKET_NAME, Key: item.Key}).promise();
            return {...item, ...headResp};
        }));
        res.json(objList);
    } catch (err) {
        console.error(err);
        res.status(400).json( { error: err.message })
    }
});

module.exports = router;