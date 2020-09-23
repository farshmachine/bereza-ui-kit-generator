import IPageNode from '../../types/IPageNode';
import IPage from '../../types/IPage';
declare class Parser {
    protected pageTypes: string[];
    protected frames: {
        [key: string]: IPageNode;
    };
    output: string[];
    page: IPage;
    constructor(page: IPage);
    getNodeTypes(): string[];
}
export default Parser;
