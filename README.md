# aws-cdk-parser
An AWS CDK parser for a few key resources.  Intended as a plugin for @tinystacks/iac-utils smoke test cli.

## How To Use
Install as a dev dependency in your cdk project.
`npm i -D @tinystacks/aws-cdk-parser`

Add to the awsCdkParsers in your smoke-test.config.json.
```json
{
  // ...
  "awsCdkParsers": [
    // ...
    "@tinystacks/aws-cdk-parser"
    // ...
  ]
}
```