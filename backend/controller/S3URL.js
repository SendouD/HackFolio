import aws from "aws-sdk"
const region=""
const bucketName=""
const accessKeyId=""
const secretAccessKey=""

const s3=new aws.s3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion:'4'
})