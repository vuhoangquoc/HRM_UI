import apiConfig from "src/config/api.js";
import endpointConst from "src/constants/endpointConst.js";

const employeeService = {
	async getAll() {
		try {
			const res = await apiConfig.get(endpointConst.EMPLOYEE.GET_ALL)
			return res.data
		} catch (error) {
			return error?.response?.data
		}
	},
	async add({ firstName, lastName, gender, address, email, dob, positionId, departmentId }) {
		try {
			const res = await apiConfig.post(endpointConst.EMPLOYEE.ADD, { firstName, lastName, gender, address, email, dob, positionId, departmentId })
			return res.data
		} catch (error) {
			return error?.response?.data || null
		}
	},
	async update({ id, firstName, lastName, gender, address, dob, positionId, departmentId }) {
		try {
			const res = await apiConfig.put(endpointConst.EMPLOYEE.UPDATE(id), { firstName, lastName, gender, address, dob, positionId, departmentId })
			return res.data
		} catch (error) {
			return error?.response?.data || null
		}
	},
	async delete(id) {
		try {
			const res = await apiConfig.delete(endpointConst.EMPLOYEE.DELETE(id))
			return res.data
		} catch (error) {
			return error?.response?.data || null
		}
	},
	async exportToExcel() {
		try {
			const res = await apiConfig.get(endpointConst.EMPLOYEE.EXPORT, { responseType: "blob" })
			const currentDate = new Date().toLocaleDateString('en-GB');
			const downloadUrl = window.URL.createObjectURL(new Blob([res.data], { type: 'application/octet-stream' }));
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.setAttribute('download', `EmployeeList__${currentDate}.xlsx`);
			document.body.appendChild(link);
			link.click();
			return true
		} catch (error) {
			return false
		}
	},

}

export default employeeService;
