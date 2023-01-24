import { dontReturnEmpty, getResourceFromDiff } from '../src/utils';
import {
  CloudformationTypes,
  CDK_DIFF_CREATE_SYMBOL,
  CdkDiff,
  Json
} from '@tinystacks/precloud';

describe('Diff Resource Parser', () => {
  it('parseDiff', () => {
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

    const parsedResource = getResourceFromDiff(mockDiff, mockCloudformationTemplate);
    expect(parsedResource).toStrictEqual(mockCloudformationTemplate.Resources.VpcPublicSubnetSubnet1EIP4F45FFE5);
  });

  it('parseDiff without resources', () => {
    const mockDiff: CdkDiff = {
      cdkPath: 'Vpc/Vpc/PublicSubnetSubnet1/EIP',
      logicalId: 'VpcPublicSubnetSubnet1EIP4F45FFE5',
      changeTypeSymbol: CDK_DIFF_CREATE_SYMBOL,
      resourceType: CloudformationTypes.CFN_EIP
    };
    const mockCloudformationTemplate: Json = {
      Resources: {}
    };

    const parsedResource = getResourceFromDiff(mockDiff, mockCloudformationTemplate);
    expect(parsedResource).toStrictEqual(mockCloudformationTemplate.Resources.VpcPublicSubnetSubnet1EIP4F45FFE5);
  });
});

describe('dontReturnEmpty', () => {
  it('returns properties if any are defined', () => {
    const input: any = {
      a: 1,
      b: undefined,
      c: null,
      d: {},
      e: []
    };

    const output = dontReturnEmpty(input);

    expect(output).toEqual(input);
  });
  it('returns undefined if all are empty', () => {
    const input: any = {
      a: undefined,
      b: undefined,
      c: null,
      d: {},
      e: []
    };

    const output = dontReturnEmpty(input);

    expect(output).toEqual(undefined);
  });
  it('works on nested objects', () => {
    const input: any = {
      a: undefined,
      b: undefined,
      c: null,
      d: {},
      e: [],
      f: {
        g: [],
        h: {},
        i: [{}]
      },
      j: [{ k: [] }, []]
    };

    const output = dontReturnEmpty(input);

    expect(output).toEqual(undefined);
  });
});