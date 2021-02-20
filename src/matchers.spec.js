test('', () => {
  // ===
  // string
  // number
  expect(1).not.toBe(1)
  expect('cat').toBe('cat')
  const a = {
    foo: 'bar'
  }
  const b = {
    foo: 'bar'
  }

  // toEqual
  expect(a).not.toEqual(b)
})