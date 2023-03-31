import { IGPU } from "src/interfaces/IGPU";
export type SortDirection = "asc" | "desc";
export type SortTuple = [keyof IGPU, SortDirection];
import type { CheckboxValueType } from "antd/es/checkbox/Group";

export interface IState {
  field: string;
  direction: SortDirection;
}

export interface IFilter {
  [key: string]: string | undefined | null | string[] | CheckboxValueType[];
}

export interface IUseSort {
  filter: IFilter;
  sort: IState;
  handleSortChange: (field: string, direction: SortDirection) => void;
  sortedData: IGPU[];
  loading: boolean;
  handleFilterChange: (props: IFilter) => void;
}

export type State = {
  sortedData: IGPU[];
  loading: boolean;
  sort: IState;
  filter: IFilter;
};

export const actions = {
  SET_SORT: "SET_SORT",
  SET_FILTER: "SET_FILTER",
  SET_SORTED_DATA: "SET_SORTED_DATA",
  SET_LOADING: "SET_LOADING",
} as const;

export type Action =
  | { type: typeof actions.SET_SORT; sort: IState }
  | { type: typeof actions.SET_FILTER; filter: IFilter }
  | { type: typeof actions.SET_SORTED_DATA; sortedData: IGPU[] }
  | { type: typeof actions.SET_LOADING; loading: boolean };
