import {ReactElement} from 'react';
import {IItemData} from '../interfaces/Interfaces';
import './PCPart.css';

interface IProps {
  data?: IItemData;
  partId: string;
  partName: string;
  openCatalog: Function;
}

// возможно сразу стоит использовать контекст в App для передачи данных сюда из каталога

export default function PCPart({data, partId, partName, openCatalog}: IProps): ReactElement {
  return (
    <div className="item-container">
      <p className="head">{partName}</p>
      <div className={`item ${data ? 'active' : 'notActive'}`}>
        {
          data
            ?
            <div>
              <div>{data.name}</div>
              <div>{data.img}</div>
              <div>{data.price}</div>
            </div>
            :
            <button className="cross" onClick={() => {
              openCatalog(partId, partName);
            }}>
              +
            </button>
        }
      </div>
    </div>

  );
}