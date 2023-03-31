import { compose } from "./compose";
import { sortData } from "./sort";
import { handleParser, handleFormat } from "./format";
import { IGPU } from "src/interfaces/IGPU";
import { IState } from "src/interfaces/IState";
import { IFilter } from "../interfaces/IState";
import { filterArray } from "./filter";

describe("compose", () => {
  it("should return the input if no functions are passed", () => {
    const input = "hello";
    const result = compose()(input);
    expect(result).toEqual(input);
  });

  it("should apply functions in reverse order", () => {
    const addExclamation = (str: string) => str + "!";
    const makeUpperCase = (str: string) => str.toUpperCase();
    const addGreeting = (str: string) => "Hello, " + str;

    const composedFn = compose(addExclamation, makeUpperCase, addGreeting);

    const input = "world";
    const result = composedFn(input);
    expect(result).toEqual("HELLO, WORLD!");
  });
});

describe("sortData", () => {
  const data: IGPU[] = [
    {
      name: "GPU 1",
      price: 500,
      id: 20,
      manufacturer: "AMD",
      memory_size: 4,

      release_date: "2017-05-16",
      rating: 0.98,
      image_url:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6468/6468931_sd.jpg;maxHeight=200;maxWidth=300",
    },
    {
      name: "GPU 2",
      price: 700,
      id: 20,
      manufacturer: "AMD",
      memory_size: 4,

      release_date: "2017-05-16",
      rating: 0.98,
      image_url:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6468/6468931_sd.jpg;maxHeight=200;maxWidth=300",
    },
    {
      name: "GPU 3",
      price: 400,
      id: 20,
      manufacturer: "AMD",
      memory_size: 4,

      release_date: "2017-05-16",
      rating: 0.98,
      image_url:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6468/6468931_sd.jpg;maxHeight=200;maxWidth=300",
    },
    {
      name: "GPU 4",
      price: 600,
      id: 20,
      manufacturer: "AMD",
      memory_size: 4,

      release_date: "2017-05-16",
      rating: 0.98,
      image_url:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6468/6468931_sd.jpg;maxHeight=200;maxWidth=300",
    },
  ];

  test("sorts by number field in ascending order", () => {
    const sort: IState = { field: "price", direction: "asc" };
    const sortedData = sortData(data, sort);

    expect(sortedData[0].name).toBe("GPU 3");
    expect(sortedData[1].name).toBe("GPU 1");
    expect(sortedData[2].name).toBe("GPU 4");
    expect(sortedData[3].name).toBe("GPU 2");
  });

  test("sorts by number field in descending order", () => {
    const sort: IState = { field: "price", direction: "desc" };
    const sortedData = sortData(data, sort);

    expect(sortedData[0].name).toBe("GPU 2");
    expect(sortedData[1].name).toBe("GPU 4");
    expect(sortedData[2].name).toBe("GPU 1");
    expect(sortedData[3].name).toBe("GPU 3");
  });

  test("sorts by string field in ascending order", () => {
    const sort: IState = { field: "name", direction: "asc" };
    const sortedData = sortData(data, sort);

    expect(sortedData[0].name).toBe("GPU 1");
    expect(sortedData[1].name).toBe("GPU 2");
    expect(sortedData[2].name).toBe("GPU 3");
    expect(sortedData[3].name).toBe("GPU 4");
  });

  test("sorts by string field in descending order", () => {
    const sort: IState = { field: "name", direction: "desc" };
    const sortedData = sortData(data, sort);

    expect(sortedData[0].name).toBe("GPU 4");
    expect(sortedData[1].name).toBe("GPU 3");
    expect(sortedData[2].name).toBe("GPU 2");
    expect(sortedData[3].name).toBe("GPU 1");
  });

  test("returns original data if invalid sort field is provided", () => {
    const sort: IState = { field: "invalidField", direction: "asc" };
    const sortedData = sortData(data, sort);

    expect(sortedData).toEqual(data);
  });
});

describe("handleFormat", () => {
  it("returns empty string for undefined value", () => {
    expect(handleFormat(undefined)).toEqual("");
  });

  it("returns empty string for empty string value", () => {
    expect(handleFormat("")).toEqual("");
  });

  it("returns value as string for valid number input", () => {
    expect(handleFormat(123)).toEqual("123");
    expect(handleFormat("-123.456")).toEqual("-123.456");
  });

  it("returns input value for invalid number input", () => {
    expect(handleFormat("abc")).toEqual("");
    expect(handleFormat("12.3.4")).toEqual("");
  });

  it("returns input value if it's a dash", () => {
    expect(handleFormat("-")).toEqual("-");
  });
});

describe("handleParser", () => {
  it("returns NaN for undefined value", () => {
    expect(handleParser(undefined)).toBeNaN();
  });

  it("returns input value as number for valid number input", () => {
    expect(handleParser(123)).toEqual(123);
    expect(handleParser("-123.456")).toEqual(-123.456);
  });

  it("returns NaN for invalid number input", () => {
    expect(handleParser("abc")).toBeNaN();
    expect(handleParser("12.3.4")).toBeNaN();
  });

  it("returns input value if it's a dash", () => {
    expect(handleParser("-")).toEqual("-");
  });
});

describe("filterArray", () => {
  const testData = [
    { id: 1, manufacturer: "Nvidia", price: 200, memory_size: 8 },
    { id: 2, manufacturer: "AMD", price: 150, memory_size: 6 },
    { id: 3, manufacturer: "Nvidia", price: 300, memory_size: 12 },
  ];

  it("should return the original array when filter is empty", () => {
    const result = filterArray(testData, {});
    expect(result).toEqual(testData);
  });

  it("should return filtered array by price range", () => {
    const filter: IFilter = { price: [0, 250] };
    const result = filterArray(testData, filter);
    expect(result).toEqual([
      { id: 1, manufacturer: "Nvidia", price: 200, memory_size: 8 },
      { id: 2, manufacturer: "AMD", price: 150, memory_size: 6 },
    ]);
  });

  it("should return filtered array by memory size", () => {
    const filter: IFilter = { memory_size: [6, 8] };
    const result = filterArray(testData, filter);
    expect(result).toEqual([
      { id: 1, manufacturer: "Nvidia", price: 200, memory_size: 8 },
      { id: 2, manufacturer: "AMD", price: 150, memory_size: 6 },
    ]);
  });

  it("should return an empty array when filter doesn't match any item", () => {
    const filter: IFilter = { manufacturer: "Intel" };
    const result = filterArray(testData, filter);
    expect(result).toEqual([]);
  });
});
