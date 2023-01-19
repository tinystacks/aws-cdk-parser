import {
  AwsCdkParser,
  CloudformationTypes,
  CdkDiff,
  Json
} from '@tinystacks/iac-utils';
import { parseEip } from './ec2';
import { parseS3Bucket } from './s3';
import { parseSqsQueue } from './sqs';
import { parseNatGateway, parseRoute, parseRouteTable, parseRouteTableAssociation, parseSubnet, parseVpc } from './vpc';

const {
  CFN_SQS_QUEUE,
  CFN_S3_BUCKET,
  CFN_EIP,
  CFN_VPC,
  CFN_NAT_GATEWAY,
  CFN_SUBNET,
  CFN_ROUTE_TABLE_ASSOCIATION,
  CFN_ROUTE,
  CFN_ROUTE_TABLE
} = CloudformationTypes;

class TinyStacksAwsCdkParser extends AwsCdkParser {
  constructor () { super(); }

  resourceParsers: {
    [cfnType: string]: (diff: CdkDiff, cloudformationTemplate: Json) => Json
  } = {
      [CFN_SQS_QUEUE]: parseSqsQueue,
      [CFN_S3_BUCKET]: parseS3Bucket,
      [CFN_EIP]: parseEip,
      [CFN_VPC]: parseVpc,
      [CFN_NAT_GATEWAY]: parseNatGateway,
      [CFN_SUBNET]: parseSubnet,
      [CFN_ROUTE_TABLE_ASSOCIATION]: parseRouteTableAssociation,
      [CFN_ROUTE]: parseRoute,
      [CFN_ROUTE_TABLE]: parseRouteTable
    };

  parseResource (diff: CdkDiff, cloudformationTemplate: Json): Promise<Json | undefined> {
    const resourceParser = this.resourceParsers[diff.resourceType];
    if (resourceParser) return Promise.resolve(resourceParser(diff, cloudformationTemplate));
    return undefined;
  }
}


export {
  TinyStacksAwsCdkParser
};
export default TinyStacksAwsCdkParser;