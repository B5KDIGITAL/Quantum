const assert = require('assert');
const { formatLabel } = require('./utils.js');

// Test string shorter than maxLen
assert.strictEqual(formatLabel('Hello World', 16), 'Hello World');

// Test non-string input
assert.strictEqual(formatLabel(123), 123);
assert.strictEqual(formatLabel(null), null);

// Test wrapping logic
assert.deepStrictEqual(formatLabel('This is a very long label that needs to be wrapped', 16), [
    'This is a very',
    'long label that',
    'needs to be',
    'wrapped'
]);

// Test maxLen customization
assert.deepStrictEqual(formatLabel('This is a test', 5), [
    'This',
    'is a',
    'test'
]);

console.log('All tests passed!');
