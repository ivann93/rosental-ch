var EasyCart = (function (module, $) {
  
  const hooks = [];
  let registerHook;
  let callHook;

  registerHook = function (name, callback) {
    if (typeof hooks[name] === 'undefined') {
      hooks[name] = [];
    }
    hooks[name].push(callback);
  };

  hasRegisteredHook = function (name, callback) {
    if (typeof hooks[name] !== 'undefined') return true;
    return false;
  }; 

  callHook = function (name, args) {
    // console.log("callHook", name, args);
    if (typeof hooks[name] !== 'undefined')
      for (let i = 0; i < hooks[name].length; ++i)
        if (hooks[name][i](args) != true) {
          break;
        }
  };

  module = {
    registerHook,
    callHook,
    debugMode: false
  };

  return module;
})(EasyCart || {}, jQuery);

if (typeof ShopifyAPI === 'undefined') {
  ShopifyAPI = {};
}

// POST to cart/update.js returns the cart in JSON
ShopifyAPI.updateCart = function (cartUpdates, callback) {
  const items = CartJS.cart.items;

  const keys = Object.keys(cartUpdates);
  const cartJSUpdates = [];
  // console.log(cartUpdates);
  let updated = false;
  const add = [];
  for (var i = 0; i < keys.length; i++) {
    let found = false;

    const id = parseInt(keys[i]);
    const quantity = parseInt(cartUpdates[id]);
    const timer = 1000;

    for (let j = 0; j < items.length; j++) {
      if (items[j].id == id) {
        found = true;
      }
      if (items[j].id == id && items[j].quantity != quantity && !updated) {
        // console.log("updateItem", items, j + 1, quantity);
        CartJS.updateItem(j + 1, quantity);
        updated = true;
      }
    }

    if (!found) {
      add.push({
        id,
        quantity,
      });
    }
  }

  for (var i = 0; i < add.length; i++) {
    CartJS.addItem(add[i].id, add[i].quantity);
  }
};