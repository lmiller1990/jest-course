test('', () => {
  const a = {
    foo: {
      num : 1
    }
  }

  expect(a).toHaveProperty(
    'foo', { num : 1 }
  )
})