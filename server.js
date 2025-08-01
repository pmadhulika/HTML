const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-bus-tracker';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Bus Schema
const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    startingPoint: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['On Time', 'Delayed', 'Left'],
        default: 'On Time'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Bus = mongoose.model('Bus', busSchema);

// Routes

// Get all buses
app.get('/api/buses', async (req, res) => {
    try {
        const buses = await Bus.find().sort({ busNumber: 1 });
        res.json(buses);
    } catch (error) {
        console.error('Error fetching buses:', error);
        res.status(500).json({ error: 'Failed to fetch buses' });
    }
});

// Get a specific bus
app.get('/api/buses/:busNumber', async (req, res) => {
    try {
        const bus = await Bus.findOne({ busNumber: req.params.busNumber });
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }
        res.json(bus);
    } catch (error) {
        console.error('Error fetching bus:', error);
        res.status(500).json({ error: 'Failed to fetch bus' });
    }
});

// Update bus status
app.post('/api/buses/update', async (req, res) => {
    try {
        const { busNumber, status } = req.body;
        
        if (!busNumber || !status) {
            return res.status(400).json({ error: 'Bus number and status are required' });
        }
        
        if (!['On Time', 'Delayed', 'Left'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        
        const bus = await Bus.findOneAndUpdate(
            { busNumber: busNumber },
            { 
                status: status,
                lastUpdated: new Date()
            },
            { new: true }
        );
        
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }
        
        console.log(`✅ Bus ${busNumber} status updated to: ${status}`);
        res.json({ message: 'Bus status updated successfully', bus });
    } catch (error) {
        console.error('Error updating bus status:', error);
        res.status(500).json({ error: 'Failed to update bus status' });
    }
});

// Create a new bus (for admin purposes)
app.post('/api/buses', async (req, res) => {
    try {
        const { busNumber, startingPoint, destination, arrivalTime, departureTime, status } = req.body;
        
        if (!busNumber || !startingPoint || !destination || !arrivalTime || !departureTime) {
            return res.status(400).json({ error: 'All bus details are required' });
        }
        
        const existingBus = await Bus.findOne({ busNumber });
        if (existingBus) {
            return res.status(400).json({ error: 'Bus with this number already exists' });
        }
        
        const bus = new Bus({
            busNumber,
            startingPoint,
            destination,
            arrivalTime,
            departureTime,
            status: status || 'On Time'
        });
        
        await bus.save();
        console.log(`✅ New bus added: ${busNumber}`);
        res.status(201).json({ message: 'Bus created successfully', bus });
    } catch (error) {
        console.error('Error creating bus:', error);
        res.status(500).json({ error: 'Failed to create bus' });
    }
});

// Delete a bus (for admin purposes)
app.delete('/api/buses/:busNumber', async (req, res) => {
    try {
        const bus = await Bus.findOneAndDelete({ busNumber: req.params.busNumber });
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }
        
        console.log(`✅ Bus deleted: ${req.params.busNumber}`);
        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        console.error('Error deleting bus:', error);
        res.status(500).json({ error: 'Failed to delete bus' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚌 College Bus Tracker Server running on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
    console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;