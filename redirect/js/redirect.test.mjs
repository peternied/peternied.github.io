import {issueCheckAndRedirect} from './issue-redirect';
import { prCheckAndRedirect } from './pr-redirect';

beforeAll(() => {
  delete window.location;
});

test('issueCheckAndRedirect works with minimal parameters', () => {
  const url = '?owner=test-owner&repo=test-repo&created-since-days=14';
  window.location = { search: url };
  const redirUrl = issueCheckAndRedirect();
  expect(redirUrl).toBe('https://github.com/test-owner/test-repo/issues?q=is%3Aissue+is%3Aopen+created%3A%3E2024-11-12');
});

test('issueCheckAndRedirect does not redirect when no parameters', () => {
  const url = '?owner=test-owner&repo=test-repo';
  window.location = { search: url };
  const redirUrl = issueCheckAndRedirect();
  expect(redirUrl).toBe(undefined);
});

test('prCheckAndRedirect works with minimal parameters', () => {
  const url = '?owner=test-owner&repo=test-repo&created-since-days=14';
  window.location = { search: url };
  const redirUrl = prCheckAndRedirect();
  expect(redirUrl).toBe('https://github.com/test-owner/test-repo/issues?q=is%3Apr+is%3Aopen+created%3A%3E2024-11-12');
});

test('prCheckAndRedirect does not redirect when no parameters', () => {
  const url = '?owner=test-owner&repo=test-repo';
  window.location = { search: url };
  const redirUrl = prCheckAndRedirect();
  expect(redirUrl).toBe(undefined);
});