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
