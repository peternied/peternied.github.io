let a = require('./redirect.js');

test('getQueryParam should retrieve query parameter value', () => {
  const url = '?owner=test-owner&repo=test-repo';
  global.window = { location: { search: url } };
  const redirUrl = a.start();
  expect(redirUrl).toBe('test-owner');
  expect(getQueryParam('repo')).toBe('test-repo');
});