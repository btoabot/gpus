import { reducer } from "./reducer";
import { actions } from "src/interfaces/IState";

describe("reducer", () => {
  it("should return the initial state", () => {
    const initialState = {
      sort: null,
      filter: {},
      sortedData: [],
      loading: false,
    };
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it("should handle SET_SORT action", () => {
    const sort = { field: "price", direction: "asc" };
    const action = { type: actions.SET_SORT, sort };
    const state = { sort: null, filter: {}, sortedData: [], loading: false };
    const expectedState = { sort, filter: {}, sortedData: [], loading: false };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it("should handle SET_FILTER action", () => {
    const filter = { name: "gtx" };
    const action = { type: actions.SET_FILTER, filter };
    const state = { sort: null, filter: {}, sortedData: [], loading: false };
    const expectedState = {
      sort: null,
      filter: { name: "gtx" },
      sortedData: [],
      loading: false,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it("should handle SET_SORTED_DATA action", () => {
    const sortedData = [{ name: "gtx 1060", price: 200 }];
    const action = { type: actions.SET_SORTED_DATA, sortedData };
    const state = { sort: null, filter: {}, sortedData: [], loading: false };
    const expectedState = {
      sort: null,
      filter: {},
      sortedData: [{ name: "gtx 1060", price: 200 }],
      loading: false,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it("should handle SET_LOADING action", () => {
    const loading = true;
    const action = { type: actions.SET_LOADING, loading };
    const state = { sort: null, filter: {}, sortedData: [], loading: false };
    const expectedState = {
      sort: null,
      filter: {},
      sortedData: [],
      loading: true,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });
});
