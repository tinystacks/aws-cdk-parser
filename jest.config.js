// eslint-disable-next-line
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['.d.ts', '.js'],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 40, // because of default value branches
      functions: 95,
      lines: 95,
      statements: 95
  }
}
};