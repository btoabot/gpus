import { fetchGPUList } from "src/api/getGPU";
import gpus from "src/gpu.json";

describe("fetchGPUList", () => {
  test("returns a Promise that resolves with a list of GPUs after a delay", async () => {
    const result = await fetchGPUList();
    expect(result).toHaveLength(21); // assuming there are 5 GPUs in the gpus array
    expect(result[0].name).toBe("NVIDIA GeForce RTX 3080");
    expect(result[0].manufacturer).toBe("NVIDIA");
    expect(result[0].memory_size).toBe(10);
    expect(result[0].price).toBe(699.99);
    expect(result[0].release_date).toBe("2020-09-17");
    expect(result[0].rating).toBe(0.95);
    expect(result[0].image_url).toBe(
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6471/6471960_sd.jpg;maxHeight=200;maxWidth=300",
    );
  });
  // next test cases only for real server
  // it("returns an empty array if an error occurs", async () => {
  //   jest.spyOn(window, "fetch").mockRejectedValue(new Error("Test error"));
  //
  //   const result = await fetchGPUList();
  //
  //   expect(result).toEqual([]);
  //
  //   jest.restoreAllMocks();
  // });
  // it("returns an array of GPUs when called with valid input", async () => {
  //   const mockResponse = {
  //     status: 200,
  //     json: jest.fn().mockResolvedValue(gpus),
  //   };
  //   jest.spyOn(window, "fetch").mockResolvedValue(mockResponse);
  //
  //   const result = await fetchGPUList();
  //
  //   expect(result).toEqual(gpus);
  //
  //   expect(fetch).toHaveBeenCalledWith("/api/gpus");
  //
  //   jest.restoreAllMocks();
  // });
  // it("returns an empty array when the server returns an error", async () => {
  //   const mockResponse = {
  //     status: 500,
  //     json: jest.fn(),
  //   };
  //   jest.spyOn(window, "fetch").mockResolvedValue(mockResponse);
  //
  //   const result = await fetchGPUList();
  //
  //   expect(result).toEqual([]);
  //
  //   expect(fetch).toHaveBeenCalledWith("/api/gpus");
  //
  //   jest.restoreAllMocks();
  // });
});
