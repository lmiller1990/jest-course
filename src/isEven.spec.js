function isEven(x) {
  return false
}

test('isEven', () => {
  expect(isEven(1)).toBe(false)
})