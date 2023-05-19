import localStorageConst from "src/constants/localStorageConst";

const userUtil = {
	getCurrentUserFromLocalStorage() {
		if (typeof window !== 'undefined') {
			const currentUser = JSON.parse(localStorage.getItem(localStorageConst.CURRENT_USER))
			return currentUser;
		}
	}
}
export default userUtil;