import apiConfig from "src/config/api.js";
import endpointConst from "src/constants/endpointConst.js";


const authService = {
	async login(email, password) {
		try {
			const res = await apiConfig.post(endpointConst.AUTH.LOGIN, { email, password })
			return res.data;
		} catch (error) {
			return error?.response?.data || null
		}
	},
	async register({ username, email, password }) {
		try {
			const res = await apiConfig.post(endpointConst.AUTH.REGISTER, { username, email, password })
			return res.data;
		} catch (error) {
			return error.response.data
		}
	},
	async logout() {
		try {
			const res = await apiConfig.get(endpointConst.AUTH.LOGOUT)
			return res.status == 200
		} catch (error) {
			return false
		}
	}
}

export default authService;
