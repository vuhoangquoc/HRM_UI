import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApp } from "src/hooks/use-app";
import positionService from "src/services/positionService";

export const PositionContext = createContext(null);

export const PositionProvider = (props) => {
	const { children } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [positionList, setPositionList] = useState([]);
	const { refresh, refreshApp } = useApp();
	const [positionToUpdate, setPositionToUpdate] = useState(null);

	useEffect(() => {
		(async () => {
			const res = await positionService.getAll();
			setPositionList(res?.data || []);
		})();
	}, [children, refreshApp]);

	const resetPositionToUpdate = () => setPositionToUpdate(null);
	const getAll = async () => {
		setIsLoading(true);
		let res = await positionService.getAll();
		console.log(res);
		refresh();
		setIsLoading(false);
	};
	const add = async ({ name, description, level }) => {
		setIsLoading(true);
		let res = await positionService.add({ name, description, level });
		console.log(res);
		if (res && res.statusCode === 200) {
			toast("Add successfully", { type: "success" });
			refresh();
		} else toast("Add failed", { type: "error" });
		setIsLoading(false);
	};
	const updateById = async ({ id, name, description, level }) => {
		setIsLoading(true);
		let res = await positionService.updateById({ id, name, description, level });
		if (res && res.statusCode === 200) {
			toast("Update successfully", { type: "success" });
			refresh();
		} else toast("Update failed", { type: "error" });
		setIsLoading(false);
	};
	const deleteById = async (id) => {
		setIsLoading(true);
		let res = await positionService.deleteById(id);
		if (res && res.statusCode === 200) {
			toast("Delete successfully", { type: "success" });
			refresh();
		} else toast("Delete failed", { type: "error" });
		setIsLoading(false);
	};
	return (
		<PositionContext.Provider
			value={{
				isLoading,
				positionList,
				add,
				getAll,
				updateById,
				deleteById,
				positionToUpdate,
				setPositionToUpdate,
				resetPositionToUpdate,
			}}
		>
			{children}
		</PositionContext.Provider>
	);
};

export const PositionConsumer = () => PositionContext.Consumer;
export const usePositionContext = () => useContext(PositionContext);
