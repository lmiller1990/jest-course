const {
  normalizeHand,
  bestCard,
  pokerHands
} = require('./pokerHands.js')

describe('bestCard', () => {
  it('returns highest card in play', () => {
    const p1 = {
      id: 1,
      cards: ['12', '10', '3']
    }
    const p2 = {
      id: 2,
      cards: ['14', '12', '2']
    }

    expect(bestCard([p1, p2])).toEqual('14')
  })
})

describe('normalizeHand', () => {
  it('sorts the hand out and replace letters with numbers', () => {
    const p1 = {
      id: 1,
      cards: ['5d', '3d', '4d', 'kc', '10c']
    }

    expect(normalizeHand(p1)).toEqual({
      id: 1,
      cards: ['13', '10', '5', '4', '3']
    })
  })
})

describe('pokerHands', () => {
  it('p1 wins with a high card', () => {
    const p1 = {
      id: 1,
      cards: ['3d', '4d', '5d', '10c', 'kc']
    }
    const p2 = {
      id: 2,
      cards: ['3c', '4c', '5c', 'jc', 'qh']
    }

    expect(pokerHands([p1, p2])).toEqual([p1])
  })

  it('p2 wins with a high card', () => {
    const p1 = {
      id: 1,
      cards: ['3d', '4d', '5d', '10c', 'kc']
    }
    const p2 = {
      id: 2,
      cards: ['3c', '4c', '5c', 'jc', 'kh']
    }

    expect(pokerHands([p1, p2])).toEqual([p2])
  })

  it('all players have the hand', () => {
    const p1 = {
      id: 1,
      cards: ['3d', '4d', '5d', '10c', 'kc']
    }
    const p2 = {
      id: 2,
      cards: ['3h', '4h', '5h', '10d', 'kd']
    }
    const p3 = {
      id: 3,
      cards: ['3c', '4c', '5c', '10h', 'kh']
    }

    expect(pokerHands([p1, p2, p3]))
      .toEqual([p1, p2, p3])
  })
})