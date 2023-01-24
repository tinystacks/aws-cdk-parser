import { parseS3Bucket } from '../src/s3';
import {
  CloudformationTypes,
  CDK_DIFF_CREATE_SYMBOL,
  CdkDiff,
  Json
} from '@tinystacks/precloud';

describe('S3 Resource Parser', () => {
  it('parseS3Bucket', () => {
    const mockDiff: CdkDiff = {
      cdkPath: 'S3Bucket/S3Bucket-bucket/Resource',
      logicalId: 'S3BucketS3Bucketbucket65620B0A',
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_S3_BUCKET
    };
    const mockCloudformationTemplate: Json = {
      Resources: {
        'S3BucketS3Bucketbucket65620B0A': {
          'Type': 'AWS::S3::Bucket',
          'Properties': {
            'BucketName': 'smoke-test-bucket-92y34ibds8'
          },
          'UpdateReplacePolicy': 'Retain',
          'DeletionPolicy': 'Retain',
          'Metadata': {
            'aws:cdk:path': 'SmokeTestApp/S3Bucket/S3Bucket-bucket/Resource'
          }
        }
      }
    };

    const parsedBucket = parseS3Bucket(mockDiff, mockCloudformationTemplate);

    expect(parsedBucket).toHaveProperty('Name', 'smoke-test-bucket-92y34ibds8');
  });

  it('parseS3Bucket without resources', () => {
    const mockDiff: CdkDiff = {
      cdkPath: 'S3Bucket/S3Bucket-bucket/Resource',
      logicalId: 'S3BucketS3Bucketbucket65620B0A',
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_S3_BUCKET
    };
    const mockCloudformationTemplate: Json = {
      Resources: {}
    };

    const parsedBucket = parseS3Bucket(mockDiff, mockCloudformationTemplate);

    expect(parsedBucket).toStrictEqual(undefined);
  });
});