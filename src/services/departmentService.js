import apiConfig from "src/config/api";
import endpointConst from "src/constants/endpointConst";

const departmentService = {
	async getAll() {
		try {
			const res = await apiConfig.get(endpointConst.DEPARTMENT.GET_ALL)
			return res.data
		} catch (error) {
			return error.response?.data || null
		}
	},
	async add({ name, description }) {
		try {
			const res = await apiConfig.post(endpointConst.DEPARTMENT.ADD, { name, description })
			return res.data
		} catch (error) {
			return error.response?.data || null
		}
	},
	async updateById({ id, name, description }) {
		try {
			const res = await apiConfig.put(endpointConst.DEPARTMENT.UPDATE(id), { name, description })
			return res.data
		} catch (error) {
			return error.response?.data || null
		}
	},
	async deleteById(id) {
		try {
			const res = await apiConfig.delete(endpointConst.DEPARTMENT.DELETE(id))
			return res.data
		} catch (error) {
			return error.response?.data || null
		}
	},

}

export default departmentService;
