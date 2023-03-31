export interface IGPU {
  id: number;
  name: string;
  manufacturer: string;
  memory_size: number;
  price: number;
  release_date: string;
  rating: number;
  image_url: string;
}

export interface IGPUList {
  gpuList: IGPU[];
}

export interface IItemProps {
  item: IGPU;
}

export interface IStateProps {
  children: JSX.Element;
}
