declare class Api {
    private fileKey;
    private nodeId;
    private token;
    private BASE_URL;
    constructor(fileKey: string, nodeId: string, token: string);
    private getNodeId;
    private appendHeaders;
    getPageNodes: () => Promise<any>;
}
export default Api;
