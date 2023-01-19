const mockParseSqsQueue = jest.fn();
const mockParseS3Bucket = jest.fn();
const mockParseEip = jest.fn();
const mockParseVpc = jest.fn();
const mockParseNatGateway = jest.fn();
const mockParseSubnet = jest.fn();
const mockParseRouteTableAssociation = jest.fn();
const mockParseRoute = jest.fn();
const mockParseRouteTable = jest.fn();

jest.mock('../src/ec2', () => ({
  parseEip: mockParseEip
}));
jest.mock('../src/s3', () => ({
  parseS3Bucket: mockParseS3Bucket
}));
jest.mock('../src/sqs', () => ({
  parseSqsQueue: mockParseSqsQueue
}));
jest.mock('../src/vpc', () => ({
  parseNatGateway: mockParseNatGateway,
  parseRoute: mockParseRoute,
  parseRouteTable: mockParseRouteTable,
  parseRouteTableAssociation: mockParseRouteTableAssociation,
  parseSubnet: mockParseSubnet,
  parseVpc: mockParseVpc
}));

import { TinyStacksAwsCdkParser } from '../src';
import {
  CloudformationTypes,
  CDK_DIFF_CREATE_SYMBOL,
  CdkDiff,
  Json
} from '@tinystacks/iac-utils';

describe('tinystacks-aws-cdk-parser', () => {
  const mockCloudformationTemplate: Json = {};
  const parser = new TinyStacksAwsCdkParser();
  afterEach(() => {
    // for mocks
    jest.resetAllMocks();
    // for spies
    jest.restoreAllMocks();
  });

  it('returns undefined if there is no parser for the resource type', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: 'AWS::NOT::SUPPORTED',
      cdkPath: 'NotSupportedResource',
      logicalId: 'NotSupportedResource'
    };
    
    const parsedResource = await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(parsedResource).toBeUndefined();
    expect(mockParseSqsQueue).not.toBeCalled();
    expect(mockParseS3Bucket).not.toBeCalled();
    expect(mockParseEip).not.toBeCalled();
    expect(mockParseVpc).not.toBeCalled();
    expect(mockParseNatGateway).not.toBeCalled();
    expect(mockParseSubnet).not.toBeCalled();
    expect(mockParseRouteTableAssociation).not.toBeCalled();
    expect(mockParseRoute).not.toBeCalled();
    expect(mockParseRouteTable).not.toBeCalled();
  });
  it('parses SQS queue', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_SQS_QUEUE,
      cdkPath: 'SqsQueue',
      logicalId: 'SqsQueue'
    };
    
    await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(mockParseSqsQueue).toBeCalled();
    expect(mockParseSqsQueue).toBeCalledWith(mockDiff, mockCloudformationTemplate);
    
    expect(mockParseS3Bucket).not.toBeCalled();
    expect(mockParseEip).not.toBeCalled();
    expect(mockParseVpc).not.toBeCalled();
    expect(mockParseNatGateway).not.toBeCalled();
    expect(mockParseSubnet).not.toBeCalled();
    expect(mockParseRouteTableAssociation).not.toBeCalled();
    expect(mockParseRoute).not.toBeCalled();
    expect(mockParseRouteTable).not.toBeCalled();
  });
  it('parses S3 bucket', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_S3_BUCKET,
      cdkPath: 'S3Bucket',
      logicalId: 'S3Bucket'
    };

    await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(mockParseS3Bucket).toBeCalled();
    expect(mockParseS3Bucket).toBeCalledWith(mockDiff, mockCloudformationTemplate);
    
    expect(mockParseSqsQueue).not.toBeCalled();
    expect(mockParseEip).not.toBeCalled();
    expect(mockParseVpc).not.toBeCalled();
    expect(mockParseNatGateway).not.toBeCalled();
    expect(mockParseSubnet).not.toBeCalled();
    expect(mockParseRouteTableAssociation).not.toBeCalled();
    expect(mockParseRoute).not.toBeCalled();
    expect(mockParseRouteTable).not.toBeCalled();
  });
  it('parses EIP', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_EIP,
      cdkPath: 'EIP',
      logicalId: 'EIP'
    };

    await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(mockParseEip).toBeCalled();
    expect(mockParseEip).toBeCalledWith(mockDiff, mockCloudformationTemplate);
    
    expect(mockParseSqsQueue).not.toBeCalled();
    expect(mockParseS3Bucket).not.toBeCalled();
    expect(mockParseVpc).not.toBeCalled();
    expect(mockParseNatGateway).not.toBeCalled();
    expect(mockParseSubnet).not.toBeCalled();
    expect(mockParseRouteTableAssociation).not.toBeCalled();
    expect(mockParseRoute).not.toBeCalled();
    expect(mockParseRouteTable).not.toBeCalled();
  });
  it('parses VPC', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_VPC,
      cdkPath: 'VPC',
      logicalId: 'VPC'
    };
    
    await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(mockParseVpc).toBeCalled();
    expect(mockParseVpc).toBeCalledWith(mockDiff, mockCloudformationTemplate);
    
    expect(mockParseSqsQueue).not.toBeCalled();
    expect(mockParseS3Bucket).not.toBeCalled();
    expect(mockParseEip).not.toBeCalled();
    expect(mockParseNatGateway).not.toBeCalled();
    expect(mockParseSubnet).not.toBeCalled();
    expect(mockParseRouteTableAssociation).not.toBeCalled();
    expect(mockParseRoute).not.toBeCalled();
    expect(mockParseRouteTable).not.toBeCalled();
  });
  it('parses Nat Gateway', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_NAT_GATEWAY,
      cdkPath: 'NatGateway',
      logicalId: 'NatGateway'
    };
    
    await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(mockParseNatGateway).toBeCalled();
    expect(mockParseNatGateway).toBeCalledWith(mockDiff, mockCloudformationTemplate);
    
    expect(mockParseSqsQueue).not.toBeCalled();
    expect(mockParseS3Bucket).not.toBeCalled();
    expect(mockParseEip).not.toBeCalled();
    expect(mockParseVpc).not.toBeCalled();
    expect(mockParseSubnet).not.toBeCalled();
    expect(mockParseRouteTableAssociation).not.toBeCalled();
    expect(mockParseRoute).not.toBeCalled();
    expect(mockParseRouteTable).not.toBeCalled();
  });
  it('parses Subnet', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_SUBNET,
      cdkPath: 'Subnet',
      logicalId: 'Subnet'
    };
    
    await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(mockParseSubnet).toBeCalled();
    expect(mockParseSubnet).toBeCalledWith(mockDiff, mockCloudformationTemplate);
    
    expect(mockParseSqsQueue).not.toBeCalled();
    expect(mockParseS3Bucket).not.toBeCalled();
    expect(mockParseEip).not.toBeCalled();
    expect(mockParseVpc).not.toBeCalled();
    expect(mockParseNatGateway).not.toBeCalled();
    expect(mockParseRouteTableAssociation).not.toBeCalled();
    expect(mockParseRoute).not.toBeCalled();
    expect(mockParseRouteTable).not.toBeCalled();
  });
  it('parses Route Table Association', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_ROUTE_TABLE_ASSOCIATION,
      cdkPath: 'RouteTableAssociation',
      logicalId: 'RouteTableAssociation'
    };
    
    await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(mockParseRouteTableAssociation).toBeCalled();
    expect(mockParseRouteTableAssociation).toBeCalledWith(mockDiff, mockCloudformationTemplate);
    
    expect(mockParseSqsQueue).not.toBeCalled();
    expect(mockParseS3Bucket).not.toBeCalled();
    expect(mockParseEip).not.toBeCalled();
    expect(mockParseVpc).not.toBeCalled();
    expect(mockParseNatGateway).not.toBeCalled();
    expect(mockParseSubnet).not.toBeCalled();
    expect(mockParseRoute).not.toBeCalled();
    expect(mockParseRouteTable).not.toBeCalled();
  });
  it('parses Route', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_ROUTE,
      cdkPath: 'Route',
      logicalId: 'Route'
    };
    
    await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(mockParseRoute).toBeCalled();
    expect(mockParseRoute).toBeCalledWith(mockDiff, mockCloudformationTemplate);
    
    expect(mockParseSqsQueue).not.toBeCalled();
    expect(mockParseS3Bucket).not.toBeCalled();
    expect(mockParseEip).not.toBeCalled();
    expect(mockParseVpc).not.toBeCalled();
    expect(mockParseNatGateway).not.toBeCalled();
    expect(mockParseSubnet).not.toBeCalled();
    expect(mockParseRouteTableAssociation).not.toBeCalled();
    expect(mockParseRouteTable).not.toBeCalled();
  });
  it('parses Route Table', async () => {
    const mockDiff: CdkDiff = {
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_ROUTE_TABLE,
      cdkPath: 'RouteTable',
      logicalId: 'RouteTablee'
    };
    
    await parser.parseResource(mockDiff, mockCloudformationTemplate);

    expect(mockParseRouteTable).toBeCalled();
    expect(mockParseRouteTable).toBeCalledWith(mockDiff, mockCloudformationTemplate);
    
    expect(mockParseSqsQueue).not.toBeCalled();
    expect(mockParseS3Bucket).not.toBeCalled();
    expect(mockParseEip).not.toBeCalled();
    expect(mockParseVpc).not.toBeCalled();
    expect(mockParseNatGateway).not.toBeCalled();
    expect(mockParseSubnet).not.toBeCalled();
    expect(mockParseRouteTableAssociation).not.toBeCalled();
    expect(mockParseRoute).not.toBeCalled();
  });
});