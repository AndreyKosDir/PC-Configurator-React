import {IItemData} from "../interfaces/Interfaces";

export interface IDataLoader {
  // getDetailsNames(): TDetailKey[];
  getPartsViewData(): IPartViewData[];
  loadPartsViewData(): Promise<void>;
  loadPCPartData(partId: TPartId): Promise<IItemData[]>;
}

const PartsDataConfig = {
  case: './data/Items/case.json',
  cpu: './data/Items/cpu.json',
  fan: './data/Items/fan.json',
  hardDisk: './data/Items/hardDisk.json',
  motherBoard: './data/Items/motherBoard.json',
  powerBank: './data/Items/powerBank.json',
  ramMemory: './data/Items/ramMemory.json',
  ssd: './data/Items/ssd.json',
  videoCard: './data/Items/videoCard.json'
};

export type TPartId = keyof typeof PartsDataConfig;

export interface IPartViewData {
  id: TPartId;
  imgPath: string;
  status: 'notActive' | 'active';
  format: 'png' | 'svg' | 'jpeg';
  name: string;
}

const ModulesDataPath = './data/PcModules/pcModules.json';

/**
 * Загрузчик данных
 */
export default class DataLoader implements IDataLoader {
  private _partsViewData: IPartViewData[] = [];

  constructor() {

  }

  /**
   * Получить наименования деталей
   */
  // public getDetailsNames(): TDetailKey[] {
  //   return this._detailsNames;
  // }

  /**
   * Получить данные для визуального отображения деталей
   */
  public getPartsViewData(): IPartViewData[] {
    return this._partsViewData;
  }

  /**
   * Загрузить данные по отображению деталей
   */
  public async loadPartsViewData(): Promise<void> {
    try {
      const modulesResponse = await fetch(ModulesDataPath);
      this._partsViewData = await modulesResponse.json();
    } catch (err) {
      console.log(err);
    }
  }

  // TODO: мб создать AsyncWrapper который будет просто заворачивать тело функции в обертку try/catch

  /**
   * Загрузить данные для конкретной детали ПК
   * @param partId
   */
  public async loadPCPartData(partId: TPartId): Promise<IItemData[]> {
    try {
      const response = await fetch(PartsDataConfig[partId]);

      return await response.json();
    } catch (err) {
      console.log(err);

      return [];
    }
  }
}