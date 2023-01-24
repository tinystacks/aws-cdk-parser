import { CdkDiff, Json } from '@tinystacks/precloud';
import { dontReturnEmpty, getResourceFromDiff } from './utils';

// https://docs.aws.amazon.com/AmazonS3/latest/API/API_Bucket.html
// https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketTagging.html#AmazonS3-GetBucketTagging-response-TagSet
function parseS3Bucket (diff: CdkDiff, cloudformationTemplate: Json): Json {
  const cfnEntry = getResourceFromDiff(diff, cloudformationTemplate);

  if (!cfnEntry) { return undefined; }

  const name = cfnEntry.Properties?.BucketName;
  const tagSet = cfnEntry.Properties?.Tags;
  const properties = {
    Name: name,
    TagSet: tagSet
  };
  
  return dontReturnEmpty(properties);
}

export {
  parseS3Bucket
};