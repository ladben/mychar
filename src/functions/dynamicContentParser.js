function parseExpression (content, character, array = false) {
    // expression: {druid_lvl} le %5% '1d8'
    const operatorRegex = /{[^}]*}|%[^%]*%|'[^']*'/g;
    const operator = content.replace(operatorRegex, '').trim().split(' ')[0];

    const expressionRegex = /{([^}]+)}/g;
    const expressionMatches = content.match(expressionRegex) || [];
    const expressions = expressionMatches.map(match => match.slice(1, -1));

    const roundingRegex = /#roundup#/;
    const isRoundUp = roundingRegex.test(content);

    const constantRegex = /%([^%]+)%/g;
    const constantMatches = content.match(constantRegex) || [];
    const constants = constantMatches.map(match => match.slice(1, -1));

    const valueRegex = /'([^']+)'/g;
    const valueMatches = content.match(valueRegex) || [];
    const values = valueMatches.map(match => match.slice(1, -1));

    // if content is only a value
    if (!operator && !expressions.length && !constants.length && values.length) {
        if (array) {
            return null;
        }

        return values[0];
    }

    // if content is only an expression
    if (!operator && expressions.length && !constants.length && !values.length) {
        if (array) {
            return null;
        }

        return character[expressions[0]]
    }

    // if content is only expression, operator and/or constant
    if (operator && expressions.length && constants.length && !values.length) {
        if (array) {
            return null;
        }

        const exp_values = expressions.map(expression => character[expression]);
        const const_values = constants.map(constant=> parseInt(constant));

        if (operator === '+') {
            return exp_values.reduce((acc, curr) => acc + curr) + const_values.reduce((acc, curr) => acc + curr);
        }
        if (operator === '-') {
            return exp_values.reduce((acc, curr) => acc - curr) - const_values.reduce((acc, curr) => acc - curr);
        }
        if (operator === '*') {
            return exp_values.reduce((acc, curr) => acc * curr) * const_values.reduce((acc, curr) => acc * curr);
        }
        if (operator === '/') {
            if (isRoundUp) {
                return Math.ceil(exp_values.reduce((acc, curr) => acc / curr) / const_values.reduce((acc, curr) => acc / curr));
            }
            return Math.floor(exp_values.reduce((acc, curr) => acc / curr) / const_values.reduce((acc, curr) => acc / curr));
        }
    }

    // if content is only expression and operator
    if (operator && expressions.length && !constants.length && !values.length) {
        if (array) {
            return null;
        }

        const exp_values = expressions.map(expression => character[expression]);

        if (operator === '+') {
            return exp_values.reduce((acc, curr) => acc + curr);
        }
        if (operator === '-') {
            return exp_values.reduce((acc, curr) => acc - curr);
        }
        if (operator === '*') {
            return exp_values.reduce((acc, curr) => acc * curr);
        }
        if (operator === '/') {
            if (isRoundUp) {
                return Math.ceil(exp_values.reduce((acc, curr) => acc / curr));
            }
            return Math.floor(exp_values.reduce((acc, curr) => acc / curr));
        }
    }

    // if content is expression, operator, constant and value
    if (operator && expressions.length && constants.length && values.length) {
        if (array) {
            return null;
        }

        const exp_value = character[expressions[0]];
        const const_value = parseInt(constants[0]);
        const val_value = values[0];

        if (operator === 'lt') {
            if (exp_value < const_value) {
                return val_value;
            }
            return null;
        }

        if (operator === 'le') {
            if (exp_value <= const_value) {
                return val_value;
            }
            return null;
        }

        if (operator === 'gt') {
            if (exp_value > const_value) {
                return val_value;
            }
            return null;
        }

        if (operator === 'ge') {
            if (exp_value >= const_value) {
                return val_value;
            }
            return null;
        }
    }

    return null;
}

function decipherExpression (expression, character) {
    const exp_array = expression.split(';');
    const decipheredExp_array = exp_array.map(exp => parseExpression(exp, character));

    return decipheredExp_array.find(item => item !== null);
}


function processText (text, character) {
    const regex = /\$([^$]+)\$/g;

    return text.replace(regex, (match, expression) => {
        return decipherExpression(expression.trim(), character);
    });
}

export {parseExpression, decipherExpression, processText};