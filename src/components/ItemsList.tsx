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
 * @param children - Переданный массив элементов
 * @param catalogItems -
 * @param itemsCount
 * @constructor
 */
export default function ItemsList({catalogItems, itemsCount, selectCallback}: IProps): ReactElement {
  const [page, setPage] = useState<number>(0);

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
      {paginatedItems[page].map((item) => {
        // TODO: в JSON файлы с деталями засунуть дополнительное поле id
        return (
          <CatalogItem
            key={item.name + item.price}
            item={item}
            selectCallback={selectCallback}
          />
        );
      })}
      <div className="page-selector-panel">
        {paginatedItems.map((item, index) => {
          return (
            <TextButton
              onlyText={true}
              className={`page-selector ${index === page ? 'selected' : ''}`}
              key={index}
              caption={`${index + 1}`}
              onClick={(event) => {
                event.stopPropagation();
                handleSelectPage(index);
              }}
            />
          );
        })}
      </div>
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