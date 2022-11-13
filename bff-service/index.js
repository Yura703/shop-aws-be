const express = require('express');
require('dotenv').config();
const axios = require ('axios').default;

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.all('/*', async (req, res) => {
  const { method, path, originalUrl, body, headers } = req;
  const destination = path.split('/')[1];
  const targetEndpoint = process.env[destination];

  const recipient = req.originalUrl.split('/')[1];
  const recipientURL = process.env[recipient];


  if (recipientURL) {
    const axiosConfig = {
      method: req.method,
      url: recipientURL + req.originalUrl,
      ...(Object.keys(req.body || {}).length > 0 && {data: req.body})
    };

    axios(axiosConfig).then((response) => {
      res.json(response.data);
    }).catch((err) => {
      if(err) {
        const { status, data } = err.response;

        res.status(status).json(data);
      } else {
        res.status(500).json({error: err.message});
      }
    });   
  } else {
    res.status(502).json({ error: 'Cannot process request' });
  };
});

  app.listen(PORT, () => {
    console.log(`APP listening at http://localhost:${PORT}`);
  });
