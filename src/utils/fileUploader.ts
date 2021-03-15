// import { Endpoint, S3 } from 'aws-sdk';
const AWS = require('aws-sdk')

const spacesEndpoint = new AWS.Endpoint('ams3.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
});

export async function uploadFile(
  name: string,
  owner: string,
  toggles: any, // eslint-disable-line
  isTest: boolean
): Promise<void> {
  await s3
    .putObject({
      Bucket: 'togglee-toggles',
      Key: `${owner}/${name}.json`,
      Body: JSON.stringify(toggles),
      ContentType: 'application/json',
      ACL: 'public-read',
      Metadata: { isTest: `${isTest}` },
    })
    .promise();
}
