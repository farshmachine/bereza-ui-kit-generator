const getRgbaColor = (r: number, g: number, b: number, a: number) => {
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
    b * 255
  )}, ${a})`;
};

const getColorVariable = (prefix: string, color: string) => {
  return `${prefix}: ${color}`;
};

export { getRgbaColor, getColorVariable };
