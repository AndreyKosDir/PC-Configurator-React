import {ReactElement} from "react";
import './FilterPanel.css';
import TextButton from "./buttons/TextButton";
import {NameSign, PriceSign, SortDirectionIterator, TSign} from "../../Constants";

interface IProps {
  onChangeSorting: (direction: number, sign: TSign) => void;
  // sortInfo: ISortInfo
}

const NameDirection = SortDirectionIterator();
const PriceDirection = SortDirectionIterator();

/**
 * Панель фильтров с сортировкой по Названию и Цене
 * @constructor
 */
export default function SortPanel({onChangeSorting}: IProps): ReactElement {
  return (
    <div className="sort-container">
      <TextButton
        caption="Название"
        tooltip="Сортировка по названию"
        onlyText={true}
        onClick={(event) => {
          event.stopPropagation();
          onChangeSorting(NameDirection.next(), NameSign);
        }}/>
      <TextButton
        caption="Цена"
        tooltip="Сортировка по цене"
        onlyText={true}
        onClick={(event) => {
          event.stopPropagation();
          onChangeSorting(PriceDirection.next(), PriceSign);
        }}
      />
    </div>
  );
}