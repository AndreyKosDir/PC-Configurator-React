import {ReactElement} from "react";
import {IItemData} from "../../interfaces/Interfaces";
import TextButton from "../UI/buttons/TextButton";
import './CatalogItem.css';

interface IItemProps {
  item: IItemData;
  selectCallback: Function;
}

export default function CatalogItem({item, selectCallback}: IItemProps): ReactElement {
  return (
    <div className="item-field">
      <img src={item.img} alt=""/>
      <div className="info">
        <p className="head">{item.name}</p>
        <p>{item.info}</p>
      </div>
      <div className="price">
        <p><strong>{item.price.toLocaleString()}</strong> ₽</p>
      </div>
      <div className="select">
        <TextButton
          caption="Выбрать"
          tooltip="Выбрать"
          onClick={(event) => {
            selectCallback(item);
            event.stopPropagation();
          }}/>
      </div>
    </div>
  );
}