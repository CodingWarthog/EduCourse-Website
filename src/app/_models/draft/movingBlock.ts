import { BlockItem } from './blockItem';

export interface MovingBlock {
  id: number;
  name: string;
  blockItem: BlockItem[];
}
