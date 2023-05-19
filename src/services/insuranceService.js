import apiConfig from "src/config/api.js";
import endpointConst from "src/constants/endpointConst.js";
import employeeService from "./employeeService";

const insuranceService = {
  async add({ number, issuedDate, issuedPlace, employeeId }) {
    try {
      const res = await apiConfig.post(endpointConst.INSURANCE.ADD, {
        number,
        issuedDate,
        issuedPlace,
        employeeId,
      });
      return res.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  async getAll() {
    try {
      const res = await apiConfig.get(endpointConst.INSURANCE.GET_ALL);
      return res.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  async update(id, { number, issuedDate, issuedPlace }) {
    try {
      const res = await apiConfig.put(endpointConst.INSURANCE.UPDATE(id), {
        number,
        issuedDate,
        issuedPlace,
      });
      return res.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

export default insuranceService;
