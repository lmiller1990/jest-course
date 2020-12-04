function isEven(x) {
  return x % 2 === 0 
}

// describe, it
describe('isEven', () => {
  it.each([
    [0, true],
    [1, false],
    [2, true],
  ])('isEven(%i)', (input, actual) => {
    expect(isEven(input)).toBe(actual)
  })

  it('returns true for an odd value', () => {
    expect(isEven(0)).toBe(true)
  })

  it('returns false for an odd value', () => {
    expect(isEven(1)).toBe(false)
  })

  it('returns true for an even value', () => {
    expect(isEven(2)).toBe(true)
  })
})