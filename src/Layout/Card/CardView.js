import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";
export default function CardView({ card: { id, front, back }, deck, setDeck }) {
  const url = useRouteMatch().url;
  function handleDelete() {
    const abortController = new AbortController();
    if (window.confirm("Delete this card?")) {
      deleteCard(id, abortController.signal)
        .then(() => {
          const filteredCards = deck.cards.filter(
            (selected) => selected.id !== id
          );
          setDeck(() => {
            return { ...deck, cards: filteredCards };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  return (
    <div className="card container">
      <div className="d-flex row ">
        <div className="col-6">
          <p>{front}</p>
        </div>
        <div className="col-6">
          <p>{back}</p>
        </div>
      </div>
      <div className=" float-right text-right">
        <Link
          to={`${url}/cards/${id}/edit`}
          className="btn btn-secondary ml-1 oi oi-pencil"
        >
          Edit
        </Link>
        <button
          className="btn btn-danger float-right oi oi-trash ml-3"
          onClick={handleDelete}
        ></button>
      </div>
    </div>
  );
}