module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/testSetup.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  verbose: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/index.ts',
    'src/Docs/',
    'src/MetaInfoHelpers/dummyData.js',
    'src/Utils/types.ts',
    'src/DesignerApi/advancedDemo.js',
    'src/DesignerApi/basicDemo.js',
    'src/DesignerApi/messages.js',
    'src/index.d.ts',
    'src/DesignerApi/DesignerApi.d.ts',
    'src/index.d.ts',
    'src/Utils/index.d.ts'
  ],
  transformIgnorePatterns: ['/node_modules/(?!lodash-es).+\\.js$']
};
