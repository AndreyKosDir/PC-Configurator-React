/**
 * Направление сортировки
 */
export enum SortDirection {
  Default = 0,
  Ascending = 1,
  Descending = -1
}

type TPriceSign = 'price';
type TNameSign = 'name'
export type TSign = TPriceSign | TNameSign;

/**
 * Признак сортировки: "по названию"/"по цене"
 */
export const SortSign = {
  ByName: 'name' as TPriceSign,
  ByPrice: 'price' as TNameSign
}