import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import useNotification from '../../hooks/useNotification';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
	const notify = useNotification();
	const { status, notificationText } = useSelector((state) => state.heroes);

	useEffect(() => {
		switch (status) {
			case 'error':
				notificationText && notify(notificationText, 'error');
				break;
			case 'loading':
				notificationText && notify(notificationText, 'info');
				break;
			case 'loaded':
				notificationText && notify(notificationText, 'success');
				break;
			default:
				break;
		}
	}, [status]);

	return (
		<div data-testid="notification">
			<ToastContainer />
		</div>
	);
};

export default Notification;
