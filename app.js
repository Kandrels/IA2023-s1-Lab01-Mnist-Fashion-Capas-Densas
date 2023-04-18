const form = document.querySelector('form');
const imageContainer = document.querySelector('.image-container');
const clearCacheButton = document.querySelector('#clear-cache');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const imageFile = document.querySelector('#image-file').files[0];
  const reader = new FileReader();
  
  reader.addEventListener('load', () => {
    const image = new Image();
    image.src = reader.result;
    image.classList.add('image');
    imageContainer.appendChild(image);
  });
  
  reader.readAsDataURL(imageFile);
});

clearCacheButton.addEventListener('click', () => {
  // Clear image container by setting its innerHTML to an empty string
  imageContainer.innerHTML = '';
});

