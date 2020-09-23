import IPageNode from '../../types/IPageNode';
import IPage from '../../types/IPage';

class Parser {
  protected pageTypes: string[];
  protected frames: {
    [key: string]: IPageNode;
  } = {};
  public output: string[] = [];
  page: IPage;

  constructor(page: IPage) {
    this.page = page;
    this.pageTypes = [];
    this.getNodeTypes();
  }

  getNodeTypes() {
    const types: string[] = [];

    for (const [_, value] of Object.entries(this.page.nodes)) {
      const node = value.document;
      const name = node.name;
      this.pageTypes.push(name);
      this.frames[name] = node.children.find(
        (child) => ~child.name.indexOf(name) && child.type === 'FRAME'
      )!;
    }

    return types;
  }
}

export default Parser;
