import IPageNode from './IPageNode';

export default interface IPage {
  nodes: {
    [key: string]: {
      document: IPageNode;
    };
  };
}
