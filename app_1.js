function createElement(tag, attributes, parent) {
    const element = document.createElement(tag);
    Object.assign(element, attributes);

    if (parent) {
        parent.appendChild(element);
    }

    return element;
}

async function acceptTermsOfUse(termsOfUse) {
    return new Promise((resolve) => {
        const modal = document.getElementById('modal');
        const content = document.querySelector('.modal-content');

        termsOfUse.paragraphs.forEach((paragraph) => {
            const h3 = createElement('h3', { textContent: paragraph.title }, document.getElementById('termsContent'));
            const p = createElement('p', { textContent: paragraph.content }, document.getElementById('termsContent'));
        });

        const acceptButton = document.getElementById('acceptButton');
        acceptButton.addEventListener('click', () => {
            modal.style.display = 'none';
            resolve();
        });

        modal.style.display = 'block';
    });
}

async function renderImageToCanvas(imageUrl) {
    return new Promise((resolve) => {
        const container = document.getElementById('imageContainer');
        const canvas = createElement('canvas', { width: 200, height: 200 }, container);
        const context = canvas.getContext('2d');
        const image = new Image();

        image.crossOrigin = "Anonymous"; 
        image.onload = function () {
            context.drawImage(image, 0, 0, 200, 200);

            const saveButton = createElement('button', { textContent: 'Save Image', id: 'saveButton' }, container);
            saveButton.addEventListener('click', () => {
                const tempCanvas = createElement('canvas', { width: 200, height: 200 });
                const tempContext = tempCanvas.getContext('2d');
                tempContext.drawImage(image, 0, 0, 200, 200);

                tempCanvas.toBlob((blob) => {
                    const link = createElement('a', { href: URL.createObjectURL(blob), download: getFileName(imageUrl) });
                    link.click();
                });
            });

            resolve();
        };

        image.src = 'http://167.71.69.158' + imageUrl; 
    });
}

function getFileName(imageUrl) {
    const parts = imageUrl.split('/');

    return parts[parts.length - 1];
}

async function main() {
    const jsonUrl = 'http://167.71.69.158/static/test.json';

    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();

        await acceptTermsOfUse(data.terms_of_use);

        const imageContainer = document.getElementById('imageContainer');

        for (const image of data.images) {
            await renderImageToCanvas(image.image_url);
        }
    } 
    catch (error) {
        console.error('Error:', error);
    }
}

main();