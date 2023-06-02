import React from 'react';

import Navbar from '../MainComponents/Navbar';
import Footer from '../MainComponents/Footer';
import Notification from '../SmallComponents/Notification';

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
