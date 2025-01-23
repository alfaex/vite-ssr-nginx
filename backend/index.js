const express = require('express');

const app = express();
const port = 3000;

const db = {
  config: {
    "potato.local": {
      title: "Potato Inc."
    },
    "tomato.local": {
      title: "Fresh Grown Tomatos Ltd"
    }
  }
}

app.get('/api/config', (req, res) => {

  const domain = req.hostname;
  const config = db.config[domain] || { title: "Default Title" };

  res.json(config);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
