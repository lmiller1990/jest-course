test('', () => {
  const a = {
    foo: {
      num : 1
    }
  }

  const p = new Promise(res => {
    setTimeout(() => {
      res(a)
    }, 1000)
  })

  return expect(p).resolves.toEqual({
    foo: {
      num: 1
    }
  })
})