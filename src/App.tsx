import React, {createContext, useCallback, useState} from 'react';
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
  [id in Partial<TPartId>]: IItemData;
};

export const DetailsContext = createContext({});

function  App({dataLoader}: {dataLoader: DataLoader}) {
  // TODO: тут вообще хер пойми что переделать нахер
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

  /**
   * Обработчик отмены выбора детали
   * @param id
   */
  const handleResetDetail = useCallback((id: TPartId): void => {
    const deductiblePrice = itemsData[id].price;
    setTotalSum(Math.round(totalSum - deductiblePrice));
    const newItemsData = {
      ...itemsData
    };
    delete newItemsData[id];
    setItemsData(newItemsData);
  }, [totalSum]);

  /**
   * Обработчик закрытия каталога
   */
  const handleCloseCatalog = (): void => {
    setCatalogData(null);
    setCurrentPartId('');
  };

  /**
   * Обработчик выбора детали из каталога
   * @param itemData
   */
  const selectCallback = (itemData: IItemData): void => {
    setTotalSum(Math.round(totalSum + itemData.price));
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
      <div className="main-content">
        <div className="result-info">
          <h1>
            Итого: {totalSum + ' ₽'}
          </h1>
        </div>
        <PartsPanel
          resetDetailData={handleResetDetail}
          openCatalog={handleOpenCatalog}
          parts={detailsViewData}
          itemsData={itemsData}
        />
      </div>

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
