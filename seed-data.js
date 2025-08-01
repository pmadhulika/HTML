const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-bus-tracker';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Bus Schema (should match server.js)
const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    route: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
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

// Sample bus data
const sampleBuses = [
    {
        busNumber: "B1",
        route: "Main Gate → Engineering Block",
        departureTime: "07:30 AM",
        arrivalTime: "07:45 AM",
        status: "On Time"
    },
    {
        busNumber: "B2",
        route: "Hostel → Library",
        departureTime: "08:00 AM",
        arrivalTime: "08:15 AM",
        status: "On Time"
    },
    {
        busNumber: "B3",
        route: "Parking → Admin Block",
        departureTime: "08:30 AM",
        arrivalTime: "08:45 AM",
        status: "Delayed"
    },
    {
        busNumber: "B4",
        route: "Campus → City Center",
        departureTime: "09:00 AM",
        arrivalTime: "09:30 AM",
        status: "Left"
    },
    {
        busNumber: "B5",
        route: "Hostel → Campus",
        departureTime: "08:15 AM",
        arrivalTime: "09:00 AM",
        status: "On Time"
    },
    {
        busNumber: "B6",
        route: "Metro Station → College",
        departureTime: "07:00 AM",
        arrivalTime: "07:20 AM",
        status: "On Time"
    },
    {
        busNumber: "B7",
        route: "Sports Complex → Cafeteria",
        departureTime: "12:00 PM",
        arrivalTime: "12:10 PM",
        status: "Delayed"
    },
    {
        busNumber: "B8",
        route: "Medical Center → Hostel",
        departureTime: "06:00 PM",
        arrivalTime: "06:15 PM",
        status: "On Time"
    },
    {
        busNumber: "B9",
        route: "City Center → Campus",
        departureTime: "07:45 AM",
        arrivalTime: "08:15 AM",
        status: "On Time"
    },
    {
        busNumber: "B10",
        route: "Auditorium → Main Gate",
        departureTime: "05:30 PM",
        arrivalTime: "05:45 PM",
        status: "Left"
    }
];

async function seedDatabase() {
    try {
        // Clear existing data
        await Bus.deleteMany({});
        console.log('🗑️  Cleared existing bus data');

        // Insert sample data
        await Bus.insertMany(sampleBuses);
        console.log('✅ Successfully seeded database with sample bus data');
        
        // Display inserted data
        const buses = await Bus.find().sort({ busNumber: 1 });
        console.log('\n📋 Inserted buses:');
        buses.forEach(bus => {
            console.log(`${bus.busNumber}: ${bus.route} | ${bus.departureTime} → ${bus.arrivalTime} | Status: ${bus.status}`);
        });
        
        console.log(`\n🚌 Total buses: ${buses.length}`);
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        // Close connection
        mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
    }
}

// Run the seed function
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase, Bus };