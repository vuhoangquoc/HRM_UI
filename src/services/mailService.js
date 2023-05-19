import QueryString from "qs";
import apiConfig from "src/config/api";
import endpointConst from "src/constants/endpointConst";

const mailService = {
	async send({ emails, subject, content, files }) {
		try {
			let formData = new FormData()
			files.forEach((file) => formData.append("files", file))
			const res = await apiConfig.post(
				endpointConst.MAIL.SEND,
				formData,
				{
					paramsSerializer: params => QueryString.stringify(params, { arrayFormat: "repeat" }),
					params: { emailAddress: emails, subject, text: content },
					headers: { "Content-Type": "multipart/form-data" }
				}
			)
			return res.data
		} catch (error) {
			return error.response?.data || null
		}
	},
}

export default mailService;
