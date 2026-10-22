// Label formatting function enforcing <= maxLen character wrapping logic
function formatLabel(str, maxLen = 16) {
    if (typeof str !== 'string' || str.length <= maxLen) return str;
    const words = str.split(' ');
    const lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + ' ' + word).trim().length > maxLen) {
            if (currentLine) lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine += (currentLine ? ' ' : '') + word;
        }
    });
    if (currentLine) lines.push(currentLine.trim());
    return lines;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatLabel };
}
