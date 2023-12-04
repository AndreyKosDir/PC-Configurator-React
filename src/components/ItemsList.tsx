import {PropsWithChildren, ReactElement, useEffect, useMemo, useState} from "react";
import {IItemData} from "../interfaces/Interfaces";
import CatalogItem from "./List/CatalogItem";
import './Catalog.css';
import TextButton from "./UI/buttons/TextButton";

interface IProps {
  catalogItems: IItemData[];
  itemsCount: number;
  selectCallback: (item: IItemData) => void;
}

/**
 * Контейнер, который постранично разбивает переданный в него массив элементов
 * @param catalogItems - Переданный массив элементов
 * @param itemsCount - Количество элементов на одной странице
 * @param selectCallback - Коллбек на выбор конкретного элемента
 * @constructor
 */
export default function ItemsList({catalogItems, itemsCount, selectCallback}: IProps): ReactElement {
  // Текущая страница
  const [page, setPage] = useState<number>(0);

  // Список элементов с постраничной разбивкой
  const paginatedItems = useMemo<IItemData[][]>(() => {
    return splitItems<IItemData>(catalogItems, itemsCount);
  }, [catalogItems]);

  useEffect(() => {
    setPage(0);
  }, [catalogItems]);

  const handleSelectPage = (pageIndex: number): void => {
    if (pageIndex === page) {
      return;
    }
    setPage(pageIndex);
  };

  return (
    <div>
      {catalogItems.length
        ?
        <>
          {paginatedItems[page].map((item) => {
            // TODO: в JSON файлы с деталями засунуть дополнительное поле id и использовать тут как key
            return (
              <CatalogItem
                key={item.name + item.price}
                item={item}
                selectCallback={selectCallback}
              />
            );
          })}
          <PageSelector
            items={paginatedItems}
            page={page}
            selectPageCallback={handleSelectPage}
          />
        </>
        :
        <div className="dummy">
          По вашему запросу ничего не найдено :(
        </div>
      }
    </div>
  );
}

interface IPageSelector {
  items: IItemData[][];
  page: number;
  selectPageCallback: (pageIndex: number) => void;
}

/**
 * Селектор страницы
 * @param items
 * @param page
 * @param selectPageCallback
 * @constructor
 */
function PageSelector({items, page, selectPageCallback}: IPageSelector): ReactElement {
  return (
    <div className="page-selector-panel">
      {items.length > 1 &&
        items.map((item, index) => {
          return (
            <TextButton
              onlyText={true}
              className={`page-selector ${index === page ? 'selected' : ''}`}
              key={index}
              caption={`${index + 1}`}
              onClick={(event) => {
                selectPageCallback(index);
              }}
            />
          );
        })}
    </div>
  );
}

/**
 * Разбить массив на двухуровневый
 * @param items
 * @param count
 */
function splitItems<T>(items: T[], count: number): T[][] {
  const result: T[][] = [];

  if (items.length <= count) {
    return [items];
  }

  let secondIndex = count;

  for (let i = 0; i < items.length; i += count) {
    result.push(items.slice(i, secondIndex));
    secondIndex += secondIndex;
  }

  return result;
}