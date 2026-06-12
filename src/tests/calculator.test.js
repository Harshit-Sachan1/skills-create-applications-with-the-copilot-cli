const { spawnSync } = require('child_process');
const path = require('path');

function run(...args) {
  const res = spawnSync('node', [path.join(__dirname, '..', 'calculator.js'), ...args], { encoding: 'utf8' });
  return res;
}

test('addition: 2 + 3 = 5', () => {
  const r = run('add', '2', '3');
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('5');
});

test('subtraction: 10 - 4 = 6', () => {
  const r = run('subtract', '10', '4');
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('6');
});

test('multiplication: 45 * 2 = 90', () => {
  const r = run('multiply', '45', '2');
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('90');
});

test('division: 20 / 5 = 4', () => {
  const r = run('divide', '20', '5');
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('4');
});

test('addition with multiple operands', () => {
  const r = run('add', '1', '2', '3', '4');
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('10');
});

test('division by zero returns error', () => {
  const r = run('divide', '10', '0');
  expect(r.status).not.toBe(0);
  expect(r.stderr.toLowerCase()).toMatch(/divide by zero/);
});

test('invalid operand returns error', () => {
  const r = run('add', '2', 'x');
  expect(r.status).not.toBe(0);
  expect(r.stderr.toLowerCase()).toMatch(/operands must be valid numbers|all operands must be valid numbers/);
});

test('modulo: 5 % 2 = 1', () => {
  const r = run('mod', '5', '2');
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('1');
});

test('power: 2 ^ 3 = 8', () => {
  const r = run('pow', '2', '3');
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('8');
});

test('power with negative exponent: 2 ^ -3 = 0.125', () => {
  const r = run('pow', '2', '-3');
  expect(r.status).toBe(0);
  expect(parseFloat(r.stdout.trim())).toBeCloseTo(0.125);
});

test('square root: sqrt 16 = 4', () => {
  const r = run('sqrt', '16');
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('4');
});

test('modulo by zero returns error', () => {
  const r = run('mod', '10', '0');
  expect(r.status).not.toBe(0);
  expect(r.stderr.toLowerCase()).toMatch(/modulo by zero/);
});

test('sqrt negative returns error', () => {
  const r = run('sqrt', '-4');
  expect(r.status).not.toBe(0);
  expect(r.stderr.toLowerCase()).toMatch(/square root of negative/);
});
