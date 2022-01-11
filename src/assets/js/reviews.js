 
function htmlDecode(input){
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

const checkReviews = () => {
  const reviewContent = document.querySelector(".spr-review-content-body")
  
  if (reviewContent) { 
    var reviewContentAll = document.querySelectorAll(".spr-review-content-body");

    reviewContentAll.forEach(function(reviewContent) {
      let r = reviewContent.innerHTML;
      r = r.replace(/<em>/, "<strong>");
      r = r.replace(/<\/em>/, "</strong>");
      r = r.replace(/\(/, "");
      r = r.replace(/\)/, "");
      reviewContent.innerHTML = htmlDecode(r);
    });
  } else {
    setTimeout(() => {
      checkReviews()
    }, 1000);
  }
}
checkReviews();



window.addEventListener('load', () => {
  checkReviews()
});
