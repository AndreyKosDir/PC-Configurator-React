import {ReactElement} from "react";
import {IItemData} from "../interfaces/Interfaces";
import CloseButton from "./buttons/CloseButton";
import SearchPanel from "./SearchPanel";
import FilterPanel from "./FilterPanel";
import ItemsList from "./List/ItemsList";

interface ICatalogProps {
  catalogData: IItemData[];
  partName: string;
  closeCallback: Function;
}

export default function Catalog({catalogData, partName, closeCallback}: ICatalogProps): ReactElement {


  return (
    <div className="wrapper-catalog">
      <div className="catalog">
        <h1 className="title">{partName}</h1>
        <CloseButton onClick={closeCallback}/>
        <SearchPanel />
        <FilterPanel />
        <ItemsList />
      </div>
    </div>
  );
}