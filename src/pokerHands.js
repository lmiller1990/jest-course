function bestCard(hands) {
  return hands.reduce((best, hand) => {
    if (best < hand.cards[0]) {
      return hand.cards[0]
    }
    return best
  }, hands[0].cards[0])
}

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
        if (candidates.every(can => can.cards[0] === best)) {
          const ids = candidates.map(x => x.id)
          return hands.filter(hand => ids.includes(hand.id))
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

module.exports = {
  pokerHands,
  normalizeHand,
  bestCard
}