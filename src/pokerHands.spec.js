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

function pokerHands(hands) {
  const norm = hands.map(normalizeHand)
  const best = bestCard(norm)

  function filterHands(sortedHands, best) {
    const candidates = sortedHands.filter(hand => {
      return hand.cards.includes(best)
    })

    if (candidates.length > 1) {
      // everyone wins?
      if (candidates[0].cards.length === 1) {
        if (candidates.every(can =>
          can.cards[0] === best
        )) {
          const ids = candidates.map(x => x.id)
          return hands.filter(hand => 
            ids.includes(hand.id)
          )
        }
      }
      
      const handWithHighestCardRemoved = 
        candidates.map(hand => {
        return {
          id: hand.id,
          cards: hand.cards.filter(card => card !== best)
        }
      })

      const newBest = bestCard(handWithHighestCardRemoved)
      return filterHands(handWithHighestCardRemoved, newBest)
    }

    return hands.filter(hand => hand.id === candidates[0].id)
  }

  return filterHands(norm, best)
}

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