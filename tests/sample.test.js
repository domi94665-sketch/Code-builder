const sum = (a, b) => a + b;

test('sum adds two numbers', () => {
  expect(sum(1, 2)).toBe(3);
});
