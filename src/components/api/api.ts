import axios, { AxiosRequestConfig } from 'axios';

class Api {
  private BASE_URL: string = 'https://api.figma.com/v1/files';

  constructor(
    private fileKey: string,
    private nodeId: string,
    private token: string
  ) {
    this.nodeId = this.getNodeId();
  }

  private getNodeId(): string {
    return decodeURIComponent(this.nodeId.split('=')[1]);
  }

  private appendHeaders = (headers: { [x: string]: string }) => {
    if (this.token) headers['X-Figma-Token'] = this.token;
  };

  getPageNodes = async () => {
    const headers = {};
    this.appendHeaders(headers);
    const config: AxiosRequestConfig = {
      url: `${this.BASE_URL}/${this.fileKey}/nodes?ids=${this.nodeId}`,
      headers,
    };
    const res = await axios(config);
    if (Math.floor(res.status / 100) !== 2) throw res.statusText;
    return res.data;
  };
}

export default Api;
