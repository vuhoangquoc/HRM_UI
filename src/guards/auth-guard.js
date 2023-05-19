import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/AuthContext';
import { useApp } from 'src/hooks/use-app';
import localStorageConst from 'src/constants/localStorageConst';
import { isJwtExpired } from 'jwt-check-expiration';

export const AuthGuard = (props) => {
	const { children } = props;
	const router = useRouter();
	const { isAuthenticated } = useAuthContext();
	const ignore = useRef(false);
	const [checked, setChecked] = useState(false);
	const { refreshApp } = useApp()
	// Only do authentication check on component mount.
	// This flow allows you to manually redirect the user after sign-out, otherwise this will be
	// triggered and will automatically redirect to sign-in page.
	const jwtToken = localStorage.getItem(localStorageConst.JWT_TOKEN)

	useEffect(() => {
		if (!router.isReady) {
			return;
		}

		// Prevent from calling twice in development mode with React.StrictMode enabled
		if (ignore.current) {
			return;
		}

		ignore.current = true;

		if (!isAuthenticated || !jwtToken || isJwtExpired(jwtToken)) {
			console.log('Not authenticated, redirecting');
			router
				.replace({
					pathname: '/auth/login',
					query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
				})
				.catch(console.error);
		} else {
			setChecked(true);
		}
	},
		[refreshApp, router.isReady]
	);

	if (!checked) {
		return null;
	}

	// If got here, it means that the redirect did not occur, and that tells us that the user is
	// authenticated / authorized.

	return children;
};

AuthGuard.propTypes = {
	children: PropTypes.node
};
