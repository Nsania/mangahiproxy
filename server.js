const express = require('express');
const needle = require('needle'); // Import the needle library
const cors = require('cors');
const app = express();
const port = 3000;
const url = require('url');
const cheerio = require('cheerio');
const axios = require('axios');

app.use(cors());

app.get('/manga-proxy', async (req, res) => {
    try {
        const baseURL = 'https://api.mangadex.org/manga';

        const params = new URLSearchParams({
            ...url.parse(req.url, true).query
        });

        const response = await needle('get', `${baseURL}?${params}`); // Use needle to make the GET request
        const data = response.body; // Get the response body
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from MangaDex API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/cover-proxy', async (req, res) => {
    try {
        const baseURL = 'https://api.mangadex.org/cover';

        const params = new URLSearchParams({
            ...url.parse(req.url, true).query
        });

        const response = await needle('get', `${baseURL}?${params}`); // Use needle to make the GET request
        if (response.statusCode === 200)
        {
            // If the request is successful, set the appropriate headers
            // and send the image data as a buffer
            res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on the image type
            res.send(response.body);
        }
        else
        {
            // If the request is not successful, log an error message and send an error response
            console.error('Error fetching image:', response.statusMessage);
            res.status(response.statusCode).send(response.statusMessage);
        }
    }
    catch (error)
    {
        console.error('Error fetching data from MangaDex API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/chapters-proxy', async (req, res) => {
    try {
        const baseURL = 'https://api.mangadex.org/manga';

        const params = new URLSearchParams(url.parse(req.url, true).query);
        console.log(params)
        const mangaID = params.get("mangaID");
        params.delete("mangaID");
        const chaptersURL = `${baseURL}/${mangaID}/feed?${params}`
        console.log(`URL: ${baseURL}/${mangaID}/feed?${params}`)

        const response = await needle('get', chaptersURL); // Use needle to make the GET request
        const data = response.body; // Get the response body
        res.json(data);
    }
    catch (error)
    {
        console.error('Error fetching data from MangaDex API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/cover-source-proxy', async (req, res) => {
    try {
        const baseURL = 'https://uploads.mangadex.org/covers'; // Base URL for the original images

        // Parse query parameters from the request URL
        const params = new URLSearchParams(url.parse(req.url, true).query);

        // Extract the mangaID and coverID from the query parameters
        const mangaID = params.get("mangaID");
        const coverFile = params.get("coverID");

        // Construct the URL of the original image
        const imageURL = `${baseURL}/${mangaID}/${coverFile}`;

        // Use needle to make a GET request to the original image URL
        const response = await needle('get', imageURL);

        if (response.statusCode === 200) {
            // If the request is successful, set the appropriate headers
            // and send the image data as a buffer
            res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on the image type
            res.send(response.body);
        } else {
            // If the request is not successful, log an error message and send an error response
            console.error('Error fetching image:', response.statusMessage);
            res.status(response.statusCode).send(response.statusMessage);
        }
    }
    catch (error)
    {
        // Handle any errors that occur during the process and send an error response
        console.error('Error fetching data from MangaDex API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/pages-proxy', async (req, res) => {
    try
    {
        const baseURL = 'https://api.mangadex.org/at-home/server'; // Base URL for the original images

        // Parse query parameters from the request URL
        const params = new URLSearchParams(url.parse(req.url, true).query);
        console.log(params);

        // Extract the mangaID and coverID from the query parameters
        const mangaChapterID = params.get("mangaChapterID");

        // Construct the URL of the original image
        const pagesURL = `${baseURL}/${mangaChapterID}`;

        // Use needle to make a GET request to the original image URL
        const response = await needle('get', pagesURL);
        const data = response.body; // Get the response body
        res.json(data);
    }
    catch (error)
    {
        // Handle any errors that occur during the process and send an error response
        console.error('Error fetching data from MangaDex API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/pages-source-proxy', async (req, res) => {
    try {
        const baseURL = 'https://uploads.mangadex.org/data'; // Base URL for the original images

        // Parse query parameters from the request URL
        const params = new URLSearchParams(url.parse(req.url, true).query);

        // Extract the mangaID and coverID from the query parameters
        const hash = params.get("hash");
        const pageFile = params.get("pageFile");

        // Construct the URL of the original image
        const pageImageURL = `${baseURL}/${hash}/${pageFile}`;

        // Use needle to make a GET request to the original image URL
        const response = await needle('get', pageImageURL);

        if (response.statusCode === 200) {
            // If the request is successful, set the appropriate headers
            // and send the image data as a buffer
            res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on the image type
            res.send(response.body);
        } else {
            // If the request is not successful, log an error message and send an error response
            console.error('Error fetching image:', response.statusMessage);
            res.status(response.statusCode).send(response.statusMessage);
        }
    } catch (error) {
        // Handle any errors that occur during the process and send an error response
        console.error('Error fetching data from MangaDex API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/random-proxy', async (req, res) => {
    try
    {
        const baseURL = 'https://api.mangadex.org/manga/random'; // Base URL for the original images

        // Use needle to make a GET request to the original image URL
        const response = await needle('get', baseURL);
        const data = response.body; // Get the response body
        res.json(data);
    }
    catch (error)
    {
        // Handle any errors that occur during the process and send an error response
        console.error('Error fetching data from MangaDex API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/*
app.get('/trending', async (req, res) => {
    try
    {
        const baseURL = "";

        const response = await needle('get', baseURL,);
        const data = response.body;
        res.json(data);
    }
    catch(error)
    {
        console.error("Error getting trending");
        res.status(500).json({error: 'Internal Server Error'});
    }
});
*/

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});

