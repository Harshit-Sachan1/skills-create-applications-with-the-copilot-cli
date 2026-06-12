#!/usr/bin/env node

// Node.js CLI Calculator
// Supports operations:
// - addition
// - subtraction
// - multiplication
// - division
// - modulo
// - exponentiation (power)
// - square root
// Usage examples:
//   node src/calculator.js add 2 3
//   node src/calculator.js subtract 5 2
//   node src/calculator.js multiply 3 4
//   node src/calculator.js divide 10 2
//   node src/calculator.js mod 10 3
//   node src/calculator.js pow 2 8
//   node src/calculator.js sqrt 9

// Returns the remainder of a divided by b
function modulo(a, b) {
  return a % b;
}

// Returns base raised to the exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Returns the square root of n (errors on negative input)
function squareRoot(n) {
  if (n < 0) {
    throw new Error('square root of negative number');
  }
  return Math.sqrt(n);
}

function printHelp() {
  console.log(`Usage: node src/calculator.js <operation> <num1> <num2> [...nums]

Operations:
  add       Add all operands
  subtract  Subtract subsequent operands from the first
  multiply  Multiply all operands
  divide    Divide the first operand by subsequent operands (checks divide-by-zero)
  mod       Remainder of division (modulo)
  pow       Power/exponentiation (base exponent)
  sqrt      Square root (single operand)

Examples:
  node src/calculator.js add 1 2 3
  node src/calculator.js divide 10 2
  node src/calculator.js mod 10 3
  node src/calculator.js pow 2 8
  node src/calculator.js sqrt 9
`);
}

const [, , op, ...rest] = process.argv;

if (!op || op === '--help' || op === '-h') {
  printHelp();
  process.exit(op ? 0 : 1);
}

if (rest.length === 0) {
  console.error('Error: missing numeric operands. See --help for usage.');
  process.exit(1);
}

const nums = rest.map((s) => {
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
});

if (nums.some(Number.isNaN)) {
  console.error('Error: all operands must be valid numbers.');
  process.exit(1);
}

let result;

switch (op.toLowerCase()) {
  case 'add':
    // addition: sum all operands
    result = nums.reduce((a, b) => a + b, 0);
    break;
  case 'subtract':
    // subtraction: subtract all subsequent operands from the first
    result = nums.slice(1).reduce((a, b) => a - b, nums[0]);
    break;
  case 'multiply':
  case 'mul':
    // multiplication: multiply all operands
    result = nums.reduce((a, b) => a * b, 1);
    break;
  case 'divide':
  case 'div':
    // division: divide the first operand by each subsequent operand
    if (nums.slice(1).some((n) => n === 0)) {
      console.error('Error: divide by zero');
      process.exit(1);
    }
    result = nums.slice(1).reduce((a, b) => a / b, nums[0]);
    break;
  case 'mod':
  case 'modulo':
    // modulo: remainder of first operand divided by second
    if (nums.length < 2) {
      console.error('Error: mod requires two operands');
      process.exit(1);
    }
    if (nums[1] === 0) {
      console.error('Error: modulo by zero');
      process.exit(1);
    }
    result = modulo(nums[0], nums[1]);
    break;
  case 'pow':
  case 'power':
    // exponentiation: base ^ exponent (requires two operands)
    if (nums.length < 2) {
      console.error('Error: pow requires base and exponent');
      process.exit(1);
    }
    result = power(nums[0], nums[1]);
    break;
  case 'sqrt':
  case 'squareroot':
    // square root: requires single non-negative operand
    if (nums.length < 1) {
      console.error('Error: sqrt requires one operand');
      process.exit(1);
    }
    try {
      result = squareRoot(nums[0]);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
    break;
  default:
    console.error(`Error: unknown operation "${op}". Use --help to see supported operations.`);
    process.exit(1);
}

// Print the result
if (Number.isFinite(result)) {
  // Trim trailing .0 for integers
  if (Number.isInteger(result)) console.log(result);
  else console.log(result);
  process.exit(0);
} else {
  console.error('Error: calculation resulted in a non-finite number.');
  process.exit(1);
}
