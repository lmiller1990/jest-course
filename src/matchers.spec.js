const fetchData = (cb) => {
  // .......
  const val = 'Data'

  cb(val)
}

test('', async () => {
  const cb = jest.fn()
  fetchData(cb)

  expect(cb).toHaveBeenCalledWith('Data')
})