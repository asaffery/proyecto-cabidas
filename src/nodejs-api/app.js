const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const HOPS_ENDPOINT = 'http://localhost:3000/your-hops-endpoint'; // change this later

// POST /generate
app.post('/generate', upload.fields([{ name: 'terrain' }, { name: 'buildable' }]), async (req, res) => {
  try {
    const { param1, param2 } = req.body;

    const terrainFile = req.files['terrain'][0];
    const buildableFile = req.files['buildable'][0];

    const terrainData = fs.readFileSync(path.resolve(terrainFile.path), 'utf8');
    const buildableData = fs.readFileSync(path.resolve(buildableFile.path), 'utf8');

    const ghRequest = {
      values: [
        {
          ParamName: "TerrainVector",
          InnerTree: {
            "{0;}": [{ "type": "System.String", "data": terrainData }]
          }
        },
        {
          ParamName: "BuildableVector",
          InnerTree: {
            "{0;}": [{ "type": "System.String", "data": buildableData }]
          }
        },
        {
          ParamName: "Param1",
          InnerTree: {
            "{0;}": [{ "type": "System.Double", "data": Number(param1) }]
          }
        },
        {
          ParamName: "Param2",
          InnerTree: {
            "{0;}": [{ "type": "System.Double", "data": Number(param2) }]
          }
        }
      ]
    };

    const computeResponse = await axios.post(HOPS_ENDPOINT, ghRequest);

    res.json({
      success: true,
      result: computeResponse.data
    });

  } catch (error) {
    console.error('Error during /generate:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NodeJS API running at http://localhost:${PORT}`);
});