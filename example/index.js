const http = require('http');
const fs = require('fs/promises');

const server = http.createServer(async (req, res) => {
	switch(req.url) {
		case '/': {
			res.end(`
				<!DOCTYPE html>
				<html>
					<head>
						<meta charset="utf-8">
						<title>MICR SCanner Example</title>
					</head>
					<body>
						<h1>MICR Scanner Example</h1>
						<fieldset>
							<legend> Upload a <strong>cropped</strong> check image</legend>
							<img id="imageSrc" alt="No Image" src="/example_check.png" />
							<div class="caption"><input type="file" id="fileInput" name="file" /></div>
						</fieldset>
						<fieldset>
							<legend>MICR Scanner Output</legend>
							<pre id="output"></pre>
						</fieldset>
						<script type="module" src="/app.js"></script>
					</body>
				</html>
			`);
			break;
		}
		case '/example_check.png': {
			res.setHeader('Content-Type', 'image/png');
			res.end(await fs.readFile('./example_check.png'));
			break;
		}
		case '/app.js': {
			res.setHeader('Content-Type', 'text/javascript');
			res.end(await fs.readFile('./app.js'));
			break;
		}
		case '/MICRScanner.js': {
			res.setHeader('Content-Type', 'text/javascript');
			res.end(await fs.readFile('../MICRScanner.js'));
			break;
		}
		default:
			res.end('');
	}
	
	
});

server.listen(12345, () => console.log(`Server running at: http://localhost:${server.address().port}/`));