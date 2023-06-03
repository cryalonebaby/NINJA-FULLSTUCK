import React from 'react';

import { Navbar, Footer, Notification } from '..';

import styles from '../../styles';

const PageHOC = (Component) => {
	return (
		<div className={`main ${styles.hocContainer}`}>
			<Navbar />
			<main className={styles.hocBodyWrapper}>
				<Component />
			</main>
			<Footer />
			<Notification />
		</div>
	);
};

export default PageHOC;
