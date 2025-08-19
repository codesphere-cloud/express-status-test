const express = require("express");

const PORT = 3000;
const MIN_STATUS = 100;
const MAX_STATUS = 599;

const STATUS_COLORS = {
	500: "#d32f2f",
	400: "#f57c00",
	300: "#1976d2",
	200: "#388e3c",
	100: "#546e7a",
};

const getStatusColor = (status) => {
	for (const threshold of [500, 400, 300, 200, 100]) {
		if (status >= threshold) return STATUS_COLORS[threshold];
	}
	return STATUS_COLORS[100];
};

const getRandomColor = () =>
	`hsl(${Math.floor(Math.random() * 360)}, 70%, 45%)`;

const createPage = (statusCode, message = "", useRandomColor = false) => {
	const backgroundColor = useRandomColor
		? getRandomColor()
		: getStatusColor(statusCode);
	const messageElement = message ? `<p class="message">${message}</p>` : "";

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
            .message {
                font-size: 2vw;
                margin-top: 2rem;
                text-shadow: 2px 2px 5px rgba(0,0,0,0.3);
            }
        </style>
    </head>
    <body>
        <h1>${statusCode}</h1>
        ${messageElement}
    </body>
    </html>`;
};

const isValidStatus = (status) => !Number.isNaN(status);
const isStandardStatus = (status) =>
	status >= MIN_STATUS && status <= MAX_STATUS;

const app = express();

app.get("/", (_, res) => {
	const welcomeMessage =
		"Welcome! Try navigating to /200, /404, /500, etc., to test different status codes.";
	res.status(200).send(createPage(200, welcomeMessage));
});

app.get("/:statusCode", (req, res) => {
	const statusCode = parseInt(req.params.statusCode, 10);

	if (!isValidStatus(statusCode)) {
		const errorMessage =
			"Invalid status code. Please use a number between 100 and 599.";
		return res.status(400).send(createPage(400, errorMessage));
	}

	if (!isStandardStatus(statusCode)) {
		const nonStandardMessage = "Non standard status code!";
		return res
			.status(statusCode)
			.send(createPage(statusCode, nonStandardMessage, true));
	}

	res.status(statusCode).send(createPage(statusCode));
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
