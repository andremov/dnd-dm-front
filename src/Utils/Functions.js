export function RollDie( sides = 6 ) {
    return Math.floor((Math.random() * sides) + 1)
}

const validChars = 'a-zA-Z0-9.,!?¡¿ ñ\''
const charsLine = 58;

export function validCharacter( text ) {
    let re = new RegExp('[' + validChars + '\n\r]*');
    let p = text;
    let m = p.match(re);
    return (m[0].length === p.length);
}

export function numLines( text ) {
    let re = new RegExp(
        '[' + validChars + ']{' + charsLine + '}\r\n|' +
        '[' + validChars + ']{' + charsLine + '}\r|' +
        '[' + validChars + ']{' + charsLine + '}\n|' +
        '[' + validChars + ']{' + charsLine + '}|' +
        '\r\n|' +
        '\r|' +
        '\n',
        'g'
    )
    return text.match(re) ? text.match(re).length : 0;
}

export function textHeight( text, linePadding = 0 ) {
    return (numLines(text) + linePadding + 2) * 16 * 1.4;
}
