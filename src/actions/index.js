import {
  ADD_INVESTMENT,
  UPDATE_INVESTMENT,
  DELETE_INVESTMENT,
  TOGGLE_NAVBAR,
  CHANGE_THEME
} from "./types";

export function addInvestment(payload) {
  return {
    type: ADD_INVESTMENT,
    payload
  };
}

export function updateInvestment(id, field, payload) {
  return {
    type: UPDATE_INVESTMENT,
    id,
    field,
    payload
  };
}

export function deleteInvestment(id) {
  return {
    type: DELETE_INVESTMENT,
    id
  }
}

export function toggleNavbar() {
  return {
    type: TOGGLE_NAVBAR
  }
}

export function changeTheme(theme) {
  return {
    type: CHANGE_THEME,
    theme
  }
}
