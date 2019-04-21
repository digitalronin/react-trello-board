import faker from 'faker';

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';

const LIST_NAMES = [ 'Todo', 'In Progress', 'Done', 'Blocked' ];

// TODO: this function needs to take an issue and create a card
// from it
function createCard(id) {
  return {
    id: id,
    title: faker.hacker.phrase(),
    description: faker.hacker.phrase()
  };
}

// TODO: Fetch cards by status, for different lists
function createList(attrs) {
  const { id, name } = attrs;
  const cards = [];
  const randomQuantity = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  let count = 0;
  for (let ic = 0; ic < randomQuantity; ic++) {
    cards.push(createCard(count));
    count = count + 1;
  }
  return { id, name, cards };
}

export function getLists() {
  return dispatch => {
    dispatch({ type: GET_LISTS_START });
    setTimeout(() => {
      const lists = [];
      LIST_NAMES.map((name, id) => lists.push(createList({ id, name })) );
      dispatch({ type: GET_LISTS, lists, isFetching: true });
    }, 1000); // fake delay
    dispatch({ type: GET_LISTS_START, isFetching: false });
  };
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAGGING, isDragging });
  };
}
