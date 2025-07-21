const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta de salud para Railway
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Sendas de Filosofía UNED está funcionando correctamente',
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// Manejo de errores 404
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
    console.error('Error del servidor:', err.stack);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: 'Por favor, inténtalo de nuevo más tarde'
    });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📚 Sendas de Filosofía UNED disponible en:`);
    console.log(`   - Local: http://localhost:${PORT}`);
    console.log(`   - Red: http://0.0.0.0:${PORT}`);
    console.log(`⏰ Iniciado: ${new Date().toISOString()}`);
});

// Manejo de cierre grácil
process.on('SIGTERM', () => {
    console.log('🛑 Cerrando servidor graciosamente...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Servidor interrumpido por el usuario');
    process.exit(0);
});
