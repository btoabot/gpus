import { IFilter } from "../interfaces/IState";

export function filterArray<T>(arr: T[], filter: IFilter): T[] {
  return arr.filter((item) => {
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        const filterValue = filter[key];
        const itemValue = item[key as string];

        if (filterValue === undefined || filterValue === null) {
          continue;
        }

        if (Array.isArray(filterValue)) {
          if (key === "price") {
            const [minPrice, maxPrice] = filterValue;
            if (
              (minPrice === 0 || minPrice <= itemValue) &&
              (maxPrice === 0 || itemValue <= maxPrice)
            ) {
              continue;
            } else {
              return false;
            }
          } else if (key === "memory_size") {
            const memorySizes = filterValue as number[];
            if (!memorySizes.includes(itemValue as number)) {
              return false;
            }
          } else {
            if (!filterValue.includes(itemValue)) {
              return false;
            }
          }
        } else if (typeof itemValue === "string") {
          const itemValueLower: string = itemValue.toLowerCase();
          if (!itemValueLower.includes(filterValue)) {
            return false;
          }
        } else {
          if (itemValue !== filterValue) {
            return false;
          }
        }
      }
    }
    return true;
  });
}
