import apiConfig from "src/config/api";
import endpointConst from "src/constants/endpointConst";

const userService = {
	async getInfo(userID) {
		try {
			const res = await apiConfig.get(endpointConst.USER.INFO(userID))
			return res.data
		} catch (error) {
			return error.response.data
		}
	},
	async changePassword(currentPassword, newPassword) {
		try {
			const res = await apiConfig.post(endpointConst.USER.CHANGE_PASSWORD, { currentPassword, newPassword })
			return res.data
		} catch (error) {
			return error.response.data
		}
	}
}

export default userService;
