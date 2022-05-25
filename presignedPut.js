const AWS = require("aws-sdk");

AWS.config = new AWS.Config({
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3({
  signatureVersion: "v4",
  endpoint: `s3.${process.env.AWS_REGION}.amazonaws.com`
})
let url = s3.getSignedUrl("putObject", {
  Key: 'mike.json',
  Bucket: process.env.BUCKET,
  Expires: 900, // default is 900 seconds (15 minutes)
});




console.log(`curl -i -XPUT -H 'Content-Type: application/json' --data '{"mike":"for the win"}' '${url}'`)
