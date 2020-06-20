const express = require('express')
const { readFile, appendFile, unlink } = require('fs').promises

const router = express.Router()
const request = require('request')

function addCurrentlyPrise(arrayProduct, objectCurrently) {
  return arrayProduct.map((item) => {
    const prise = item.price
    const arreyCurr = Object.entries(objectCurrently)
    const newArreyCurr = arreyCurr.map((it) => [it[0], (it[1] * prise).toFixed(2)])
    const newObjPrise = Object.fromEntries(newArreyCurr)
    return { ...item, price: newObjPrise, currency: 'EUR', quantityInBusket: 0 }
  })
}

// /api/webstore/v1/list
router.get('/list', async (req, res) => {
  const linc = 'https://api.exchangeratesapi.io/latest?symbols=USD,CAD'
  const adresFile = `${__dirname}/list.json`

  try {
    request(linc, async (error, response, body) => {
      const obj = JSON.parse(body)
      const objectCurrently = { ...obj.rates, [obj.base]: 1 }

      const arrey = await readFile(adresFile, { encoding: 'utf8' })
      const arrayProduct = JSON.parse(arrey)

      const resultProductList = addCurrentlyPrise(arrayProduct, objectCurrently)

      res.json(resultProductList)
    })
  } catch (error) {
    res.json('not file')
  }
})

// POST /api/webstore/v1/logs
router.post('/logs', async (req, res) => {
  const adresFile = `${__dirname}/logger.json`
  await appendFile(adresFile, req.body.message, (error) => {
    if (error) throw error
  })
  res.end()
})

// GET /api/webstore/v1/logs
router.get('/logs', async (req, res) => {
  const adresFile = `${__dirname}/logger.json`
  const data = await readFile(adresFile, 'utf8')
  res.json({ message: data })
})

// DELETE /api/webstore/v1/logs
router.delete('/logs', async (req, res) => {
  const adresFile = `${__dirname}/logger.json`
  unlink(adresFile)
  res.end()
})

router.use((req, res) => {
  res.send('API webstore v1 not founde...')
})

module.exports = router
