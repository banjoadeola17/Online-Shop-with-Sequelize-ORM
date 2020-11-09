const Product = require('../models/product');

exports.getAddproduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product", 
        path:"/admin/add-product",
        editing: false
    });
};

exports.postAddproduct= (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user
    .createProduct({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    })
    .then(result => {
        console.log('created Product');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
};

exports.getEditproduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user
    .getProducts({where: {id: prodId}})
    //Product.findAll({where: {id: prodId}})
    .then(products => {
        const product = products[0];
        if(!product) {
            return res.redirect('/');
        }
        res.render("admin/edit-product", {
            pageTitle: "Edit Product", 
            path:"/admin/edit-product",
            editing: editMode,
            product: products[0]
        });
    }).catch(err => {
        console.log(err);
    });
        
};

exports.postEditproduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const UpdatedDesc = req.body.description;
    Product.findAll({where: {id: prodId}})
    .then(products => {
        products[0].title = updatedTitle;
        products[0].imageUrl = updatedImageUrl;
        products[0].price = updatedPrice;
        products[0].description = UpdatedDesc;
        return products[0].save();
    })
    .then(result => {
        console.log('UPDATED PRODUCTS!');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};


exports.getProducts = (req, res, next) => {
    req.user.getProducts()
    .then(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.destroy({where: {id: prodId}})
    .then(result => {
        console.log('Delete Product');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });  
};
 