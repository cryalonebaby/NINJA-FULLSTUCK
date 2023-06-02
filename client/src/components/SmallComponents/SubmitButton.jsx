import React from 'react';

import { Button } from '@mui/material';

const SubmitButton = () => {
	return (
		<Button
			type="submit"
			sx={{ paddingX: 5 }}
			variant="contained"
			color="success"
		>
			Save
		</Button>
	);
};

export default SubmitButton;
