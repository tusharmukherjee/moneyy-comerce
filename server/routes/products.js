const router = require("express").Router();
const {ProductsModel} = require("../sqlDB/models/productsModel");
const {ReviewModel} = require("../sqlDB/models/reviewModel");


// [x] WORKING...
router.post("/addproduct", async (req, res) => {
    try {
        // const {productId, name, product_description, price} = await req.body;
        await ProductsModel.query().insert(req.body).from('products');
        res.send({
            status:true,
            msg: 'Product Added 👍',

        })

        
    } catch (error) {

        console.log(error);
        
    }
});


// [x] WORKING...
router.get("/getallproducts", async (req,res) => {
    try {

        const allProducts = await ProductsModel.query().select('productId', 'name', 'price','imagelink').from('products');
        res.send(allProducts);

        
    } catch (error) {
        
    }
});



// [x] WORKING...
router.post("/geteditproduct", async (req,res)=> {
    try {

        const singleProduct = await ProductsModel.query().select('products.productId', 'products.name', 'products.product_description', 'products.price', 'products.imagelink')
        .where('products.productId','=',req.body.productId)
        .from('products');

        res.send(singleProduct);
        // review left

        
    } catch (error) {

        console.log(error);
        
    }
});



// [x] WORKING...
router.post("/getsingleproduct", async (req,res)=> {
    try {

        const singleProduct = await ProductsModel.query().select('productId', 'name', 'product_description', 'price', 'imagelink')
        .from('products')
        .where('productId','=',req.body.productId);


        const reviews = await ReviewModel.query().select('review_id','description', 'userId', 'username')
        .from('review')
        .leftJoin('users',function(){
            this.on('review.user_id', '=', 'users.userId')
        })
        .where('product_id','=',req.body.productId)
        .orderBy('review.created_at',"desc");

        res.send({
            product:singleProduct,
            reviews: reviews
        });
        // review left

        
    } catch (error) {

        console.log(error);
        
    }
});


// [x] WORKING... 
router.put("/updateproduct", async (req,res) => {
    try {

        // const updatedData = await req.body;
        await ProductsModel.query().where('productId','=',req.body.productId).update(req.body).from('products');
        console.log(req.body)
        res.send({
            status: true,
            msg: "Product Updated 👍"
        });

        
    } catch (error) {
        console.log(error);
    }
});


// [x] WORKING... 
router.delete("/deleteproduct", async (req,res) => {
    try {

        await ProductsModel.query().where('productId','=',req.body.productId).delete().from('products');
        res.send({
            status: true,
            msg: "Product Deleted 👍"
        });

        
    } catch (error) {

        console.log(res.send(error));
        
    }
});


// [x] WORKING...
router.post("/addreview", async (req,res) => {
    try {

        await ReviewModel.query().insert(req.body).from('review');
        res.send({
            status:true,
            msg:"Review Added 👍"
        });

        
    } catch (error) {

        console.log(error);
        
    }
});

// [x] WORKING.. 
router.delete("/deletereview", async (req,res) => {
    try {

        await ReviewModel.query().where('review_id','=',req.body.review_id).delete().from('review');
        res.send({
            status:true,
            msg:"Review Deleted 👍"
        });


        
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;