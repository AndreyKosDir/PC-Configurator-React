/**
 * Направление сортировки
 */
export const SortDirectionId: {
  Default: 0;
  Ascending: 1;
  Descending: -1
} = {
  Default: 0,
  Ascending: 1,
  Descending: -1
}

export type TDirection = keyof typeof SortDirectionId;
export const SortDirections = Object.keys(SortDirectionId) as TDirection[];

type TPriceSign = 'price';
export const PriceSign: TPriceSign = 'price';
type TNameSign = 'name';
export const NameSign: TNameSign = 'name';

export type TSign = TPriceSign | TNameSign;

export interface ISortSettings {
  [NameSign]: typeof SortDirectionId[TDirection];
  [PriceSign]: typeof SortDirectionId[TDirection];
}

export function SortDirectionIterator(): {next: () => number} {
  const valuesArray = Object.values(SortDirectionId) as number[];
  let index = 0;

  return {
    next: () => {
      if (index < valuesArray.length - 1) {
        ++index;
      } else {
        index = 0;
      }

      return valuesArray[index];
    }
  }
}