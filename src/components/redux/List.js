import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionAddPerson, actionRemovePerson } from "./Actions";

function ListComponent() {
  const [inputName, setInputName] = useState("");

  // Accessing the Redux state to get the names list
  const namesFromStore = useSelector((state) => {
    return state.namesList;
  });

  // Getting the dispatch function from useDispatch hook
  const dispatchAction = useDispatch();

  // Function to handle the addition of a name
  function handleAddName(event) {
    event.preventDefault();
    if (inputName.trim() !== "") {
      dispatchAction(actionAddPerson(inputName));
      setInputName("");
    }
  }

  // Function to handle the deletion of a name by its index
  function handleDeleteName(indexToDelete) {
    dispatchAction(actionRemovePerson(indexToDelete));
  }

  function handleChange(event) {
    setInputName(event.target.value);
  }

  return (
    <div>
      <h2>Add Name</h2>
      <form onSubmit={handleAddName}>
        <input
          type="text"
          value={inputName}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <button type="submit">Add</button>
      </form>

      <h2>Names List</h2>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {namesFromStore.map((individualName, nameIndex) => (
            <tr key={nameIndex}>
              <td>{nameIndex}</td>
              <td>{individualName}</td>
              <td>
                <button onClick={() => handleDeleteName(nameIndex)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListComponent;
