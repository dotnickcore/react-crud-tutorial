const express = require('express');
const cors = require('cors');
const app = express();
const teamRoutes = require('./routes/teamRoutes')
const positionRoutes = require('./routes/positionRoutes')
const playerRoutes = require('./routes/playerRoutes')

// Middleware
app.use(cors());
app.use(express.json());

// teams route
app.use("/api/v1/players", playerRoutes);

// teams route
app.use("/api/v1/teams", teamRoutes);

// positions route
app.use("/api/v1/positions", positionRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});