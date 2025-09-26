const express = require('express');
const cors = require('cors');
const db = require('./models');
const { Op } = require("sequelize");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- API Routes ---

// GET endpoint for inventory (with filtering)
app.get('/api/inventory', async (req, res) => {
  try {
    const { maxPrice, maxMileage, color } = req.query;
    const whereClause = {}; 

    if (maxPrice) whereClause.listingPrice = { [Op.lte]: parseInt(maxPrice) };
    if (maxMileage) whereClause.kms_on_odometer = { [Op.lte]: parseInt(maxMileage) };
    if (color) whereClause.color = color;
    
    const cars = await db.MarketplaceInventory.findAll({
      where: whereClause,
      include: [{ model: db.OemSpec }]
    });
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching inventory.' });
  }
});

// GET endpoint to search for specific OEM Specs
app.get('/api/oem-specs/search', async (req, res) => {
  try {
    const { make, model_name, model_year } = req.query;

    if (!make || !model_name || !model_year) {
        return res.status(400).json({ message: 'Missing required search parameters: make, model_name, model_year.' });
    }

    const queryOptions = {
      where: {
        make: make,
        model_name: model_name,
        model_year: parseInt(model_year)
      }
    };

    const specs = await db.OemSpec.findAll(queryOptions);

    if (specs.length > 0) {
      res.json(specs);
    } else {
      res.status(404).json({ message: 'No matching OEM specs found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching for OEM specs.' });
  }
});

// POST endpoint
app.post('/api/inventory', async (req, res) => {
  try {
    const dealer = await db.Dealer.findOne();
    const oemSpec = await db.OemSpec.findOne(); 

    if (!dealer || !oemSpec) {
      return res.status(400).json({ message: "No dealers or OEM specs found. Please seed the database first." });
    }
    
    const newCarData = {
      ...req.body,
      dealer_id: dealer.id,
      oem_spec_id: oemSpec.id,
    };
    const car = await db.MarketplaceInventory.create(newCarData);
    res.status(201).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding new car.' });
  }
});

// PUT endpoint
app.put('/api/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.MarketplaceInventory.update(req.body, {
      where: { id: id }
    });

    if (updated) {
      const updatedCar = await db.MarketplaceInventory.findOne({ where: { id: id } });
      res.status(200).json(updatedCar);
    } else {
      res.status(404).json({ message: 'Car not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating car.' });
  }
});

// DELETE endpoint
app.delete('/api/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.MarketplaceInventory.destroy({
      where: { id: id }
    });
    
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Car not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting car.' });
  }
});


// --- Database Connection and Server Start ---
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Connection to the database has been established successfully.');
    
    await db.sequelize.sync({ alter: true });
    console.log('✅ All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database or start server:', error);
  }
}

startServer();