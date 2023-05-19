import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApp } from "src/hooks/use-app";
import employeeService from "src/services/employeeService";
import mailService from "src/services/mailService";

export const EmployeeContext = createContext(null)

export function EmployeeProvider(props) {
	const { children } = props;
	const [employeeList, setEmployeeList] = useState([]);
	const { refresh, refreshApp } = useApp()

	useEffect(() => {
		(async () => {
			const res = await employeeService.getAll()
			setEmployeeList(res?.data || [])
		})()
	}, [children, refreshApp])


	const createEmployee = async ({ firstName, lastName, gender, address, email, dob, positionId, departmentId }) => {
		const res = await employeeService.add({ firstName, lastName, gender, address, email, dob, departmentId, positionId })

		if (res && res.statusCode === 200) {
			toast("Add employee successfully", { type: "success" })
			refresh();
		}
		else toast("Add failed employee", { type: "error" })
	}
	const updateEmployee = async ({ id, firstName, lastName, gender, address, dob, positionId, departmentId }) => {
		const res = await employeeService.update({ id, firstName, lastName, gender, address, dob, positionId, departmentId })
		if (res && res.statusCode === 200) {
			toast("Update employee info successfully", { type: "success" })
			refresh();
		}
		else toast("Update failed employee", { type: "error" })
	}
	const deleteEmployee = async (id) => {
		const res = await employeeService.delete(id);
		if (res && res.statusCode === 200) {
			toast("Delete employee successfully", { type: "success" })
			refresh();
		}
		else toast("Delete employee failed", { type: "error" })
	}
	const sendMail = async ({ emails, subject, content, files }) => {
		const res = await mailService.send({ emails, subject, content, files });
		if (res && res.statusCode === 200) {
			toast("Send mail successfully", { type: "success" })
			refresh();
		}
		else toast("Send mail failed", { type: "error" })
	}
	const exportToExcel = async () => {
		const res = await employeeService.exportToExcel()
		if (res) {
			toast("Export successfully", { type: "success" })
			refresh();
		}
		else toast("Export failed", { type: "error" })
	}
	return (
		<EmployeeContext.Provider
			value={{
				exportToExcel, sendMail, createEmployee, updateEmployee, deleteEmployee, employeeList
			}}
		>
			{children}
		</EmployeeContext.Provider>
	)

}

export const EmployeeConsumer = () => EmployeeContext.Consumer
export const useEmployeeContext = () => useContext(EmployeeContext)
