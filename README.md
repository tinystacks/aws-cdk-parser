# @tinystacks/aws-cdk-parser
An AWS CDK parser for a few key resources.  Intended as a plugin for [@tinystacks/precloud](https://www.npmjs.com/package/@tinystacks/precloud).

## How To Use
By default, this parser plugin is included as a peer dependency of the [precloud cli](https://github.com/tinystacks/precloud) and is therefore always available, though it is deprioritized over any explicitly configured parsers.

To increase the priority of this parser, you can install this package as a dev dependency and add it to the top of the `awsCdkParsers` array in your smoke test config.

`npm i -D @tinystacks/aws-cdk-parser`

```jsonc
{
  // ...
  "awsCdkParsers": [
    "@tinystacks/aws-cdk-parser"
    // ...other parsers
  ]
}
```

## Supported Resources
_Resources this parser will parse._
1. Sqs Queues (AWS::SQS::Queue)
1. S3 Buckets (AWS::S3::Bucket)
1. Elastic IPs (AWS::EC2::EIP)
1. Vpcs (AWS::EC2::VPC)
1. Nat Gateways (AWS::EC2::NatGateway)
1. Subnets (AWS::EC2::Subnet)
1. Route Table Associations (AWS::EC2::SubnetRouteTableAssociation)
1. Routes (AWS::EC2::Route)
1. Route Tables (AWS::EC2::RouteTable)