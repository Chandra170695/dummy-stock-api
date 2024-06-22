const express = require('express');
const app = express();
const cors = require('cors');
const { differenceInDays, addDays, format } = require('date-fns');

app.use(cors())

function generateDummyStockData() {
    const startDate = new Date('2024-06-01');
    const endDate = new Date('2024-06-30');
    const days = differenceInDays(endDate, startDate);
    const data = [];
  
    for (let i = 0; i <= days; i++) {
      const currentDate = addDays(startDate, i);
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      
      // Generate open price (between 100 and 200 with more variation)
      const open = (Math.random() * (200 - 100) + 100 + Math.random() * 50).toFixed(2);
      
      // Generate high price (slightly higher than open with variation)
      const high = (parseFloat(open) + Math.random() * 10 + Math.random() * 5).toFixed(2);
      
      // Generate low price (slightly lower than open with variation)
      const low = (parseFloat(open) - Math.random() * 10 - Math.random() * 5).toFixed(2);
      
      // Generate close price (between low and high with variation)
      const close = (Math.random() * (parseFloat(high) - parseFloat(low)) + parseFloat(low) + Math.random() * 10 - Math.random() * 10).toFixed(2);
      
      // Generate volume (between 1,000,000 and 10,000,000 with variation)
      const volume = Math.floor(Math.random() * 9000000 + 1000000);
  
      data.push({
        date: formattedDate,
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
        volume: volume
      });
    }
  
    return data;
  }
  

// Endpoint to fetch dummy stock data
app.get('/api/dummy-stock-data', (req, res) => {
  const dummyStockData = generateDummyStockData();
  res.json(dummyStockData);
});

// Start the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Dummy Stock API server listening at http://localhost:${PORT}`);
});
