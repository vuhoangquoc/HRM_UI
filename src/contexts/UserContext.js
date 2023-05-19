import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import userService from "src/services/userService";

export const UserContext = createContext(null)

export const UserProvider = (props) => {
	const { children } = props;
	const [isLoading, setIsLoading] = useState(false)

	const changePassword = async (currentPw, newPw) => {
		setIsLoading(true)
		let res = await userService.changePassword(currentPw, newPw)
		if (res && res.statusCode === 200) {
			toast("Update password successfully", { type: "success" })
		}
		else toast("Update password failed. Let's check your current password", { type: "error" })
		setIsLoading(false)
	}
	return (
		<UserContext.Provider value={{ isLoading, changePassword }}>
			{children}
		</UserContext.Provider>
	)
}

export const UserConsumer = () => UserContext.Consumer;
export const useUserContext = () => useContext(UserContext);