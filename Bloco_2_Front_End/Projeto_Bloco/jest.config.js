export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.[tj]sx?$": "ts-jest", 
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "^.+\\.svg$": "jest-transformer-svg",
    },
  
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    
  };