const endpointConst = {
	AUTH: {
		LOGIN: "auth/login",
		REGISTER: "auth/register",
		LOGOUT: "auth/logout",
	},
	USER: {
		INFO: (id) => `users/${id}`,
		CHANGE_PASSWORD: "users/change-password",
	},
	EMPLOYEE: {
		GET_ALL: "employees",
		ADD: "employees",
		UPDATE: (id) => "employees/" + id,
		DELETE: (id) => "employees/" + id,
		EXPORT: "employees/export",
	},
	FILE: {
		GET_ALL: "files",
		GET_DATA: (id) => "files/data/" + id,
		UPLOAD: "files",
		DELETE: (id) => "files/" + id,
	},
	INSURANCE: {
		ADD: "insurances",
		GET_ALL: "insurances",
		UPDATE: (id) => "insurances/" + id,
	},
	DEPARTMENT: {
		ADD: "departments",
		GET_ALL: "departments",
		UPDATE: (id) => "departments/" + id,
		DELETE: (id) => "departments/" + id,
	},
	POSITION: {
		ADD: "positions",
		GET_ALL: "positions",
		UPDATE: (id) => "positions/" + id,
		DELETE: (id) => "positions/" + id,
	},
	MAIL: {
		SEND: "mails",
	},
};

export default endpointConst;
