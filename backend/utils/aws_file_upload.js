const {S3}=require('aws-sdk');
const {GetObjectCommand, S3Client }=require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();
const client = new S3Client({region: 'eu-north-1'});
const s3uploadV2=async(file,filename_of_file,bucket)=>{
    const s3=new S3();
    const params={
        Bucket:`${bucket}` ,
        Key:`${filename_of_file}`,
        Body:file.buffer
    
    };
    const result= await s3.upload(params).promise();
    console.log("file added");
    return result;

}


const getobjecturl=async(bucket,filename)=>{
    const command=new GetObjectCommand({
        Bucket:`${bucket}`,
        Key:`${filename}`
    });
    const result=await client.send(command);
    console.log("got in ");
    let url;
     await getSignedUrl(client, command, { expiresIn:60*60*24*7 }).then((data)=>{
        console.log(data);
        url=data;
     });
     console.log(url);
    return url;
}

module.exports={s3uploadV2,getobjecturl};