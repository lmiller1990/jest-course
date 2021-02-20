test('', async () => {
  const a = {
    foo: {
      num : 1
    }
  }

  const p = new Promise((res, rej) => {
    rej(a)
  })

  await expect(p).rejects.toEqual({
    foo: {
      num: 1
    }
  })

  // ...
})