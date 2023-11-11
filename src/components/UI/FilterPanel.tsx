import {ReactElement} from "react";
import './FilterPanel.css';
import TextButton from "./buttons/TextButton";
import {SortDirection, SortSign, TSign} from "../../Constants";

interface IProps {
  onChangeSorting: (direction: SortDirection, sign: TSign) => void;
  // sortInfo: ISortInfo
}

/**
 * Панель фильтров с сортировкой по Названию и Цене
 * @constructor
 */
export default function FilterPanel({onChangeSorting}: IProps): ReactElement {


  return (
    <div className="filter-container">


      <TextButton
        caption="Название"
        tooltip="Сортировка по названию"
        onlyText={true}
        onClick={(event) => {
          event.stopPropagation();
          onChangeSorting(SortDirection.Default, SortSign.ByName);
        }}/>
      <TextButton
        caption="Цена"
        tooltip="Сортировка по цене"
        onlyText={true}
        onClick={(event) => {
          event.stopPropagation();
          onChangeSorting(SortDirection.Default, SortSign.ByPrice);
        }}
      />
    </div>
  );
}