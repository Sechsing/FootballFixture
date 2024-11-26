module.exports = {
    preset: 'ts-jest',  // Use the ts-jest preset for TypeScript support
    testEnvironment: 'node',  // Set the test environment to Node (use 'jsdom' for browser-like environment)
    transform: {
      '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest for transforming TypeScript files
    },
  };
  