export interface IDataLoader {
  // getDetailsNames(): TDetailKey[];
  getDetailsViewData(): IDetailViewData[];
  loadModulesData(): Promise<void>;
}

const DetailsConfig = {
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

export interface IDetailData {
  name: string;
  price: number;
  info: string;
  img: string;
}

export type TDetailKey = keyof typeof DetailsConfig;

export interface IDetailViewData {
  id: string;
  path: string;
  status: 'notActive' | 'active';
  format: 'png' | 'svg' | 'jpeg';
  name: string;
}

const ModulesDataPath = './data/PcModules/pcModules.json';

/**
 * Загрузчик данных
 */
export default class DataLoader implements IDataLoader {
  private _detailsViewData: IDetailViewData[] = [];

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
  public getDetailsViewData(): IDetailViewData[] {
    return this._detailsViewData;
  }

  /**
   * Загрузить данные по модулям
   */
  public async loadModulesData(): Promise<void> {
    try {
      const modulesResponse = await fetch(ModulesDataPath);
      this._detailsViewData = await modulesResponse.json();
      let asd = 3;
    } catch (err: unknown) {
      // TODO: Запилить всплывашку с ошибкой
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }
}