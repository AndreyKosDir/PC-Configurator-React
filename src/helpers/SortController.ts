import {SortDirectionIterator, IIterator} from "../Constants";

export interface ISortController {
  resetNameIterator: () => void;
  resetPriceIterator: () => void;
  resetAll: () => void;
  changeNameDirection: () => number;
  changePriceDirection: () => number;
}


/**
 * Контроллер отвечающий за сортировку
 */
export default class SortController implements ISortController {
  private _nameIterator: IIterator = SortDirectionIterator();
  private _priceIterator: IIterator = SortDirectionIterator();

  public resetNameIterator(): void {
    this._nameIterator.reset();
  }

  public resetPriceIterator(): void {
    this._priceIterator.reset();
  }

  public resetAll(): void {
    this.resetNameIterator();
    this.resetPriceIterator();
  }

  public changeNameDirection(): number {
    return this._nameIterator.next();
  }

  public changePriceDirection(): number {
    return this._priceIterator.next();
  }
}