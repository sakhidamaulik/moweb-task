import { IVoucher } from "../Model/Voucher.Model";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const voucherService = {
  createVoucher: async (voucher: IVoucher): Promise<IVoucher> => {
    const url = `${BASE_URL}/api/vouchers`;
    const response = await axios.post<IVoucher>(url, voucher);

    return response.data;
  },

  getVouchers: async (): Promise<IVoucher[]> => {
    const url = `${BASE_URL}/api/vouchers`;
    const response = await axios.get<IVoucher[]>(url);

    return response.data;
  },
};
