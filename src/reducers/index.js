import {
  ADD_INVESTMENT,
  UPDATE_INVESTMENT,
  DELETE_INVESTMENT,
  TOGGLE_NAVBAR,
  CHANGE_THEME
} from "../actions/types";
import uuid from "uuid";

const initialState = {
  investments: [
    { id: uuid.v4(), name: "Certificate of Deposit", initial: 10000, monthly: 0, apy: 2.5, months: 24 },
    { id: uuid.v4(), name: "Savings", initial: 1000, monthly: 100, apy: 0.2, months: 12 }
  ],
  navbarOpen: true,
  theme: "primary"
};

function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case ADD_INVESTMENT:
      return {
          ...state,
          investments: [...state.investments, payload]
      };
    case UPDATE_INVESTMENT:
      return {
        ...state,
        investments: state.investments.map(investment => investment.id === action.id ? { ...investment, [action.field]: payload } : investment)
      };
    case DELETE_INVESTMENT:
      return {
        ...state,
        investments: state.investments.filter(investment => investment.id !== action.id)
      };
    case TOGGLE_NAVBAR:
      return {
        ...state,
        navbarOpen: !state.navbarOpen
      }
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      }
    default:
      return state;
  }
}

export default rootReducer;
