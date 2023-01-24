import { CdkDiff, Json } from '@tinystacks/precloud';
import { getResourceFromDiff } from './utils';

// https://docs.aws.amazon.com/AmazonS3/latest/API/API_Bucket.html
// https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetBucketTagging.html#AmazonS3-GetBucketTagging-response-TagSet
function parseS3Bucket (diff: CdkDiff, cloudformationTemplate: Json): Json {
  const cfnEntry = getResourceFromDiff(diff, cloudformationTemplate);

  if (!cfnEntry) { return {}; }

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