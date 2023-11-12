import {ReactElement} from "react";
import './SortPanel.css';
import TextButton from "./buttons/TextButton";
import {NameSign, PriceSign, SortDirectionIterator, TSign, ISortSettings} from "../../Constants";

interface IProps {
  onChangeSorting: (direction: number, sign: TSign) => void;
  sortSettings: ISortSettings;
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
      <div >
        <TextButton
          caption="Название"
          tooltip="Сортировка по названию"
          onlyText={true}
          onClick={(event) => {
            event.stopPropagation();
            PriceDirection.reset();
            onChangeSorting(NameDirection.next(), NameSign);
          }}/>

      </div>
      <div>
        <TextButton
          caption="Цена"
          tooltip="Сортировка по цене"
          onlyText={true}
          onClick={(event) => {
            event.stopPropagation();
            NameDirection.reset();
            onChangeSorting(PriceDirection.next(), PriceSign);
          }}
        />

      </div>


    </div>
  );
}