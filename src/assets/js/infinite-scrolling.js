var infiniteScrolling = true;

function isOnScreen(elem) {
  // if the element doesn't exist, abort
  if (typeof jQuery === 'function' && elem instanceof jQuery) {
    elem = elem[0];
  }
  if (elem.length == 0) {
    return;
  }
  var $window = jQuery(window);
  var viewport_top = $window.scrollTop();
  var viewport_height = $window.height();
  var viewport_bottom = viewport_top + viewport_height;
  var $elem = jQuery(elem);
  var top = $elem.offset().top - viewport_height / 2;
  var height = $elem.height();
  var bottom = top + height;

  return (
    (top >= viewport_top && top < viewport_bottom) ||
    (bottom > viewport_top && bottom <= viewport_bottom) ||
    (height > viewport_height &&
      top <= viewport_top &&
      bottom >= viewport_bottom)
  );
}

jQuery(function($) {
  // Shortcircuit variable
  var triggered = false;
  var nextUrl = null;
  var lastPage = false;
  var loading = false;

  var pagination = $('.template-collection .pagination');
  var loadMore = $('.template-collection .load-more');
  function ScrollExecute() {
    if (lastPage) {
      return false;
    }
    // Locate pagination
    if (pagination.length == 0) {
      return false;
    } else {
      pagination.hide();
    }

    if (nextUrl == null) {
      var next = $(pagination).find('a.next');
      if (next.length) {
        nextUrl = next.attr('href');
      }
    }

    if (nextUrl == null) {
      return false;
    }
    //console.log(lastPage, isOnScreen(loadMore), nextUrl);
    // Button position when AJAX call should be made one time
    if (isOnScreen(loadMore) && triggered === false) {
      triggered = true;
      //console.log("Load", nextUrl);
      // Trigger shortcircuit to ensure AJAX only fires once

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var hDom = $(this.responseText);
          var items = hDom.find('.product-item');
          var paginationNext = hDom.find('.pagination a.next');
          if (paginationNext.length) {
            var newUrl = paginationNext.attr('href');
            if (newUrl == nextUrl || !newUrl) {
              lastPage = true;
            } else {
              nextUrl = newUrl;
            }
          } else {
            lastPage = true;
          }
          items.each(function() {
            var item = $(this);
            var div = $('<div>');
            div.addClass('product-item');
            div.append(item.html());
            $('.collection--grid').append(div);
          });

          // On success, reset shortcircuit
          triggered = false;

          // reload review ratings if available
          loadReviewsIoRatings();
        }
      };

      xhttp.open('GET', nextUrl, true);
      xhttp.send();
    }
  }

  if (infiniteScrolling) {
    var productList = $('.template-collection .collection--grid');

    if (productList[0]) {
      ScrollExecute();
      $(window).scroll(function() {
        ScrollExecute();
      });
    }
  }
});
