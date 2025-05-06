module.exports = {
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      pageTitle: 'HackFolio Test Report',
      outputPath: './controller/test/test-report-generated.html',
      includeFailureMsg: true,
      includeSuiteFailure: true
    }],
    ['jest-junit', {
      outputDirectory: './controller/test',
      outputName: 'test-report-generated.xml',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
      ancestorSeparator: ' › '
    }]
  ],
  testEnvironment: 'node',
  forceExit: true,
  testTimeout: 10000,
  detectOpenHandles: true
};
