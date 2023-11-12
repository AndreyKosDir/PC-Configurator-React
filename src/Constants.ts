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

export function SortDirectionIterator(): {next: () => number, reset: () => void} {
  const valuesArray = Object.values(SortDirectionId) as number[];
  let index = 0;

  return {
    reset: (): void => {
      index = 0;
    },
    next: (): number => {
      if (index < valuesArray.length - 1) {
        ++index;
      } else {
        index = 0;
      }

      return valuesArray[index];
    }
  }
}


/**
 * Отсортировать массив объектов по возрастанию / убыванию
 * (если передается направление 0 - массив не сортируется и возвращается в исходном виде)
 * @param array - Массив объектов
 * @param key - Ключ объекта по которому происходит сравнение в сортировке
 * @param direction - Направление сортировки. Если > 0 - сортировка по возрастанию, если < 0 - по убыванию
 */
export function sortObjectsArray<T, K extends keyof T>(array: T[], key: K, direction: number): T[] {
  if (!direction) {
    return array;
  }

  return [...array].sort((current, next) => {
    if (current[key] > next[key]) {
      return direction;
    }

    if (current[key] < next[key]) {
      return -direction;
    }

    return 0;
  });
}