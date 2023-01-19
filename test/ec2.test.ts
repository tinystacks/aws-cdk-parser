import { parseEip } from '../src/ec2';
import {
  CloudformationTypes,
  CDK_DIFF_CREATE_SYMBOL,
  CdkDiff,
  Json
} from '@tinystacks/iac-utils';

describe('EC2 Resource Parser', () => {
  it('parseEip', () => {
    const mockDiff: CdkDiff = {
      cdkPath: 'Vpc/Vpc/PublicSubnetSubnet1/EIP',
      logicalId: 'VpcPublicSubnetSubnet1EIP4F45FFE5',
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_EIP
    };
    const mockCloudformationTemplate: Json = {
      Resources: {
        'VpcPublicSubnetSubnet1EIP4F45FFE5': {
          'Type': 'AWS::EC2::EIP',
          'Properties': {
            'Domain': 'vpc',
            'Tags': [
              {
                'Key': 'Name',
                'Value': 'SmokeTestApp/Vpc/Vpc/PublicSubnetSubnet1'
              }
            ]
          },
          'Metadata': {
            'aws:cdk:path': 'SmokeTestApp/Vpc/Vpc/PublicSubnetSubnet1/EIP'
          }
        }
      }
    };

    const parsedEip = parseEip(mockDiff, mockCloudformationTemplate);

    expect(parsedEip).toHaveProperty('domain', 'vpc');
    expect(parsedEip).toHaveProperty('tagSet', [{ 'Key': 'Name', 'Value': 'SmokeTestApp/Vpc/Vpc/PublicSubnetSubnet1' }]);
  });
});