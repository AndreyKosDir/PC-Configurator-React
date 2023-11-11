import {FormEvent, ReactElement, useState} from "react";
import {IItemData} from "../interfaces/Interfaces";
import CloseButton from "./UI/buttons/CloseButton";
import SearchPanel from "./UI/SearchPanel";
import SortPanel from "./UI/SortPanel";
import ItemsList from "./List/ItemsList";
import './Catalog.css';
import {ISortSettings, NameSign, PriceSign, SortDirectionId, TSign} from "../Constants";

interface ICatalogProps {
  catalogData: IItemData[];
  partName: string;
  closeCallback: Function;
}

const defaultSortSetting: ISortSettings = {
  [PriceSign]: SortDirectionId.Default,
  [NameSign]: SortDirectionId.Default
};

export default function Catalog({catalogData, partName, closeCallback}: ICatalogProps): ReactElement {
  // Настройки сортировки
  const [sortSettings, setSortSettings] = useState<ISortSettings>(defaultSortSetting);

  /**
   * Выполнить поисковый запрос
   * @param event
   * @param inputValue
   */
  const handleSearchQuery = (event: FormEvent<HTMLElement>, inputValue: string) => {
    event.stopPropagation();
    event.preventDefault();
    console.log('Поисковый запрос: ' + inputValue);
  };

  const handleSortingChange = (direction: number, sign: TSign): void => {
    // Запилить тут условие с проверкой = 0, > 0 и < 0 и запуском двух функций сортировки из констант соответственно
    console.log(direction);
  }

  return (
    <div className="wrapper-catalog">
      <div className="catalog">
        <h1 className="title">{partName}</h1>
        <CloseButton onClick={closeCallback} className="top-right-corner"/>
        <SearchPanel onSubmitForm={handleSearchQuery}/>
        <SortPanel onChangeSorting={handleSortingChange}/>
        <ItemsList />
      </div>
    </div>
  );
}