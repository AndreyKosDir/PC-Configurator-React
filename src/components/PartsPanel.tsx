import {ReactElement, PropsWithoutRef} from 'react';
import {IPartViewData} from '../data/DataLoader';
import PCPart from "./PCPart";
import {IItemData} from "../interfaces/Interfaces";
import {TItemsData} from "../App";

interface IProps {
  parts: IPartViewData[];
  openCatalog: Function;
  resetDetailData: Function;
  itemsData: TItemsData;
}

export default function PartsPanel({parts, openCatalog, itemsData, resetDetailData}: IProps): ReactElement {
  return (
    <div className="parts-panel">
      {
        parts.map((partData) => {
          return (
            // TODO: мб прокидывать пропсы просто как {...props}
            <PCPart
              key={partData.id}
              partId={partData.id}
              partName={partData.name}
              openCatalog={openCatalog}
              data={itemsData[partData.id]}
              resetDetailData={resetDetailData}
            />
          );
        })
      }
    </div>
  );
}