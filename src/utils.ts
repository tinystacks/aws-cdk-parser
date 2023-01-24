import { CdkDiff, Json } from '@tinystacks/precloud';

export function getResourceFromDiff (diff: CdkDiff, cloudformationTemplate: Json) {
  const { logicalId } = diff;
  const resource = Object.entries<Json>(cloudformationTemplate.Resources).find(([key]) => key === logicalId);

  if (!resource || resource.length < 2) { return undefined; }
  return resource[1];
}