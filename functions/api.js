const express = require('express');
const router = express.Router();
const app = express();
const serverless = require('serverless-http');
const axios = require('axios');
const cheerio = require('cheerio');



router.get('/', (req, res) => {
res.json([
    {
        id: 1,
        name: 'John',
        email: 'onchoo1106@gmail.com',
    }
])
});

router.get('/JBscrape', async (req, res) => {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }
  
    try {
      const response = await axios.get(url);
      const html = response.data;
  
      const $ = cheerio.load(html);
  
      // Select the meta element using its attribute (e.g., name="price")
      const titleraw = $('meta[property="og:title"]');
      const imageraw = $('meta[property="og:image"]');
      const priceraw = $('meta[property="og:price:amount"]');
      const currencyraw = $('meta[property="og:price:currency"]');
      
      if (titleraw.length > 0 && imageraw.length > 0 && priceraw.length > 0 && currencyraw.length > 0) {
        const title = titleraw.attr('content');
        const image = imageraw.attr('content');
        const price = priceraw.attr('content');
        const currency = currencyraw.attr('content');
  
        res.status(200).json({ title, image,price,currency });
      } else {
        res.status(404).json({ error: 'Price meta element not found on the page' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to scrape data from the URL' });
    }
  });
  
  router.get('/AMZscrape', async (req, res) => {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }
  
    try {
      const response = await axios.get(url);
      const html = response.data;
  
      const $ = cheerio.load(html);
  
      
  
  
      const priceElement = $('.aok-offscreen');// -> work
      const price = priceElement.text().trim();
      const title = $('#productTitle').text().trim(); 
      const imgElement = $('#landingImage');
      const alt = imgElement.attr('alt');
      const src = imgElement.attr('src');
  
     
      //res.status(200).json({price,title}); only return title???
      if (price ) {
        
  
        res.status(200).json({price,title,alt,src}); //only return price???? -> nvm works
  
      } else {
        res.status(404).json({ error: 'Price meta element not found on the page' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to scrape data from the URL' });
    }
  });
  
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);

//https://www.youtube.com/watch?v=8x0Dty5D6CA&t=177s
//follow this instructiron
//https://westpacbackend.netlify.app/.netlify/functions/api
//"npm run bild" update the code


//https://westpacbackend.netlify.app/.netlify/functions/api/JBscrape?url=https://www.jbhifi.com.au/products/bose-quietcomfort-noise-cancelling-earbuds-ii-black
//works fine