import React, { useState, useReducer, useEffect, useRef } from "react";
import Modal from "./Modal";
// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADDING_ITEM":
      const newItems = [...state.people, action.payload];
      return {
        ...state,
        people: newItems,
        isModalOpen: true,
        modalContent: "Item Added!",
      };

    case "NO_TYPE":
      return {
        ...state,
        isModalOpen: true,
        modalContent: "Please enter some value!",
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        people: state.people.filter((item) => item.id !== action.payload),
        modalContent: "item deleted!",
        isModalOpen: true,
      };

    default:
      return state;
  }
};

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: "numb",
};

const Index = () => {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const refInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: "ADDING_ITEM", payload: newItem });
      setName("");
    } else {
      dispatch({ type: "NO_TYPE" });
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  useEffect(() => {
    refInput.current.focus();
  });

  return (
    <>
      {state.isModalOpen && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <input
            ref={refInput}
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      {state.people?.map((person) => (
        <div key={person.id} className="item">
          <h4>{person.name}</h4>
          <button
            onClick={() =>
              dispatch({ type: "REMOVE_ITEM", payload: person.id })
            }
          >
            remove
          </button>
        </div>
      ))}
    </>
  );
};

export default Index;
