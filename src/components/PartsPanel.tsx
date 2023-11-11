import {ReactElement, PropsWithoutRef} from 'react';
import {IPartViewData, TPartId} from '../data/DataLoader';
import PCPart from "./PCPart";
import {IItemData} from "../interfaces/Interfaces";
import {TItemsData} from "../App";

interface IProps {
  parts: IPartViewData[];
  openCatalog: Function;
  itemsData: TItemsData;
}

export default function PartsPanel({parts, openCatalog, itemsData}: IProps): ReactElement {
  return (
    <div className="details-panel">
      {
        parts.map((partData) => {
          return (
            <PCPart
              key={partData.id}
              partId={partData.id}
              partName={partData.name}
              openCatalog={openCatalog}
              data={itemsData[partData.id]}
            />
          );
        })
      }
    </div>
  );
}