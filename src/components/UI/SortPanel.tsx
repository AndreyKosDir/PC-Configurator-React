import {MouseEventHandler, ReactElement} from "react";
import './SortPanel.css';
import TextButton from "./buttons/TextButton";
import {NameSign, PriceSign, SortDirectionIterator, TSign, ISortSettings, SortDirectionId} from "../../Constants";

interface IProps {
  onChangeSorting: (direction: number, sign: TSign) => void;
  sortSettings: ISortSettings;
}

const NameDirection = SortDirectionIterator();
const PriceDirection = SortDirectionIterator();

/**
 * Панель фильтров с сортировкой по Названию и Цене
 * @param onChangeSorting
 * @param sortSettings
 * @constructor
 */
export default function SortPanel({onChangeSorting, sortSettings}: IProps): ReactElement {
  // TODO: пофиксить что состояние не сбрасывается у экземпляров класса сортировок, если пришли новые настройки

  return (
    <div className="sort-container">
      <SortButton
        caption="Название"
        tooltip="Сортировка по названию"
        onClick={(event) => {
          PriceDirection.reset();
          onChangeSorting(NameDirection.next(), NameSign);
        }}
        direction={sortSettings.name}
      />
      <SortButton
        caption="Цена"
        tooltip="Сортировка по цене"
        onClick={(event) => {
          NameDirection.reset();
          onChangeSorting(PriceDirection.next(), PriceSign);
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