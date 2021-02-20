test('', () => {
  // ===
  // string
  // number
  expect(1).toBe(1)
  expect('cat').toBe('cat')
  const a = {
    foo: 'bar'
  }
  const b = {
    foo: 'bar'
  }

  // toEqual
  expect([]).toBe([])
})