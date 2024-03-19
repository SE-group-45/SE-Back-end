const express = require('express');
const mongoose = require('mongoose');
const Product =require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express()
const cors = require('cors')


app.use(cors({
    origin: 'http://localhost:5173' // Replace with your React app's origin
  }));


// this is middleware: what format this page can take i requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routs
app.use("/api/products",productRoute);

// delete product by id
app.delete('/api/products/:id', async (req, res) => {
    try{
        const {id}=req.params;
        const product =await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        // check if the product has updated
        res.status(200).json({message: "Product deleted successfully"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

// delete product by name
app.delete('/api/products/delete-by-name',productRoute );

// add a product
app.post('/api/products',productRoute);

// change a single product
app.put('/api/products/:id', productRoute);

// get all products
app.get('/api/products',productRoute);

// connect to db then run server
mongoose.connect('mongodb+srv://admim:8D3GfGvMotzbZu8R@backenddb.na7kj3j.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {

        app.listen(3000, () => {
            console.log('server listening on port 3000 ');

        })
        console.log('Connected!')

    })
    .catch(() => console.log('Failed'));








    // notes
    // look into headers to manage data sent