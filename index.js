import express from 'express';

//authentication
import session from 'express-session';

//cookie parser
import cookieParser from 'cookie-parser';

import ejsLayouts from 'express-ejs-layouts';

import path from 'path';

import ProductsController from './src/controllers/product.controller.js';

import userController from './src/controllers/user.controller.js';

import validationMiddleware from './src/middlewares/validation.middleware.js';

import { uploadFile } from './src/middlewares/fileUpload.middleware.js';

import { auth } from './src/middlewares/auth.middleware.js';

import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';

const app = express();

//static files
app.use(express.static('public'));

//Creating layouts.
app.use(ejsLayouts);

//parse the data
app.use(express.urlencoded({ extended: true }));

const productsController =  new ProductsController();

const usersController = new userController();

//setting up ejs view engine
app.set('view engine', 'ejs');

//path of the view engine which is set up by ejs..
app.set('views',path.join(path.resolve(), 'src', 'views'));


//using session
app.use(session({
  secret:'SecretKey',
  resave:'false',
  saveUninitialized:'true',
  cookie:{secure:false}
}));

//using cookie parser
app.use(cookieParser());
app.use(setLastVisit);

app.get('/register',usersController.getRegister);

app.post('/register',usersController.postRegister);
 
app.get('/login',usersController.getLogin);

app.post('/login',usersController.postLogin);

app.get('/logout',usersController.logout);

app.get('/',auth,productsController.getProducts);

app.get('/add-product',auth,productsController.getAddProduct);

// imageUrl is the name given in new-product.ejs file. That name should be written below...
app.post('/',uploadFile.single('imageUrl'),validationMiddleware,productsController.postAddProduct);

app.get('/update-product/:id',auth,productsController.getUpdateProductView);

app.post('/update-product',auth,productsController.postUpdateProduct);

app.post('/delete-product/:id',auth,productsController.deleteProductView);



app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
