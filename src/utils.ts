import isPlainObject from 'lodash.isplainobject';
import isNil from 'lodash.isnil';
import { CdkDiff, Json } from '@tinystacks/precloud';

export function getResourceFromDiff (diff: CdkDiff, cloudformationTemplate: Json) {
  const { logicalId } = diff;
  const resource = Object.entries<Json>(cloudformationTemplate.Resources).find(([key]) => key === logicalId);

  if (!resource || resource.length < 2) { return undefined; }
  return resource[1];
}

export function dontReturnEmpty (properties: Json): Json | undefined {
  const values = Object.values(properties);
  const objectIsEmpty = values.every((value) => {
    if(isPlainObject(value)) {
      return isNil(dontReturnEmpty(value));
    } else if (Array.isArray(value)) {
      return value.map(dontReturnEmpty).every(isNil);
    }
    return isNil(value);
  });
  return objectIsEmpty ? undefined : properties;
}