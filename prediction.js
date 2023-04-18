// Load the model
const model = await tf.loadLayersModel('model.json');

// Get the file input element, submit button, and result element
const fileInput = document.getElementById('image-file');
const submitButton = document.getElementById('submit-button');
const resultElement = document.getElementById('result');

// Add an event listener to the submit button
submitButton.addEventListener('click', async () => {
  // Get the uploaded image
  const file = fileInput.files[0];
  const img = await loadImage(file);

  // Preprocess the image
  const processedImg = preprocessImage(img);

  // Make a prediction on the image
  const predictions = await model.predict(processedImg).data();
  const predictedLabel = getPredictedLabel(predictions);

  // Display the predicted label
  resultElement.innerText = `Predicted Label: ${predictedLabel}`;
});

// Utility function to get the predicted label
function getPredictedLabel(predictions) {
  // Find the index of the highest prediction
  const maxIndex = predictions.indexOf(Math.max(...predictions));
  // Map the index to the corresponding label
  return LABELS[maxIndex];
}
