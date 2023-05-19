import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import authService from 'src/services/authService';
import userService from 'src/services/userService';
import localStorageConst from 'src/constants/localStorageConst';
import { useRouter } from 'next/router';
import { isJwtExpired } from 'jwt-check-expiration';
import { useAppContext } from './AppContext';
import { toast } from 'react-toastify';

const HANDLERS = {
	INITIALIZE: 'INITIALIZE',
	SIGN_IN: 'SIGN_IN',
	SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	user: null
};

const handlers = {
	[HANDLERS.INITIALIZE]: (state, action) => {
		const user = action.payload;

		return {
			...state,
			...(
				// if payload (user) is provided, then is authenticated
				user
					? ({
						isAuthenticated: true,
						isLoading: false,
						user
					})
					: ({
						isLoading: false
					})
			)
		};
	},
	[HANDLERS.SIGN_IN]: (state, action) => {
		const user = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user
		};
	},
	[HANDLERS.SIGN_OUT]: (state) => {
		return {
			...state,
			isAuthenticated: false,
			user: null
		};
	}
};

const reducer = (state, action) => (
	handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
	const { children } = props;
	const [state, dispatch] = useReducer(reducer, initialState);
	const initialized = useRef(false);
	const [currentUser, setCurrentUser] = useState({})
	const router = useRouter();
	const { refreshApp, refresh } = useAppContext();

	const initialize = async () => {
		// Prevent from calling twice in development mode with React.StrictMode enabled
		if (initialized.current) {
			return;
		}

		initialized.current = true;

		let isAuthenticated = false;
		try {
			setCurrentUser(JSON.parse(localStorage.getItem(localStorageConst.CURRENT_USER)))
		}
		catch (err) {
			console.log(err);
		}
		try {
			isAuthenticated = localStorage.getItem('authenticated') === 'true';
		} catch (err) {
			console.error(err);
		}

		if (isAuthenticated) {
			const user = {
				id: '5e86809283e28b96d2d38537',
				avatar: '/assets/avatars/avatar-anika-visser.png',
				name: 'Anika Visser',
				email: 'anika.visser@devias.io'
			};

			dispatch({
				type: HANDLERS.INITIALIZE,
				payload: user
			});
		} else {
			dispatch({
				type: HANDLERS.INITIALIZE
			});
		}
	};

	useEffect(() => {
		(async () => {
			const token = localStorage.getItem(localStorageConst.JWT_TOKEN) || null
			const isLogin = localStorage.getItem('authenticated')

			if (!token || (token && isJwtExpired(token)) || isLogin !== "true") {
				await signOut()
				// router.reload()
			}
		})()
	}, [refreshApp]);

	useEffect(() => {
		initialize();
	}, []);


	const signIn = async (email, password) => {
		const res = await authService.login(email, password);
		console.log(res);
		if (!res) throw new Error('Server error!! Please come back later😘');
		if (!res || res?.statusCode === 400) throw new Error('Please check your email and password');

		try {
			localStorage.setItem('authenticated', 'true');
			localStorage.setItem(localStorageConst.JWT_TOKEN, res.data?.token)
		} catch (err) {
			console.error(err);
		}
		//TODO: GET LOGGING USER DETAIL
		const userRes = await userService.getInfo(res.data?.userID)
		setCurrentUser(userRes)
		localStorage.setItem(localStorageConst.CURRENT_USER, JSON.stringify(userRes))

		const user = {
			id: userRes.id,
			avatar: '/assets/avatars/avatar-anika-visser.png',
			name: userRes.username,
			email: userRes.email,
		};
		dispatch({
			type: HANDLERS.SIGN_IN,
			payload: user
		});
		refresh()
		window.location.replace("/");
	};

	const signUp = async (email, username, password) => {
		let res = await authService.register({ email, username, password })
		if (res && res.statusCode === 200) {
			toast("Register successfully", { type: "success" })
			refresh();
		}
		else if (res && res.statusCode === 400) {
			throw new Error(res.errors);
		}
		else toast("Register failed", { type: "error" })
	};

	const signOut = async () => {
		const isLogout = await authService.logout()
		if (isLogout) {
			localStorage.removeItem(localStorageConst.CURRENT_USER)
			localStorage.removeItem('authenticated')
			localStorage.removeItem(localStorageConst.JWT_TOKEN)
		}
		dispatch({
			type: HANDLERS.SIGN_OUT
		});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				currentUser,
				signIn,
				signUp,
				signOut
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;
export const useAuthContext = () => useContext(AuthContext);
