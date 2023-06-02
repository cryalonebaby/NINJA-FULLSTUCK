import React from 'react';

import { FormControl, InputLabel, Input } from '@mui/material';

const InputComponent = ({ label, name, value, handler }) => {
	return (
		<FormControl variant="standard">
			<InputLabel>{label}</InputLabel>
			<Input
				sx={{
					width: {
						xs: 200,
						sm: 300,
					},
				}}
				required
				type="text"
				value={value}
				onChange={handler}
				name={name}
			/>
		</FormControl>
	);
};

export default InputComponent;
