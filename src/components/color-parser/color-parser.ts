import IPage from '../../types/IPage';
import IPageNode from '../../types/IPageNode';
import Parser from '../parser';
import { getRgbaColor, getColorVariable } from '../../utils';

export default class ColorParser extends Parser {
  constructor(page: IPage) {
    super(page);
  }

  parseColors() {
    const palettes = [
      'Monochromes',
      'Primary',
      'Accent',
      'Faded',
      'Success',
      'Warning',
      'Danger',
    ].map((palette) => {
      return this.getColor(palette);
    });

    palettes.forEach(
      ({ name, colors }: { name: string; colors: IPageNode[] }) => {
        let colorName: string = name.toLowerCase();

        colors.forEach((color) => {
          const colorVariable = this.getBgColor(name, colorName, color);

          this.output.push(colorVariable);
        });
      }
    );

    return this.output;
  }

  getColor(name: string) {
    const frameChildren = this.frames['Colors'].children;
    const paletteGroupChilds = frameChildren.find((child) => {
      return ~child.name.indexOf(name) && child.type === 'GROUP';
    })!.children;
    const paletteInstanceChilds = paletteGroupChilds.find(
      (child) => ~child.name.indexOf(name) && child.type === 'INSTANCE'
    )!.children;

    const colors = paletteInstanceChilds.filter(
      (child) => child.type === 'INSTANCE'
    );

    return { name, colors };
  }

  getBgColor(name: string, colorName: string, color: IPageNode) {
    let variableName: string = '';
    // ! Проверка из-за разрици именований в фигме объектов, отвечающих за цвет фона элемента
    if (name !== 'Monochromes') {
      const nameAfix = color.name.split(' ').slice(1).join('-');
      variableName = `${colorName}-${nameAfix}`;
    } else {
      variableName = color.name.toLowerCase().split(' ').join('-');
    }

    const rectElem = color.children.find(
      (child) => ~child.name.indexOf('color') && child.type === 'VECTOR'
    )!;
    const { r, g, b } = rectElem.fills[0].color;
    const opacity = rectElem.fills[0].opacity
      ? +rectElem.fills[0].opacity.toFixed(1)
      : 1;
    const rgba = getRgbaColor(r, g, b, opacity);
    return getColorVariable(variableName, rgba);
  }
}
