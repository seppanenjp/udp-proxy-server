import { Passing } from './../utils/parser';
import axios from 'axios'

export class NavisportClient {

    async savePassing(payload: Passing): Promise<void> {
        return axios.post(`${process.env.NAVISPORT_BASE_URL}/devices/data`, payload)
          .then(res => {
            console.log("Server response", res.data)
          })
          .catch(console.log)
    }
}