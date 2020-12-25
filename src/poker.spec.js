
// p1 wins with high card over high card

function normalizeHand(hand) {
  return {
    ...hand,
    cards: hand.cards.map(card =>
      card
        .slice(0, card.length - 1)
        .replace('j', '11')
        .replace('q', '12')
        .replace('k', '13')
        .replace('a', '14')
    )
  }
}

function pokerHands(hands) {
  let sortedHands = hands
    .map(hand => {
      const norm = normalizeHand(hand)
      norm.cards.sort((x, y) => y - x)
      return norm
    })
  
  function bestCard(hands) {
    return hands
      .reduce((best, nextHand) => {
        if (nextHand.cards[0] > best) {
          return nextHand.cards[0]
        }
        return best
      }, hands[0].cards[0])
  }

  function filterByCard(hands, best) {
    const candidates = sortedHands.filter(hand =>
      hand.cards.includes(best)
    )

    if (candidates.length > 1) {
      // tied game?
      if (hands.every(c => c.cards.length === 1)) {
        return hands.map(x => x.id)
      }

      const handsWithoutCard = hands.map(hand => {
        return {
          ...hand,
          cards: hand.cards.filter(x => x !== best)
        }
      })
      const newBestCard = bestCard(handsWithoutCard)
      return filterByCard(handsWithoutCard, newBestCard)
    }

    return [candidates[0].id]
  }

  const best = bestCard(sortedHands)
  return filterByCard(sortedHands, best)
}

describe('pokerHands', () => {
  test('p1 wins with a higher card', () => {
    const p1 = ['3d', '4d', '5d', '10c', 'kc']
    const p2 = ['3c', '4c', '5c', 'jc', 'kh']

    const actual = pokerHands([
      {id: 1, cards: p1}, {id: 2, cards: p2}
    ])

    expect(actual).toEqual([2])
  })

  test.only('handles a tied scenario', () => {
    const p1 = ['3d', '4d', '5d', '10c', 'kc']
    const p2 = ['3h', '4h', '5h', '10d', 'kc']

    const actual = pokerHands([
      {id: 1, cards: p1}, {id: 2, cards: p2}
    ])

    expect(actual).toEqual([1, 2])
  })
})