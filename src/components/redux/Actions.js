import ActionTypes from "./ActionTypes";

// Function to create an action for adding a name
export function actionAddPerson(name) {
  return {
    type: ActionTypes.ACTION_ADD_NAME,
    payload: name
  };
}

// Function to create an action for removing a name by index
export function actionRemovePerson(index) {
  return {
    type: ActionTypes.ACTION_DELETE_NAME,
    index: index
  };
}
