import React from 'react';

import { Box, Button, Typography, Modal } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

const ModalDelete = ({ isOpen, handleModal, handleDelete }) => {
	return (
		<Modal hideBackdrop open={isOpen}>
			<Box sx={{ ...style, width: 200 }}>
				<Typography>Are you sure to delete?</Typography>
				<Box display={'flex'}>
					<Button onClick={handleModal}>No</Button>
					<Button color="secondary" onClick={handleDelete}>
						Delete
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default ModalDelete;
