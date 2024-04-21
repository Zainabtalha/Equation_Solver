// Simulate asynchronous operation
const asyncOperation = (operationFn) => {
    return new Promise(resolve => setTimeout(() => resolve(operationFn()), 1000));
};

// Asynchronous calculation functions
const squareValue = (value) => asyncOperation(() => value * value);
const negateValue = (value) => asyncOperation(() => -value);
const assembleEquationPart = (coefficient, variable) => asyncOperation(() => `(${variable} - (${coefficient}))^2`);
const addEquationParts = (part1, part2, equalsValue) => asyncOperation(() => `${part1} + ${part2} = ${equalsValue}`);

// Asynchronous function to solve the circle equation
async function solveCircle() {
    const centerX = parseFloat(document.getElementById('center-x').value);
    const centerY = parseFloat(document.getElementById('center-y').value);
    const radius = parseFloat(document.getElementById('radius').value);

    if (isNaN(centerX) || isNaN(centerY) || isNaN(radius)) {
        updateResult('Please enter valid numbers for center coordinates and radius.');
        return;
    }

    try {
        // Calculating multiple parts of the equation asynchronously
        const [hSquared, kSquared, negativeH, negativeK, rSquared] = await Promise.all([
            squareValue(centerX),
            squareValue(centerY),
            negateValue(centerX),
            negateValue(centerY),
            squareValue(radius)
        ]);

        // Assembling the equation parts
        const xPart = await assembleEquationPart(negativeH, 'x');
        const yPart = await assembleEquationPart(negativeK, 'y');
        const equation = await addEquationParts(xPart, yPart, rSquared);

        updateResult(`The equation of the circle is:<br>${equation}`);
    } catch (error) {
        updateResult('An error occurred during calculation.');
    }
}

// Function to display results
function updateResult(message) {
    document.getElementById('result').innerHTML = message;
}