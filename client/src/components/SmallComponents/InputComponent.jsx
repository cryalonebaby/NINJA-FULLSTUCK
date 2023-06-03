import React from 'react';

import { FormControl, InputLabel, Input } from '@mui/material';

const InputComponent = ({ label, name, value, handler }) => {
	const inputId = `${name}-input`;

	return (
		<FormControl variant="standard">
			<InputLabel htmlFor={inputId}>{label}</InputLabel>
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
				id={inputId}
			/>
		</FormControl>
	);
};

export default InputComponent;
