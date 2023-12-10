import React, {createContext, useState} from 'react';
import './App.css';
import PartsPanel from './components/PartsPanel';
import DataLoader from './data/DataLoader';
import {TPartId, PartNames} from './Constants';
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
  // TODO: тут вообще хер пойми что переделать нахер
  //  слишком много state и надо добавлять будет ещё (для id выбранной детали например)
  //  можно заюзать контекст, чтобы прокинуть колбек на выбор детали из каталога
  const detailsViewData = dataLoader.getPartsViewData();
  const [totalSum, setTotalSum] = useState(0);
  // Данные по выбранным деталям из каталога
  const [itemsData, setItemsData] = useState<TItemsData>(  {});
  // Данные по конкретной детали для каталога
  const [catalogData, setCatalogData] = useState<IItemData[] | null>(null);
  const [currentPartId, setCurrentPartId] = useState<TPartId>('');

  /**
   * Обработчик открытия каталога с данными по конкретной детали
   * @param id
   */
  const handleOpenCatalog = async (id: TPartId): Promise<void> => {
    setCatalogData(await dataLoader.loadPCPartData(id));
    setCurrentPartId(id);
  };

  const handleResetDetail = (id: TPartId): void => {
    const newItemsData = {
      ...itemsData
    };
    delete newItemsData[currentPartId];
    setItemsData(newItemsData);
  };

  /**
   * Обработчик закрытия каталога
   */
  const handleCloseCatalog = (): void => {
    setCatalogData(null);
    setCurrentPartId('');
  };

  const selectCallback = (itemData: IItemData): void => {
    setItemsData({
      ...itemsData,
      [currentPartId]: itemData
    });
    setCatalogData(null);
  };

  // TODO: параметр name - вообще убрать из данных по PCPart - брать его из констант в зависсимости от поля id
  return (
    <div id="wrapper">
      <h1>Конфигуратор ПК</h1>
      <PartsPanel
        resetDetailData={handleResetDetail}
        openCatalog={handleOpenCatalog}
        parts={detailsViewData}
        itemsData={itemsData}
      />
      <h1>
        Итого: {totalSum}
      </h1>

      {catalogData &&
        <Catalog
            partName={PartNames[currentPartId]}
            catalogData={catalogData}
            closeCallback={handleCloseCatalog}
            selectCallback={selectCallback}
        />
      }
    </div>
  );
}

export default App;
