const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Lumi Node.js Webhook Server is healthy and active.' });
});

app.post('/webhook/sync', (req, res) => {
  try {
    const eventData = req.body;
    console.log('Received secure webhook event:', eventData);
    
    // Process backend sync or trigger notifications here
    res.status(200).json({ success: true, message: 'Webhook processed successfully.' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Lumi Webhook Server running securely on port ${PORT}`);
});
