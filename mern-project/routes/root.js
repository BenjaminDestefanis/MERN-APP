const express = require('express')
const router = express.Router()
const path = require('path')


//Aqui estamos usando Regex para expresar la ruta que va a encontrar
router.get('^/$|/index(.html)?', (req, res) => {
    //una ves obtenga el archivo dara una respuesta sirviendo el documento html
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router;