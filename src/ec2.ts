import { CdkDiff, Json } from '@tinystacks/precloud';
import { getResourceFromDiff } from './utils';

// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_Address.html
function parseEip (diff: CdkDiff, cloudformationTemplate: Json): Json {
  
  const cfnEntry = getResourceFromDiff(diff, cloudformationTemplate);
  if (!cfnEntry) { return undefined; }

  const domain = cfnEntry.Properties?.Domain;
  const instanceId = cfnEntry.Properties?.InstanceId;
  const networkBorderGroup = cfnEntry.Properties?.NetworkBorderGroup;
  const publicIpv4Pool = cfnEntry.Properties?.PublicIpv4Pool;
  const tagSet = cfnEntry.Properties?.Tags;

  return {
    domain,
    instanceId,
    networkBorderGroup,
    publicIpv4Pool,
    tagSet
  };
}

export {
  parseEip
};