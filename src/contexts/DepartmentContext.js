import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApp } from "src/hooks/use-app";
import departmentService from "src/services/departmentService";

export const DepartmentContext = createContext(null)

export const DepartmentProvider = (props) => {
	const { children } = props;
	const [isLoading, setIsLoading] = useState(false)
	const [departmentList, setDepartmentList] = useState([]);
	const { refresh, refreshApp } = useApp()
	const [departmentToUpdate, setDepartmentToUpdate] = useState(null)

	useEffect(() => {
		(async () => {
			const res = await departmentService.getAll()
			setDepartmentList(res?.data || [])
		})()
	}, [children, refreshApp])

	const resetDepartmentToUpdate = () => setDepartmentToUpdate(null)
	const getAll = async () => {
		setIsLoading(true)
		let res = await departmentService.getAll();
		console.log(res);
		refresh()
		setIsLoading(false)
	}
	const add = async ({ name, description }) => {
		setIsLoading(true)
		let res = await departmentService.add({ name, description });
		if (res && res.statusCode === 200) {
			toast("Add successfully", { type: "success" })
			refresh();
		} else toast("Add failed", { type: "error" })
		setIsLoading(false)
	}
	const updateById = async ({ id, name, description }) => {
		setIsLoading(true)
		let res = await departmentService.updateById({ id, name, description });
		if (res && res.statusCode === 200) {
			toast("Update successfully", { type: "success" })
			refresh();
		} else toast("Update failed", { type: "error" })
		setIsLoading(false)
	}
	const deleteById = async (id) => {
		setIsLoading(true)
		let res = await departmentService.deleteById(id);
		if (res && res.statusCode === 200) {
			toast("Delete successfully", { type: "success" })
			refresh();
		} else toast("Delete failed", { type: "error" })
		setIsLoading(false)
	}
	return (
		<DepartmentContext.Provider value={{
			isLoading, departmentList,
			add, getAll, updateById, deleteById,
			departmentToUpdate, setDepartmentToUpdate, resetDepartmentToUpdate
		}}>
			{children}
		</DepartmentContext.Provider>
	)
}

export const DepartmentConsumer = () => DepartmentContext.Consumer;
export const useDepartmentContext = () => useContext(DepartmentContext);