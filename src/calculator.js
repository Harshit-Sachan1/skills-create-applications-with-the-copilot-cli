#!/usr/bin/env node

// Node.js CLI Calculator
// Supports operations:
// - addition
// - subtraction
// - multiplication
// - division
// Usage examples:
//   node src/calculator.js add 2 3
//   node src/calculator.js subtract 5 2
//   node src/calculator.js multiply 3 4
//   node src/calculator.js divide 10 2

function printHelp() {
  console.log(`Usage: node src/calculator.js <operation> <num1> <num2> [...nums]

Operations:
  add       Add all operands
  subtract  Subtract subsequent operands from the first
  multiply  Multiply all operands
  divide    Divide the first operand by subsequent operands (checks divide-by-zero)

Examples:
  node src/calculator.js add 1 2 3
  node src/calculator.js divide 10 2
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
