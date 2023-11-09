import {ReactElement, PropsWithoutRef} from 'react';
import {IDetailData, IDetailViewData, TDetailKey} from "../data/DataLoader";

interface IProps {
  details: IDetailViewData[];
}

export default function DetailsPanel({details}: IProps): ReactElement {
  return (
    <div className="container">
      {
        details.map((detailData) => {
          return (
            <div key={detailData.id}>{detailData.name}</div>
          );
        })
      }
    </div>
  );
}