import {FormEvent, FormEventHandler, ReactElement, useState} from "react";
import {IItemData} from "../interfaces/Interfaces";
import CloseButton from "./UI/buttons/CloseButton";
import SearchPanel from "./UI/SearchPanel";
import FilterPanel from "./UI/FilterPanel";
import ItemsList from "./List/ItemsList";
import './Catalog.css';
import {SortDirection, SortSign, TSign} from "../Constants";

interface ICatalogProps {
  catalogData: IItemData[];
  partName: string;
  closeCallback: Function;
}

export default function Catalog({catalogData, partName, closeCallback}: ICatalogProps): ReactElement {

  const [sortInfo, setSortInfo] = useState({});

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

  const handleSortingChange = (direction: SortDirection, sign: TSign): void => {
    // pass
  }

  return (
    <div className="wrapper-catalog">
      <div className="catalog">
        <h1 className="title">{partName}</h1>
        <CloseButton onClick={closeCallback} className="top-right-corner"/>
        <SearchPanel onSubmitForm={handleSearchQuery}/>
        <FilterPanel onChangeSorting={handleSortingChange}/>
        <ItemsList />
      </div>
    </div>
  );
}