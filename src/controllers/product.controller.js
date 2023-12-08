import ProductModel from '../models/product.model.js';

class ProductsController {
  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render('index', { products,userEmail:req.session.userEmail});
  }

  getAddProduct(req, res, next) {
    res.render('new-product', {
      errorMessage: null,
      userEmail:req.session.userEmail
    });
  }

  postAddProduct(req, res, next) {
    const {name,desc,price} = req.body;
    const imageUrl = "images/"+req.file.filename
    ProductModel.add(name,desc,price,imageUrl);
    var products = ProductModel.getAll();
    res.render('index', { products,userEmail:req.session.userEmail });
  }

  getUpdateProductView(req,res,next){
    // 1. if product exists then return view
    //params are used when we have used paramaters with the url update/:id;
    //so with the help of that we will fetch that id from the url
    
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if(productFound){
      res.render('update-product',{
        product:productFound,
        errorMessage:null,
        userEmail:req.session.userEmail
      });
    }
    // 2. else return errors. 
    else{
      res.status(401).send('Product Not Found!' );
    }
  }

  postUpdateProduct(req,res,next){
    ProductModel.update(req.body);
    var products = ProductModel.getAll();
    res.render('index');
  }

  deleteProductView(req,res,next){
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if(!productFound){
      return res.status(401).send('Product Not Found!'); 
    }
    ProductModel.delete(id);
    var products = ProductModel.getAll();
    return res.render('index');
  }
}



export default ProductsController;
