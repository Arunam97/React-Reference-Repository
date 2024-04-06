import ActionTypes from "./ActionTypes";

// Reducer function for handling state changes in the names list
export default function namesReducer(
  currentState = { namesList: [] },
  incomingAction
) {
  switch (incomingAction.type) {
    case ActionTypes.ACTION_ADD_NAME:
      // Handle adding a new name
      return {
        namesList: currentState.namesList.concat(incomingAction.payload)
      };

    case ActionTypes.ACTION_DELETE_NAME:
      // Handle deleting a name by index
      return {
        namesList: currentState.namesList.filter(
          (element, index) => index !== incomingAction.index
        )
      };

    default:
      // Return current state for any other action
      return currentState;
  }
}
