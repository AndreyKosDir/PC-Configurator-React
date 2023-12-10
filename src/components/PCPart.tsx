import {ReactElement} from 'react';
import {IItemData} from '../interfaces/Interfaces';
import './PCPart.css';
import CloseButton from "./UI/buttons/CloseButton";

interface IProps {
  data?: IItemData;
  partId: string;
  partName: string;
  openCatalog: Function;
  resetDetailData: Function;
}

// TODO: возможно сразу стоит использовать контекст в App для передачи данных сюда из каталога

export default function PCPart({data, partId, partName, openCatalog, resetDetailData}: IProps): ReactElement {
  return (
    <div className="PCPart_item-container">
      <p className="PCPart_head">{partName}</p>
      {
        data
          ?
          <div className="PCPart_item">
            <img src={data.img} alt=""/>
            <div className="PCPart_right-section">
              <div>
                <p className="PCPart_name" title={data.name}>
                  {data.name}
                </p>
                <CloseButton
                  className="PCPart_reset-btn"
                  tooltip="Отменить выбор"
                  onClick={(event: MouseEvent) => {
                    resetDetailData(partId);
                  }}
                  size="small"
                />
              </div>
              <p className="PCPart_price">
                {data.price + ' ₽'}
              </p>
            </div>

          </div>
          :
          <div
            className="PCPart_empty-container"
            onClick={(event) => {
              openCatalog(partId)
            }}
          >
            <div className="PCPart_empty-item"></div>
          </div>
      }
    </div>
  );
}