import MICRScanner from './MICRScanner.js';

let scanner = null;
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
let output = document.getElementById('output');

// run after openCV is ready
const openCvReady = () => {
	scanner = new MICRScanner(cv);

	const img = document.createElement('canvas');
	document.body.appendChild(img);

	// load the image when one is selected
	inputElement.addEventListener('change', (e) => {
		imgElement.src = URL.createObjectURL(e.target.files[0]);
	}, false);

	// scan the image when loaded
	imgElement.onload = scanImage;

	//validate the default image
	scanImage();
};

// here's where the magic happens. =D
const scanImage = async () => {
	const start = Date.now();
	let mat = cv.imread(imgElement);
	output.textContent = `Found "${scanner.scanImage(mat).join(' ')}" in ${Date.now() - start} milliseconds.`;
	mat.delete();
};

// https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
window.Module = {
	onRuntimeInitialized: openCvReady
};
// load openCv
const script = document.createElement('script');
script.src = 'https://docs.opencv.org/4.7.0/opencv.js';
document.body.appendChild(script);
