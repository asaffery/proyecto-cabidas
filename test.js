// server.js
const express = require('express');
const app = express();
app.use(express.json());            // parse JSON bodies

// create a mini-router for “myFunc”
const router = express.Router();

// 1) /myFunc/io  →  returns the inputs/outputs schema
router.post('/io', (req, res) => {
  res.json({
    // Hops expects an array of “components” (we have just one)
    components: [
      {
        // an identifier for this function
        id: 'myFunc',
        name: 'My Function',
        // define each input: name must match what you’ll add in GH
        inputs: [
          { name: 'x', nickname: 'X', type: 'Number', access: 'item' },
          { name: 'y', nickname: 'Y', type: 'Number', access: 'item' }
        ],
        // define each output
        outputs: [
          { name: 'sum', nickname: 'Sum', type: 'Number', access: 'item' }
        ]
      }
    ]
  });
});

// 2) /myFunc/solve  →  gets called once you’ve wired all inputs
router.post('/solve', (req, res) => {
  // Hops sends you back the same “id” and the “values” map
  const { id, values } = req.body;
  const { x, y } = values;

  // your actual logic
  const sum = x + y;

  // Hops expects an array of results, each with an “id” + “values” map
  res.json([
    {
      id: id,
      values: { sum }
    }
  ]);
});

// mount at /myFunc
app.use('/myFunc', router);

app.listen(3000, () => {
  console.log('Hops-JS prototype listening at http://localhost:3000/myFunc');
});
