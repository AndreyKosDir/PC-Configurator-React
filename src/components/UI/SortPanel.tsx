import {MouseEventHandler, ReactElement} from "react";
import './SortPanel.css';
import TextButton from "./buttons/TextButton";
import {NameSign, PriceSign, TSign, ISortSettings, SortDirectionId} from "../../Constants";
import {ISortController} from '../../helpers/SortController';

interface IProps {
  onChangeSorting: (direction: number, sign: TSign) => void;
  sortSettings: ISortSettings;
  sortController: ISortController;
}

/**
 * Панель фильтров с сортировкой по Названию и Цене
 * @param onChangeSorting
 * @param sortSettings
 * @param sortController
 * @constructor
 */
export default function SortPanel({onChangeSorting, sortSettings, sortController}: IProps): ReactElement {
  return (
    <div className="sort-container">
      <SortButton
        caption="Название"
        tooltip="Сортировка по названию"
        onClick={(event) => {
          sortController.resetPriceIterator();
          onChangeSorting(sortController.changeNameDirection(), NameSign);
        }}
        direction={sortSettings.name}
      />
      <SortButton
        caption="Цена"
        tooltip="Сортировка по цене"
        onClick={(event) => {
          sortController.resetNameIterator();
          onChangeSorting(sortController.changePriceDirection(), PriceSign);
        }}
        direction={sortSettings.price}
      />
    </div>
  );
}

interface ISortButtonProps {
  caption: string;
  tooltip?: string;
  onClick: MouseEventHandler;
  direction: number;
}

/**
 * Кнопка сортировки
 * @param caption
 * @param tooltip
 * @param onClick
 * @param direction
 * @constructor
 */
function SortButton({caption, tooltip, onClick, direction}: ISortButtonProps): ReactElement {
  let directionClass = '';

  switch (direction) {
    case SortDirectionId.Ascending: {
      directionClass += 'ascending';
      break;
    }
    case SortDirectionId.Descending: {
      directionClass = 'descending';
      break;
    }
  }

  return (
    <div>
      <TextButton
        className={`sort-button ${directionClass}`}
        caption={caption + ' '}
        tooltip={tooltip || ''}
        onlyText={true}
        onClick={onClick}
      />
    </div>
  );
}