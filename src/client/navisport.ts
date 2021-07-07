import { Passing } from "../utils/parser";
import axios from "axios";

const NAVISPORT_BASE_URL = "https://navisport.fi/api";

export class NavisportClient {
  async savePassing(payload: Passing): Promise<void> {
    return axios
      .post(`${NAVISPORT_BASE_URL}/devices/data`, payload)
      .then((res) => {
        console.log("Navisport server response", res.data);
      })
      .catch(console.log);
  }

  async ping(deviceId: string): Promise<void> {
    return axios.get(`/devices/${deviceId}/ping`);
  }
}
