const express = require("express");
const app = express();
const PORT = 3000;

const getColor = (status) => {
	if (status >= 500) return "#d32f2f";
	if (status >= 400) return "#f57c00";
	if (status >= 300) return "#1976d2";
	if (status >= 200) return "#388e3c";
	return "#546e7a";
};

const generateHtml = (statusCode, message = null, randomColor = false) => {
	const backgroundColor = randomColor ? `hsl(${Math.floor(Math.random() * 360)}, 70%, 45%)` : getColor(statusCode);
	const messageHtml = message
		? `<p style="font-size: 2vw; margin-top: 2rem; text-shadow: 2px 2px 5px rgba(0,0,0,0.3);">${message}</p>`
		: "";

	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Status ${statusCode}</title>
        <style>
            body { 
                background-color: ${backgroundColor}; 
                color: white; 
                font-family: sans-serif;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                text-align: center;
            }
            h1 { 
                font-size: 15vw; 
                text-shadow: 4px 4px 10px rgba(0,0,0,0.3);
                margin: 0;
            }
        </style>
    </head>
    <body>
        <h1>${statusCode}</h1>
        ${messageHtml}
    </body>
    </html>
  `;
};

app.get("/:statusCode", (req, res) => {
	const statusCode = parseInt(req.params.statusCode, 10);

	if (Number.isNaN(statusCode)) {
		return res
			.status(400)
			.send(
				generateHtml(
					400,
					"Invalid status code. Please use a number between 100 and 599.",
				),
			);
	}
	if (statusCode < 100 || statusCode > 599) {
		return res
			.status(statusCode)
			.send(generateHtml(statusCode, "Non standard status code!", true));
	}

	res.status(statusCode).send(generateHtml(statusCode));
});

app.get("/", (_, res) => {
	res
		.status(200)
		.send(
			generateHtml(
				200,
				"Welcome! Try navigating to /200, /404, /500, etc., to test different status codes.",
			),
		);
});

app.listen(PORT, () => {
	console.log(` Server running at http://localhost:${PORT}`);
});
