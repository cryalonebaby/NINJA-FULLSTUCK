import React from 'react';

import { FormComponent, PageHOC } from '../components';

const CreateHero = () => {
	return <FormComponent />;
};

export default PageHOC(CreateHero);
