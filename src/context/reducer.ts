import { Action, State, actions } from "src/interfaces/IState";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actions.SET_SORT:
      return { ...state, sort: action.sort };
    case actions.SET_FILTER:
      return { ...state, filter: { ...state.filter, ...action.filter } };
    case actions.SET_SORTED_DATA:
      return { ...state, sortedData: action.sortedData };
    case actions.SET_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}
