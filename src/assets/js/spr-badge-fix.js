//fix rating star numbers
$(document).ready(function() {
  function handleCanvas(canvas) {
    setTimeout(function() {
      $(".spr-badge").each(function() {
        var get_rating_in_num = $(this).attr("data-rating");
        get_rating_in_num = parseFloat(get_rating_in_num).toFixed(1);

        if (get_rating_in_num >= 0.5) {
          var s = $("<span>");
          s.html(get_rating_in_num);
 
          $(this).parent().prepend(s);
        }
        
        /*
        console.log(get_rating_in_num);
        $(this)
          .find("i.spr-icon.spr-icon-star")
          .text(get_rating_in_num);
        $(this)
          .find("i.spr-icon.spr-icon-star-half-alt")
          .text(get_rating_in_num);
        if (get_rating_in_num < 0.5) {
          $(this)
            .parent()
            .css("display", "none");
        }*/
      });
    }, 100);
  }

  var observer = new MutationObserver(function(mutations, me) {
    var canvas = $(
      ".product-item .product-item__reviews .spr-badge i.spr-icon-star"
    )[0];
    if (canvas) {
      handleCanvas(canvas);
      me.disconnect(); // stop observing
      return;
    }
  });

  // start observing
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
});
