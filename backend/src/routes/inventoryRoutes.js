const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/inventory', inventoryController.getInventory);
router.post('/inventory/reload', inventoryController.reloadInventory);
router.post('/inventory/add', inventoryController.addInventoryItem);

module.exports = router;
