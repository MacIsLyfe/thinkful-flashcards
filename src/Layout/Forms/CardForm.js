import React, { useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { updateCard, createCard, readCard } from "../../utils/api";

export default function CardForm({
  decks,
  setDecks,
  deck,
  setDeck,
  deckUrl,
  cards,
  setCards,
}) {
  const [formData, setFormData] = useState({ front: "", back: "" });
  const history = useHistory();
  const { url } = useRouteMatch();
  const subUrls = url.split(`/`);
  const [edit, setEdit] = useState(false);
  let decksTemp = decks;
  const deckTemp = deck;
  // if edit then setFormdata to current card using card id from url
  // eslint-disable-next-line
  useEffect(() => {
    if (subUrls[subUrls.length - 1] === "edit") {
      setEdit(true);
      readCard(subUrls[subUrls.length - 2])
        .then(setFormData)
        .catch(console.log("Bad magnitude 10"));
    }
  });

  function handleChange({ target }) {
    setFormData(() => ({
      ...formData,
      [target.name]: target.value,
    }));
  }
  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    let theArguments = [deck.id, formData, abortController.signal];
    let handleFunction = createCard;
    if (edit) {
      theArguments = [formData, abortController.signal];
      handleFunction = updateCard;
    }
    handleFunction(...theArguments)
      .then((response) => {
        deckTemp.cards = deckTemp.cards.filter(
          (card) => card.id !== response.id
        );
        deckTemp.cards.push(response);
        setDeck({ ...deckTemp });
      })
      .then(() => {
        decksTemp = decksTemp.filter((theDeck) => theDeck.id !== deck.id);
        decksTemp.push(deckTemp);
        setDecks([...decksTemp]);
        if (!edit) {
          setFormData({ front: "", back: "" });
        } else {
          history.push(deckUrl);
        }
        // if edit got to view screen
      })
      .catch(console.log("Bad magnitude 10"));
    return () => abortController.abort();
  }
  return (
    <form name="createDeck" onSubmit={submitHandler}>
      <div className="front">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          type="text"
          name="front"
          value={formData.front}
          placeholder="Front side of card"
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          type="text"
          name="back"
          value={formData.back}
          placeholder="Back Side of card"
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>
      <Link className="btn btn-secondary mr-1" to={deckUrl}>
        Done
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}