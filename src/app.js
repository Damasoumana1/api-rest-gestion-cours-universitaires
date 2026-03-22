const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const coursRoutes = require('./routes/cours.routes');
const etudiantRoutes = require('./routes/etudiant.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRoutes);
app.use('/api/cours', coursRoutes);
app.use('/api/etudiants', etudiantRoutes);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Endpoint introuvable' });
});

app.use(errorHandler);

module.exports = app;
