import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import insuranceService from "src/services/insuranceService";
import userService from "src/services/userService";
import { useAppContext } from "./AppContext";

export const InsuranceContext = createContext(null);

export const InsuranceProvider = (props) => {
	const { children } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [insuranceList, setInsuranceList] = useState([]);
	const { refresh, refreshApp } = useAppContext();

	useEffect(() => {
		(async () => {
			const res = await insuranceService.getAll()
			setInsuranceList(res?.data || [])
		})()
	}, [children, refreshApp])


	const addInsurance = async ({ number, issuedDate, issuedPlace, employeeId }) => {
		setIsLoading(true);
		let res = await insuranceService.add({ number, issuedDate, issuedPlace, employeeId });
		if (res && res.statusCode === 200) {
			toast("Add insurance successfully", { type: "success" });
			refresh();
		} else toast("Add failed insurance", { type: "error" });
		// console.log(res);
		setIsLoading(false);
	};
	const getAllInsurance = async () => {
		setIsLoading(true);
		let res = await insuranceService.getAll();
		// console.log(res);
		setIsLoading(false);
		return res?.data || [];
	};
	const updateInsurance = async (id, { number, issuedDate, issuedPlace }) => {
		setIsLoading(true);
		let res = await insuranceService.update(id, { number, issuedDate, issuedPlace });
		if (res && res.statusCode === 200) {
			toast("Update insurance info successfully", { type: "success" });
			refresh();
		} else toast("Update failed insurance", { type: "error" });
	};
	return (
		<InsuranceContext.Provider
			value={{ isLoading, insuranceList, addInsurance, getAllInsurance, updateInsurance }}
		>
			{children}
		</InsuranceContext.Provider>
	);
};

export const InsuranceConsumer = () => InsuranceContext.Consumer;
export const useInsuranceContext = () => useContext(InsuranceContext);
