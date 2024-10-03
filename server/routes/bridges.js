import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import BridgesController from '../controllers/bridges.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', BridgesController.getBridges)

router.get('/:bridgeId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/bridge.html'))
  })

  export default router

