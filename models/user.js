const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);



// price: {
//     type: Number,
//     ref: 'Product',
//     required: true
// },
// subtotal: {
//     type: Number,
//     required: true}

// let newPrice = product.price;
// let subTotal = newPrice;

// newPrice = this.cart.items[cartProductIndex].quantity * product.price;
// updatedCartItems[cartProductIndex].price = newPrice;
// subTotal = newQuantity * product.price;
// updatedCartItems[cartProductIndex].subtotal = subTotal;
    

// const mongodb = require('mongodb');
// // const getDb = require('../util/database').getDb;

// class User {
//     constructor (userName, email, cart, id) {
//         this.name = userName;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users')
//         .insertOne(this)
//         .then(user => {
//             console.log('Connected');
//         })
//         .catch(err => {console.log(err)});
//     }


//     addOrder() {
//          
//     }

//     getOrders() {
//         const db = getDb();
//         return db.collection('orders').find({'user._id': new mongodb.ObjectId(this._id)}).toArray();
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users').find({_id: new mongodb.ObjectId(userId)})
//         .next()
//         .then(user => {
//             console.log(user);
//             return user;
//         })
//         .catch(err => {console.log(err)});
//     }
// }

// userSchema.methods.getCart = function(products) {
//     const productIds = this.cart.items.map(i => {
//         return i.productId;
//     });
//     return db
//     .collection('products')
//     .find({_id: {$in: productIds}})
//     .toArray().then(products => {
//         return products.map(p => {
//             return {...p, quantity: this.cart.items.find(i => {
//                 return i.productId.toString() === p._id.toString();
//             }).quantity
//         };
//         });
//     });
// }

// module.exports = User;

// 