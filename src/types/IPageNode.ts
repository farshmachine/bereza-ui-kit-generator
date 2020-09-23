import IFills from './IFills';

export default interface IPageNode {
  id: string;
  name: string;
  type: string;
  children: IPageNode[];
  fills: IFills[];
}
