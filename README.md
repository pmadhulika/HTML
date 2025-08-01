# 🚌 College Bus Tracker

A real-time college bus tracking system with clean UI and automatic status updates. Built with HTML, CSS, Node.js, Express, and MongoDB.

## ✨ Features

- **Real-time Bus Tracking**: Live status updates every 5 seconds
- **Clean Mobile-Friendly UI**: Responsive design optimized for daily student use
- **Color-Coded Status Indicators**:
  - 🟢 **Green**: On Time
  - 🟡 **Yellow**: Delayed  
  - 🔴 **Red**: Left
- **Admin Panel**: Easy status updates for drivers and administrators
- **Auto-refresh**: Automatic data synchronization
- **MongoDB Integration**: Persistent data storage

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd college-bus-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env` file and update MongoDB URI if needed
   - Default: `mongodb://localhost:27017/college-bus-tracker`

4. **Seed the database with sample data**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Visit: `http://localhost:3000`

## 📱 Usage

### For Students
- Open the homepage to view all bus statuses
- Real-time updates every 5 seconds
- Mobile-optimized for quick checking on phones
- Color-coded status badges for quick recognition

### For Drivers/Admins
- Click "Admin Panel" button
- Select bus number from dropdown
- Choose new status (On Time, Delayed, Left)
- Submit to update the database

## 🗄️ MongoDB Schema

```json
{
  "busNumber": "B5",
  "route": "Hostel → Campus", 
  "departureTime": "08:15 AM",
  "arrivalTime": "09:00 AM",
  "status": "On Time"
}
```

## 🛠️ API Endpoints

- `GET /api/buses` - Get all buses
- `GET /api/buses/:busNumber` - Get specific bus
- `POST /api/buses/update` - Update bus status
- `POST /api/buses` - Create new bus (admin)
- `DELETE /api/buses/:busNumber` - Delete bus (admin)
- `GET /api/health` - Health check

## 📦 Project Structure

```
college-bus-tracker/
├── index.html          # Main frontend page
├── styles.css          # Responsive CSS styles
├── server.js           # Express server with API routes
├── seed-data.js        # Database seeding script
├── package.json        # Dependencies and scripts
├── .env               # Environment configuration
└── README.md          # This file
```

## 🎨 Design Features

- **Modern Glass-morphism UI**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Beautiful color transitions
- **Responsive Grid Layout**: Adapts to all screen sizes
- **Smooth Animations**: Hover effects and transitions
- **Typography**: Clean Inter font family
- **Color Psychology**: Intuitive status color coding

## 🔧 Configuration

### Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/college-bus-tracker
PORT=3000
NODE_ENV=development
```

### Auto-refresh Settings

The frontend automatically refreshes bus data every 5 seconds. To modify:

```javascript
// In index.html, change the interval (in milliseconds)
refreshInterval = setInterval(fetchBuses, 5000); // 5 seconds
```

## 🚀 Deployment

### Local Deployment
```bash
npm start
```

### Production Deployment
1. Set `NODE_ENV=production` in `.env`
2. Update `MONGODB_URI` to your production database
3. Deploy to your preferred platform (Heroku, Vercel, AWS, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📋 Sample Data

The application comes with 10 sample buses (B1-B10) covering various campus routes:
- Main Gate ↔ Engineering Block
- Hostel ↔ Campus
- Metro Station ↔ College
- Sports Complex ↔ Cafeteria
- And more...

## 🛡️ Error Handling

- Graceful API error handling
- User-friendly error messages
- Automatic retry mechanisms
- Connection status indicators

## 📱 Mobile Optimization

- Touch-friendly interface
- Optimized for portrait and landscape modes
- Fast loading and minimal data usage
- Offline-friendly design patterns

## 🔄 Status Updates

Bus statuses can be updated through:
1. **Web Interface**: Admin panel on the homepage
2. **API Calls**: Direct POST requests to `/api/buses/update`
3. **Database**: Direct MongoDB updates

---

**Happy Commuting! 🚌✨**