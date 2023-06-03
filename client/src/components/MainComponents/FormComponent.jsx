import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { createHero, updateHero } from '../../redux/slices/heroesSlice';

import {
	handleUploadImagesCreate,
	handleUploadImagesEdit,
} from '../../utils/uploadUtils';

import { InputComponent, SubmitButton, FormGallery } from '..';

import { Box, Container, Grid } from '@mui/material';

const FormComponent = ({ hero }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const inputFile = useRef(null);

	// State for images came from hero
	const [images, setImages] = useState(hero?.images || []);

	// State for new images used for preview
	const [selectedImages, setSelectedImages] = useState(hero?.images || []);

	const [values, setValues] = useState({
		nickname: hero?.nickname || '',
		real_name: hero?.real_name || '',
		origin_description: hero?.origin_description || '',
		superpowers: hero?.superpowers || '',
		catch_phrase: hero?.catch_phrase || '',
	});

	// when hero loaded update all states
	useEffect(() => {
		setImages(hero?.images || []);
		setSelectedImages(hero?.images || []);
		setValues({
			nickname: hero?.nickname || '',
			real_name: hero?.real_name || '',
			origin_description: hero?.origin_description || '',
			superpowers: hero?.superpowers || '',
			catch_phrase: hero?.catch_phrase || '',
		});
	}, [hero]);

	// unique handleInputs for text forms
	const handleInput = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	// function that reacts immediately after we choose the picture in input
	const handleChange = (e) => {
		const [img] = e.target.files;

		if (img) {
			const localURL = URL.createObjectURL(img);

			// add img as an OBJ
			setImages([...images, img]);

			// add img as an local URL for fast preview
			setSelectedImages([...selectedImages, localURL]);
		}
	};

	// if particular ceil has an image, we remove it, otherwise we open input
	const handleImagePick = (index) => {
		if (!selectedImages[index]) {
			inputFile.current.click();
		} else {
			const link = selectedImages[index];
			setImages(images.filter((_, i) => i !== index));
			setSelectedImages(selectedImages.filter((item) => item !== link));
		}
	};

	// function that runs after form is submitted
	const handleSubmit = async (e) => {
		e.preventDefault();
		let updatedImages;

		// check either we create hero or update hero
		if (hero) {
			updatedImages = await handleUploadImagesEdit(images);
		} else {
			updatedImages = await handleUploadImagesCreate(images);
		}

		// run dispatch that depends on our goal and only if we have at least 1 pic
		if (updatedImages.length > 0) {
			hero
				? dispatch(
						updateHero({ ...values, id: hero._id, images: updatedImages })
				  )
				: dispatch(createHero({ ...values, images: updatedImages }));
			navigate('/');
		}
	};

	return (
		<Container
			sx={{ marginTop: 4, minWidth: 300 }}
			data-testid="form-component"
		>
			<Box sx={{ textAlign: 'center' }}>
				<form data-testid="form" onSubmit={handleSubmit}>
					<Grid container spacing={6}>
						<Grid item xs={12} sm={12}>
							<FormGallery
								selectedImages={selectedImages}
								handleImagePick={handleImagePick}
								handleChange={handleChange}
								inputFile={inputFile}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<InputComponent
								label="Name"
								name="nickname"
								value={values.nickname}
								handler={handleInput}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<InputComponent
								label="Real Name"
								name="real_name"
								value={values.real_name}
								handler={handleInput}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<InputComponent
								label="Description"
								name="origin_description"
								value={values.origin_description}
								handler={handleInput}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<InputComponent
								label="Superpowers"
								name="superpowers"
								value={values.superpowers}
								handler={handleInput}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<InputComponent
								label="Catch Phrase"
								name="catch_phrase"
								value={values.catch_phrase}
								handler={handleInput}
							/>
						</Grid>
						<Grid item xs={12} sm={12} sx={{ marginBottom: 5 }}>
							<SubmitButton />
						</Grid>
					</Grid>
				</form>
			</Box>
		</Container>
	);
};

export default FormComponent;
