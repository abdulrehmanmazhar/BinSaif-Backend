const product = require('../models/product.model');

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
        const{name, price, description, category,image, sale}=req.body;
        try {
            const newSuggestion = new product({
                // product: req.body.product
                name : name,
                price: price,
                description: description,
                category: category,
                image: image,
                sale: sale
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
