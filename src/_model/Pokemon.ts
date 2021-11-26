import { Type } from './Types';

export interface Pokemon {
    image: string;
    number: number;
    name: string;
    types: Type[];
  }