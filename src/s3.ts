import { CdkDiff, Json } from '@tinystacks/predeploy-infra';

// https://docs.aws.amazon.com/AmazonS3/latest/API/API_Bucket.html
// https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketTagging.html#AmazonS3-GetBucketTagging-response-TagSet
function parseS3Bucket (diff: CdkDiff, cloudformationTemplate: Json): Json {
  const { logicalId } = diff;
  const [ _logicalId, cfnEntry = {} ] = Object.entries<Json>(cloudformationTemplate.Resources).find(([key]) => key === logicalId) || [];
  const name = cfnEntry.Properties?.BucketName;
  const tagSet = cfnEntry.Properties?.Tags;
  return {
    Name: name,
    TagSet: tagSet
  };
}

export {
  parseS3Bucket
};