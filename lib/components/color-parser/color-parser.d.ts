import IPage from '../../types/IPage';
import IPageNode from '../../types/IPageNode';
import Parser from '../parser';
export default class ColorParser extends Parser {
    constructor(page: IPage);
    parseColors(): string[];
    getColor(name: string): {
        name: string;
        colors: IPageNode[];
    };
    getBgColor(name: string, colorName: string, color: IPageNode): string;
}
