import apiConfig from "src/config/api";
import endpointConst from "src/constants/endpointConst";

const positionService = {
	async getAll() {
		try {
			const res = await apiConfig.get(endpointConst.POSITION.GET_ALL);
			return res.data;
		} catch (error) {
			return error.response?.data || null;
		}
	},
	async add({ name, description, level }) {
		try {
			const res = await apiConfig.post(endpointConst.POSITION.ADD, { name, description, level });
			return res.data;
		} catch (error) {
			return error.response?.data || null;
		}
	},
	async updateById({ id, name, description, level }) {
		try {
			const res = await apiConfig.put(endpointConst.POSITION.UPDATE(id), { name, description, level });
			return res.data;
		} catch (error) {
			return error.response?.data || null;
		}
	},
	async deleteById(id) {
		try {
			const res = await apiConfig.delete(endpointConst.POSITION.DELETE(id));
			return res.data;
		} catch (error) {
			return error.response?.data || null;
		}
	},
};

export default positionService;
