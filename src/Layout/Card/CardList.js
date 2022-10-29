import React, { useEffect } from "react";

import CardView from "./CardView";

export default function CardList({
  deck,
  setDeck,
  decks,
  setDecks,
  cards,
  setCards,
}) {
  useEffect(() => {
    const abortController = new AbortController();
    if (deck.cards !== undefined) {
      const tempCards = deck.cards;
      tempCards.sort((card1, card2) => card1.id - card2.id);
      setCards(tempCards);
    }

    return () => abortController.abort();
  }, [deck, setCards]);
  console.log(cards);
  const list = cards.map((card, index) => (
    <CardView
      card={card}
      key={index}
      cards={cards}
      setCards={setCards}
      deck={deck}
      setDeck={setDeck}
      decks={decks}
      setDecks={setDecks}
    />
  ));

  return (
    <div>
      <h2>Cards</h2>
      {list}
    </div>
  );
}
