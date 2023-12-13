import {FormEvent, ReactElement, useState, useMemo} from "react";
import {IItemData} from "../interfaces/Interfaces";
import CloseButton from "./UI/buttons/CloseButton";
import SearchPanel from "./UI/SearchPanel";
import SortPanel from "./UI/SortPanel";
import './Catalog.css';
import {ISortSettings, NameSign, PriceSign, SortDirectionId, sortObjectsArray, TSign} from "../Constants";
import ItemsList from "./ItemsList";
import SortController, {ISortController} from "../helpers/SortController";

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

// Количество отображаемых элементов на одной странице каталога
const ItemsCountPerPage = 6;

export default function Catalog({catalogData, partName, closeCallback, selectCallback}: ICatalogProps): ReactElement {
  // Настройки сортировки
  const [sortSettings, setSortSettings] = useState<ISortSettings>(defaultSortSetting);
  const [filteredItems, setFilteredItems] = useState<IItemData[]>(catalogData);
  const [catalogItems, setCatalogItems] = useState<IItemData[]>(catalogData);

  const sortController = useMemo<ISortController>(() => new SortController(), []);

  // TODO: перенести сортировку и фильтрацию в отдельный файл имитирующий работу бэка
  /**
   * Выполнить поисковый запрос
   * @param inputValue
   */
  const handleSearchQuery = (inputValue: string) => {
    const searchItems = [...catalogData].filter((item) => {
      return item.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    sortController.resetAll();
    setSortSettings({...defaultSortSetting});
    setFilteredItems(searchItems);
    setCatalogItems(searchItems);
  };

  /**
   * Отсортировать каталог
   * @param direction - Направление сортировки (по убыванию/возрастанию/по умолчанию)
   * @param sign - Признак сортировки: по цене/по наименованию
   */
  const handleSortingChange = (direction: number, sign: TSign): void => {
    setSortSettings({
      ...defaultSortSetting,
      [sign]: direction
    });

    // Если направление сортировки по умолчанию то элементы устанавливаются в порядке указанном в JSON
    if (direction === 0) {
      setCatalogItems(filteredItems);
    } else {
      setCatalogItems(sortObjectsArray<IItemData, TSign>(filteredItems, sign, direction));
    }
  }

  return (
    <div className="wrapper-catalog">
      <div className="catalog">
        <h1 className="title">{partName}</h1>
        <CloseButton onClick={closeCallback} className="top-right-corner"/>
        <SearchPanel makeSearchQuery={handleSearchQuery}/>
        {!!catalogItems.length &&
            <SortPanel
                sortController={sortController}
                onChangeSorting={handleSortingChange}
                sortSettings={sortSettings}
            />
        }
        <ItemsList
          catalogItems={catalogItems}
          selectCallback={selectCallback}
          itemsCount={ItemsCountPerPage}
        />
      </div>
    </div>
  );
}