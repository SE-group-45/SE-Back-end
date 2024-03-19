const Product = require("../models/product.model.js");





const getProducts = async (req, res) => {
    
        try{
            const products =await Product.find({});
            res.status(200).json(products);
            console.log('recieved');
        }
        catch(err){
            res.send({type:'emp'})
            res.status(500).json({message: err.message});
        }
}


const changeProduct = async (req, res) => {
    try{
        const {id}=req.params;
        const product =await Product.findByIdAndUpdate(id,req.body);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        // check if the product has updated
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};


const createProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch(err) {
        res.status(500).json(product)
    }
};

const deleteProduct = async (req, res) => {
    try {
      const { name } = req.body; // Destructure name from the request body
  
      if (!name) {
        return res.status(400).json({ message: "Missing required field: name" });
      }
  
      const deletedProduct = await Product.deleteOne({ name }); // Delete by name
  
      if (deletedProduct.deletedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while deleting the product" });
    }
  };
  


module.exports = {
    getProducts,
    createProduct,
    changeProduct,
    deleteProduct
};