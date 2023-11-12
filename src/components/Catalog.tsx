import {FormEvent, ReactElement, useState} from "react";
import {IItemData} from "../interfaces/Interfaces";
import CloseButton from "./UI/buttons/CloseButton";
import SearchPanel from "./UI/SearchPanel";
import SortPanel from "./UI/SortPanel";
import CatalogItem from "./List/CatalogItem";
import './Catalog.css';
import {ISortSettings, NameSign, PriceSign, SortDirectionId, sortObjectsArray, TSign} from "../Constants";
import ItemsList from "./ItemsList";

interface ICatalogProps {
  catalogData: IItemData[];
  partName: string;
  closeCallback: Function;
  selectCallback: (item: IItemData) => void;
}

const defaultSortSetting: ISortSettings = {
  [PriceSign]: SortDirectionId.Default,
  [NameSign]: SortDirectionId.Default
};

export default function Catalog({catalogData, partName, closeCallback, selectCallback}: ICatalogProps): ReactElement {
  // Настройки сортировки
  const [sortSettings, setSortSettings] = useState<ISortSettings>(defaultSortSetting);
  const [catalogItems, setCatalogItems] = useState<IItemData[]>(catalogData);

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
    setSortSettings({
      ...defaultSortSetting,
      [sign]: direction
    });
    setCatalogItems(sortObjectsArray<IItemData, TSign>(catalogData, sign, direction));
  }

  return (
    <div className="wrapper-catalog">
      <div className="catalog">
        <h1 className="title">{partName}</h1>
        <CloseButton onClick={closeCallback} className="top-right-corner"/>
        <SearchPanel onSubmitForm={handleSearchQuery}/>
        <SortPanel
          onChangeSorting={handleSortingChange}
          sortSettings={sortSettings}
        />
        <ItemsList
          catalogItems={catalogItems}
          selectCallback={selectCallback}
          itemsCount={6}
        />
      </div>
    </div>
  );
}