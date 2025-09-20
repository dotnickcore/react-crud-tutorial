const express = require('express');
import cors from 'cors'
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

app.use('*', (req, res) => {
    res.status(404).json({
        message: `${req.originalUrl} - Route Not Found`,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});