export default interface IFills {
    blendMode: string;
    type: string;
    color: {
        [key: string]: number;
    };
    opacity: number;
}
