import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './config';

const RoutesWrapper = () => {
	const defaultPath = PrivateRoutes[0].path;
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				{PrivateRoutes.map((route) => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}

				<Route path="*" element={<Navigate to={defaultPath} replace />} />
			</Routes>
		</Suspense>
	);
};

//

export default RoutesWrapper;
