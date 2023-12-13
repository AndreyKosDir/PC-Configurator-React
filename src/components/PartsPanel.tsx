import {ReactElement} from 'react';
import {IPartViewData} from '../data/DataLoader';
import PCPart from "./PCPart";

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