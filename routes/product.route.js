const express = require('express');
const { getAllSuggestions, createSuggestion } = require('../controllers/product.controller');
const router = express.Router();

router.get('/', getAllSuggestions);
router.post('/', createSuggestion);

module.exports = router;
