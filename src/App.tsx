import React, {createContext, useState} from 'react';
import './App.css';
import PartsPanel from './components/PartsPanel';
import DataLoader, {TPartId} from './data/DataLoader';
import {IItemData} from "./interfaces/Interfaces";
import Catalog from "./components/Catalog";

// interface IDetailsContext {
//   [id: string ]: IItemData;
// }

/**
 * Данные по выбранным деталям из каталога
 */
export type TItemsData = {
  [id in TPartId]?: IItemData;
};

export const DetailsContext = createContext({});

function  App({dataLoader}: {dataLoader: DataLoader}) {
  const detailsViewData = dataLoader.getPartsViewData();
  const [totalSum, setTotalSum] = useState(0);
  // Данные по выбранным деталям из каталога
  const [itemsData, setItemsData] = useState<TItemsData>(  {});
  // Данные по конкретной детали для каталога
  const [catalogData, setCatalogData] = useState<IItemData[] | null>(null);
  const [currentPartName, setCurrentPartName] = useState('');

  /**
   * Обработчик открытия каталога с данными по конкретной детали
   * @param id
   * @param name
   */
  const handleOpenCatalog = async (id: TPartId, name: string): Promise<void> => {
    setCatalogData(await dataLoader.loadPCPartData(id));
    setCurrentPartName(name);
  }

  /**
   * Обработчик закрытия каталога
   */
  const handleCloseCatalog = (): void => {
    setCatalogData(null);
    setCurrentPartName('');
  }

  const selectCallback = (item: IItemData): void => {
    console.log(item);
    setCatalogData(null);
  }

  return (
    <div id="wrapper">
      <h1>Конфигуратор ПК</h1>
      <PartsPanel
        openCatalog={handleOpenCatalog}
        parts={detailsViewData}
        itemsData={itemsData}
      />
      <h1>
        Итого: {totalSum}
      </h1>

      {catalogData &&
        <Catalog
            partName={currentPartName}
            catalogData={catalogData}
            closeCallback={handleCloseCatalog}
            selectCallback={selectCallback}
        />
      }
    </div>
  );
}

export default App;
