const app = require('./config/server')
const connection = require('./config/db');
const rutas = require('./app/routes/inventory')
//require('./app/routes/navigation')(app);
rutas(app);

app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto:", app.get('port'));

})