function togglePopup(){var e=document.body.querySelectorAll(".product-card");Array.prototype.forEach.call(e,function(e){var o=e.querySelector(".product-card__info-btn"),c=e.querySelector(".cross-btn"),r=e.querySelector(".product-card__popup");o.addEventListener("click",function(){r.classList.add("open")}),c.addEventListener("click",function(){r.classList.remove("open")})})}togglePopup();