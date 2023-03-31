import { IGPU } from "src/interfaces/IGPU";
import { IState } from "src/interfaces/IState";

export function sortData(data: IGPU[], sort: IState): IGPU[] {
  const field = sort.field;
  const direction = sort.direction === "asc" ? 1 : -1;

  return data.sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * direction;
    } else if (typeof aVal === "string" && typeof bVal === "string") {
      return aVal.localeCompare(bVal) * direction;
    } else {
      return 0;
    }
  });
}
