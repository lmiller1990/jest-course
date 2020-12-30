function pokerHands(hands) {
  return []
}

// the cards must be sorted
function bestCard(hands) {
  return hands.reduce((best, hand) => {
    if (best < hand.cards[0]) {
      return hand.cards[0]
    }
    return best
  }, hands[0].cards[0])
}

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

function normalizeHand(hand) {
  const cards = hand.cards.map(card => {
    return card.slice(0, card.length - 1)
      .replace('a', '14')
      .replace('k', '13')
      .replace('q', '12')
      .replace('j', '11')
  }).sort((x, y) => y - x)

  return {
    ...hand,
    cards
  }
}

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

xdescribe('pokerHands', () => {
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
})