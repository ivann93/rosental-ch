const simulateClick = elem => {
  // Create our event (with options)
  var evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  // If cancelled, don't dispatch our event
  var canceled = !elem.dispatchEvent(evt);
};

const addDiscountCode = () => {
  const discountCodeCookie = getCookie('discount_code');
  const hsDiscountCode = document.querySelector('.hs-discount-code');
  if (discountCodeCookie && hsDiscountCode) {
    hsDiscountCode.value = discountCodeCookie;
    //repeatDiscountCodeValue();
  }
};

const addClassNameListener = (elemClass, callback) => {
  var elem = document.querySelector(elemClass);
  var lastClassName = elem.className;
  window.setInterval(function() {
    var className = elem.className;
    if (className !== lastClassName) {
      callback(elem);
      lastClassName = className;
    }
  }, 100);
};

const listenToEvents = () => {
  addClassNameListener('.hs-cart-drawer-2', function(elem) {
    if (elem.classList.contains('active')) {
      applyDiscountCode();
      addPaymentMethods();
    }
  });
};

const applyDiscountCode = () => {
  const hsSuccessDiscountCode = document.querySelector(
    '.hs-success-code-discount',
  );
  if (hsSuccessDiscountCode) {
    const alreadyApplied = document.querySelector('.hs--content--success');
    if (alreadyApplied == null) {
      const hsApplyDiscount = document.querySelector('.hs-apply-discount');
      const hsDiscountCode = document.querySelector('.hs-discount-code');
      if (hsApplyDiscount && hsDiscountCode && hsDiscountCode.value) {
        simulateClick(hsApplyDiscount);
      }
    }
  }
};

const addPaymentMethods = () => {
  const hsButtons = document.querySelector('.hs-content-checkout-button');
  const hsPaymentMethods = document.getElementById('hs-custom-payment-methods');
  if (hsButtons && !hsPaymentMethods) {
    var div = document.createElement('div');
    div.id = 'hs-custom-payment-methods';
    div.innerHTML =
      '<img src="https://cdn.shopify.com/s/files/1/0518/8619/4876/files/payment_methods.png?v=1611298638" style="margin-top: 10px" />';
    hsButtons.after(div);
  }
};

const repeatCheckingAdditionalButtons = () => {
  const hsButtons = document.getElementById('hs-additional-buttons');

  if (hsButtons) {
    addPaymentMethods();
  } else {
    setTimeout(() => {
      repeatCheckingAdditionalButtons();
    }, 1000);
  }
};

const repeatCheckingCartLoaded = () => {
  const hsCart = document.querySelector('.hs-discount-code');

  if (hsCart) {
    addDiscountCode();
    listenToEvents();
    addPaymentMethods();
  } else {
    setTimeout(() => {
      repeatCheckingCartLoaded();
    }, 1000);
  }
};
repeatCheckingCartLoaded();
//repeatCheckingAdditionalButtons();

function parse_query_string(query) {
  var vars = query.split('&');
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === 'undefined') {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === 'string') {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

const checkAppliedDiscount = () => {
  let coupon_code = getCookie('discount_code').toString();
  const referrer = document.referrer;
  coupon_code = coupon_code.split('&')[0];
  var query = window.location.search.substring(1);
  var qs = parse_query_string(query);

  if ((referrer === '' || qs.utm_source !== undefined) && coupon_code != '') {
    //document.getElementsByClassName('discount-applied')[0].style.display = "block";
    //document.querySelector('.discount-applied p').innerHTML = document.querySelector('.discount-applied p').innerHTML.replace('{ discount_code }', coupon_code);
    //createCookie(coupon_code,coupon_code, 1);
    const div = document.createElement('div');
    div.className = 'discount_applied';
    var content = document.getElementsByClassName('discount_applied_text')[0]
      .innerHTML;
    div.append(content.replace('{ discount_code }', coupon_code.toUpperCase()));
    const pageContent = document.getElementById('page-content');
    const collectionPage =
      document.getElementById('shopify-section-collection') ||
      document.getElementById('shopify-section-collection-sale-banner');
    const productPage = document.getElementById('shopify-section-product');
    const staticPage = document.getElementById('content');
    setCookie('discount_code', coupon_code, 1);
    setCookie('hscodediscount', coupon_code, 1);
    if (pageContent !== null) {
      pageContent.prepend(div);
    } else if (collectionPage !== null) {
      collectionPage.prepend(div);
    } else if (productPage !== null) {
      productPage.prepend(div);
    } else if (staticPage !== null) {
      staticPage.prepend(div);
    }
  }
};
window.addEventListener('load', () => {
  checkAppliedDiscount();
});
