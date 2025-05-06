// server.js
const express = require('express');
const app = express();
app.use(express.json());

// 1) /pointat/io → component schema
app.get('/pointat/io', (req, res) => {
  res.json({
    components: [
      {
        id: 'pointat',
        name: 'PointAt',
        nickname: 'PtAt',
        description: 'Get point along curve',
        category: 'Hops',
        subcategory: 'Hops JS',
        inputs: [
          { name: 'Curve', nickname: 'C', description: 'Curve to evaluate', type: 'Curve', access: 'item' },
          { name: 't',     nickname: 't', description: 'Parameter on Curve',       type: 'Number','access': 'item', default: 0.0 }
        ],
        outputs: [
          { name: 'P',     nickname: 'P', description: 'Point on curve at t',      type: 'Point',  access: 'item' }
        ]
      }
    ]
  });
});

// 2) /pointat/solve → run when inputs are wired
app.post('/pointat/solve', (req, res) => {
  const [{ id, values }] = Array.isArray(req.body) ? req.body : [req.body];
  // here you’d decode values.Curve into a rhino3dm.Curve, then:
  const t = values.t;
  // pretend we compute P = curve.PointAt(t)
  const P = { X: 1, Y: 2, Z: 3 }; // stub
  res.json([
    { id, values: { P } }
  ]);
});

app.listen(3000, () => console.log('Listening on http://localhost:3000/pointat'));
