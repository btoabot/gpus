import { IGPU } from "src/interfaces/IGPU";
import gpus from "src/gpu.json";

export async function fetchGPUList(): Promise<IGPU[]> {
  try {
    const data = await new Promise<IGPU[]>((resolve) => {
      setTimeout(() => {
        resolve(gpus);
      }, 1000);
    });
    return data;
  } catch (error) {
    console.error("Error fetching GPU data:", error);
    return [];
  }
}
