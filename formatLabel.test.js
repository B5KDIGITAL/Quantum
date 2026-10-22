const fs = require('fs');
const test = require('node:test');
const assert = require('node:assert');

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
const start = lines.findIndex(line => line.includes('function formatLabel'));
const end = lines.findIndex((line, i) => i > start && line.includes('return lines;'));
const formatLabelStr = lines.slice(start, end + 2).join('\n');
const formatLabel = new Function(`return ${formatLabelStr}`)();

test('formatLabel', async (t) => {
    await t.test('Happy path - string under max length', () => {
        assert.strictEqual(formatLabel('short string'), 'short string');
    });

    await t.test('Happy path - string over max length', () => {
        assert.deepStrictEqual(formatLabel('this is a longer string that needs wrapping'), ['this is a longer', 'string that', 'needs wrapping']);
    });

    await t.test('Edge case - custom max length', () => {
        assert.deepStrictEqual(formatLabel('this is a longer string', 10), ['this is a', 'longer', 'string']);
    });

    await t.test('Edge case - long word exceeding max length', () => {
        assert.deepStrictEqual(formatLabel('this supercalifragilisticexpialidocious string', 16), ['this', 'supercalifragilisticexpialidocious', 'string']);
    });

    await t.test('Edge case - exact boundary', () => {
        assert.strictEqual(formatLabel('exact sixteen ch'), 'exact sixteen ch');
    });

    await t.test('Edge case - string just over boundary', () => {
        assert.deepStrictEqual(formatLabel('exact sixteen ch+', 16), ['exact sixteen', 'ch+']);
    });

    await t.test('Edge case - multiple consecutive spaces', () => {
        assert.deepStrictEqual(formatLabel('string   with   spaces   '), ['string   with', 'spaces']);
    });

    await t.test('Edge case - empty string', () => {
        assert.strictEqual(formatLabel(''), '');
    });

    await t.test('Invalid inputs', () => {
        assert.strictEqual(formatLabel(null), null);
        assert.strictEqual(formatLabel(undefined), undefined);
        assert.strictEqual(formatLabel(123), 123);
        assert.deepStrictEqual(formatLabel({}), {});
        assert.deepStrictEqual(formatLabel([]), []);
    });
});
