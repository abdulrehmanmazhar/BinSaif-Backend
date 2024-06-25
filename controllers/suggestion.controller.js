const product = require('../models/suggestion.model');

module.exports = {
    getAllSuggestions: async (req, res) => {
        try {
            const cardInfo = await product.find();
            res.status(200).json(cardInfo);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    createSuggestion: async (req, res) => {
        try {
            const newSuggestion = new product({
                suggestion: req.body.suggestion
            });
            // console.log(req.body.suggestion)
            const savedSuggestion = await newSuggestion.save();
            res.status(201).json(savedSuggestion);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
};
