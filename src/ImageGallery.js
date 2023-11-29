import React, { useState, useEffect } from 'react';
import './ImageGallery.css';
import axios from 'axios';
import { Paper, Button, Dialog, DialogTitle, DialogContent, Stack, FormControlLabel, Checkbox } from '@mui/material';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [termsOfUse, setTermsOfUse] = useState([]);
    const [isTermsAccepted, setTermsAccepted] = useState(false);
    const [openModal, setOpenModal] = useState(true);

    const fetchData = async () => { 
        const apiUrl = 'http://167.71.69.158/static/test.json';

        try {
            const response = await axios.get(apiUrl);

            setImages(response.data.images);
            setTermsOfUse(response.data.terms_of_use);
        } 
        catch (error) {
            console.error('An error occurred while attempting to load data from API:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderImageToCanvas = (imageUrl, index) => { 
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        const image = new Image();

        image.src = 'http://167.71.69.158' + imageUrl;

        image.onload = () => {
            const imageSize = canvas.width / images.length;
            const x = index * (imageSize + 50);
            const y = 0;
            const aspectRatio = image.width / image.height;
            const height = imageSize / aspectRatio;

            context.drawImage(image, x, y, imageSize, height);
        };
    };

    const handleDownloadClick = (event) => {
        const imageUrl = event.target.getAttribute('data-url');
        const link = document.createElement('a');

        link.href = 'http://167.71.69.158' + imageUrl;
        link.download = 'image.png';
        link.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isTermsAccepted) {
            images.forEach((image, index) => {
                renderImageToCanvas(image.image_url, index)

                const button = document.createElement('button');

                button.className='css-sghohy-MuiButtonBase-root-MuiButton-root';
                button.innerText = 'Download Image';
                button.setAttribute('data-url', image.image_url);
                button.addEventListener('click', handleDownloadClick);

                document.getElementById('download-buttons').appendChild(button);
            });

            closeModal();
        }
    };

    const handleCheckboxChange = (event) => {
        setTermsAccepted(event.target.checked);
    };

    const closeModal = () => {
        setOpenModal(false);

        images.forEach((image) => renderImageToCanvas(image.image_url));
    }

    return (
        <div>
            <h1>Image Gallery</h1>
            <div>
                <Paper id='paper'>
                    <div id='canvas-container'>
                        <canvas id='canvas' width={1400} height={600}></canvas>
                        <div id='download-buttons'></div> 
                    </div>                  
                </Paper>

                <Dialog open={openModal} onClose={closeModal} maxWidth='lg'>
                    <DialogTitle>
                        <h3>Terms of Use</h3>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2} margin={1}>
                                {termsOfUse.paragraphs && termsOfUse.paragraphs.map((paragraph, index) => (
                                    <div key={index}>
                                        <h3>{paragraph.title}</h3>
                                        <p>{paragraph.content}</p>
                                    </div>
                                ))}
                                <FormControlLabel
                                    control={<Checkbox checked={isTermsAccepted} onChange={handleCheckboxChange} />}
                                    label='I have read and accept the terms of use'
                                />
                                <Button type='submit' variant='contained' disabled={!isTermsAccepted}>Accept</Button>
                            </Stack>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ImageGallery;