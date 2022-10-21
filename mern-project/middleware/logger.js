const { format } = require('date-fns'); //Libreria para los datos de fechas
const { v4: uuid } = require('uuid')    //Generador de ID
const fs = require('fs');               //Modulo de node.js - para archivos (filesistem)
const fsPromises = require('fs').promises //promesas del modulo fs
const path = require('path') // path para el manejo de rutas

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try { //el try ejecuta una sentencia 
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){ //preguntamos si no tnemos el archivo en esa ruta
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs')) // e ncaso de no tenerlo , lo creamos
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) { 
        console.log(err)
    }
}



//aca em pieza el middleware

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()

}

module.exports = {logEvents, logger}