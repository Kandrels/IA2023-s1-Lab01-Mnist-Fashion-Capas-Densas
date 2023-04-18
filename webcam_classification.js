// Load the model
let model;
tf.loadLayersModel('model/model.json').then(m => {
  model = m;
  console.log('Model loaded.');
});

// Get references to the DOM elements
const fileInput = document.getElementById('fileInput');
const submitButton = document.getElementById('submitImage');
const uploadedImage = document.getElementById('uploadedImage');
const result = document.getElementById('result');

const uploadButton = document.getElementById('uploadButton');
uploadButton.addEventListener('click', uploadImage);


// Add an event listener to the submit button
submitButton.addEventListener('click', async function() {
  // Get the uploaded file
  const file = fileInput.files[0];
  
  if (!file) {
    result.innerText = 'Please select an image.';
    return;
  }

  // Read the file as an image
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async function() {
    // Create a new image object and set its source to the uploaded file
    const image = new Image();
    image.src = reader.result;

    // Wait for the image to load
    image.onload = async function() {
      // Set the uploadedImage element to display the selected image
      uploadedImage.src = image.src;

      // Preprocess the image
      const tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([28, 28]).mean(2).expandDims(2).expandDims().toFloat().div(255);

      // Make a prediction
      const prediction = await model.predict(tensor).data();

      // Get the predicted class label
      const predictedClass = prediction.indexOf(Math.max(...prediction));

      // Show the predicted class label on the screen
      result.innerText = `Predicted clothing type: ${classNames[predictedClass]}`;
    };
  };
});
