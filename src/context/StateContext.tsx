import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { IState, SortDirection, IUseSort, State } from "src/interfaces/IState";
import { IStateProps } from "src/interfaces/IGPU";
import { fetchGPUList } from "src/api/getGPU";
import { IFilter } from "src/interfaces/IState";
import { useDebounce } from "src/hooks/useDebounce";
import { sortData } from "src/utils/sort";
import { filterArray } from "src/utils/filter";
import { reducer } from "src/context/reducer";

export const DEFAULT_SORT: IState = {
  field: "price",
  direction: "asc",
};

export const StateContext = createContext<IUseSort>({
  sort: DEFAULT_SORT,
  handleSortChange: () => {},
  handleFilterChange: () => {},
  sortedData: null,
  loading: false,
  filter: null,
});

const initialState: State = {
  sortedData: [],
  loading: false,
  sort: DEFAULT_SORT,
  filter: null,
};

const StateProvider: React.FC = ({ children }: IStateProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState, undefined);
  const { sort, sortedData, loading, filter } = state;
  const debouncedFilter = useDebounce<IFilter>(filter, 500);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: true });
    async function getGPUList() {
      const data = await fetchGPUList();

      const sortedData = sortData(data, sort);
      const filteredData = filterArray(sortedData, debouncedFilter);
      dispatch({ type: "SET_SORTED_DATA", sortedData: filteredData });

      dispatch({ type: "SET_LOADING", loading: false });
    }
    getGPUList().catch((err) => {
      console.log(err);
      dispatch({ type: "SET_LOADING", loading: false });
    });
  }, [sort, debouncedFilter]);

  const handleFilterChange = useCallback((props: IFilter) => {
    dispatch({ type: "SET_FILTER", filter: props });
  }, []);

  const handleSortChange = useCallback(
    (field: string, direction: SortDirection) => {
      dispatch({ type: "SET_SORT", sort: { field, direction } });
    },
    [],
  );

  return (
    <StateContext.Provider
      value={{
        filter: debouncedFilter,
        sort,
        handleSortChange,
        sortedData,
        loading,
        handleFilterChange,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
