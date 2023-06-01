import React from 'react';

import Navbar from '../MainComponents/Navbar';
import Footer from '../MainComponents/Footer';

import styles from '../../styles';

const PageHOC = (Component) => {
	return (
		<div className={styles.hocContainer}>
			<Navbar />
			<div className={styles.hocBodyWrapper}>
				<Component />
			</div>
			<Footer />
		</div>
	);
};

export default PageHOC;
