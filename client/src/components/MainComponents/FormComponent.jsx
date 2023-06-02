import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { createHero, updateHero } from '../../redux/slices/heroesSlice';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';

import InputComponent from '../SmallComponents/InputComponent';
import SubmitButton from '../SmallComponents/SubmitButton';
import FormGallery from '../SmallComponents/FormGallery';

import { Box, Container, Grid } from '@mui/material';

import randomString from '../../utils/randomString';

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

	const handleInput = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleChange = (e) => {
		const [img] = e.target.files;

		if (img) {
			const localURL = URL.createObjectURL(img);

			setImages([...images, img]);
			setSelectedImages([...selectedImages, localURL]);
		}
	};

	const handleImagePick = (index) => {
		if (!selectedImages[index]) {
			inputFile.current.click();
		} else {
			const link = selectedImages[index];
			setImages(images.filter((_, i) => i !== index));
			setSelectedImages(selectedImages.filter((item) => item !== link));
		}
	};

	const handleUploadImagesEdit = async (images) => {
		const updatedImages = [...images];

		console.log('FIRST CHECK', updatedImages);

		for (let i = 0; i < images.length; i++) {
			const img = images[i];

			// either not equal or images from hero less than current amount
			// prevent from uploading images that already uploaded
			if (!img === updatedImages[i] || !updatedImages[i]) {
				const string = randomString();
				const imgRef = ref(storage, `heroes/${string}-${img.name}`);

				const snapshot = await uploadBytes(imgRef, img);
				const url = await getDownloadURL(snapshot.ref);

				updatedImages.push(url);
			}
		}

		console.log('SECOND CHECK', updatedImages);

		return updatedImages;
	};

	const handleUploadImagesCreate = async (images) => {
		const updatedImages = [];

		console.log('FIRST CHECK', updatedImages);

		for (let i = 0; i < images.length; i++) {
			const img = images[i];

			const string = randomString();
			const imgRef = ref(storage, `heroes/${string}-${img.name}`);

			const snapshot = await uploadBytes(imgRef, img);
			const url = await getDownloadURL(snapshot.ref);

			updatedImages.push(url);
		}

		console.log('SECOND CHECK', updatedImages);

		return updatedImages;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let updatedImages;

		if (hero) {
			updatedImages = await handleUploadImagesEdit(images);
		} else {
			updatedImages = await handleUploadImagesCreate(images);
		}

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
		<Container sx={{ marginTop: 4, minWidth: 300 }}>
			<Box sx={{ textAlign: 'center' }}>
				<form onSubmit={handleSubmit}>
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
