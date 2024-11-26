module.exports = {
    transform: {
      '^.+\\.(c|m)?(js|jsx)$': 'babel-jest',
    },
    testRegex: [ "(\\.|/)(test|spec)\\.m?[jt]sx?$" ],
    testEnvironment: "jsdom"
  };