function firstToUpperCase(word) {
    const lowerCase = word.toLowerCase().trim();
    const result = lowerCase[0].toUpperCase() + lowerCase.slice(1);
    return result;
}

module.exports = {firstToUpperCase}