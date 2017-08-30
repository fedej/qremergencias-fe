const OPEN_DRAWER = 'Drawer/OPEN';
const CLOSE_DRAWER = 'Drawer/CLOSE';
const TOGGLE_DRAWER = 'Drawer/TOGGLE';
const SET_DRAWER = 'Drawer/SET';


export const openDrawer = () => ({
  type: OPEN_DRAWER,
});

export const closeDrawer = () => ({
  type: CLOSE_DRAWER,
});

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
});

export const setDrawer = isOpen => ({
  type: SET_DRAWER,
  isOpen,
});


const INITIAL_STATE = {
  isOpen: false,
};

export default function Reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_DRAWER:
      return {
        isOpen: action.isOpen,
      };
    case TOGGLE_DRAWER:
      return {
        isOpen: !state.isOpen,
      };
    case OPEN_DRAWER:
      return {
        isOpen: true,
      };
    case CLOSE_DRAWER:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
}
