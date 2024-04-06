import { createStore } from "redux";
import namesReducer from "./Reducer";

// Creating the Redux store with the namesReducer
const namesStore = createStore(namesReducer);

// Exporting the store
export default namesStore;
