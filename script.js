function burgerMenu() {
   document.querySelector(".burger").addEventListener("click", function () {
      document.querySelector(".menu").classList.toggle("show");
      this.classList.toggle("burger-cross");
   })
}

// active menu item

let menuItems = Array.from(document.querySelectorAll(".item"));

let anchors = menuItems.map(el => {
   let hash = el.href.replace(/[^#]*(.*)/, '$1');
   return hash;
})

let sections = anchors.map(hash => {
   let block = document.querySelector(hash);
   return block;
})

let menuHeight = document.querySelector(".menu").offsetHeight;
let V = .1;

function activeMenuItem() {
   menuItems.forEach(elem => {
      elem.addEventListener('click', function (e) {
         e.preventDefault();
         scrollMenu(elem);

         menuItems.forEach((nl) => {
            if (nl != this) {
               nl.parentNode.classList.remove('active');
            }
         });

         this.parentNode.classList.add('active');
         document.querySelector(".menu").classList.toggle("show");
         document.querySelector(".burger").classList.remove("burger-cross");
      }, false);
   });
}

// scroll menu

function scrollMenu(item) {
   let w = window.pageYOffset;
   let hash = item.href.replace(/[^#]*(.*)/, '$1');
   let t = document.querySelector(hash).getBoundingClientRect().top;

   let start = null;

   requestAnimationFrame(step);

   function step(time) {
      //let menuHeight = document.querySelector(".menu").offsetHeight;

      if (start === null) start = time;

      let progress = time - start;
      let r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
      window.scrollTo(0, r);

      if (r != w + t) {
         requestAnimationFrame(step)
      } else {
         //window.scrollTo(0, t + w - menuHeight) // if menu is fixed
         location.hash = hash // -  URL с хэшем если меню не fixed
      }
   };
}

// scroll page

function scrollPage() {
   let menuItems = Array.from(document.querySelectorAll(".item"));
   window.addEventListener('scroll', activeBlock);

   function activeBlock() {
      sections.forEach(item => {
         let start = item.offsetTop - menuHeight;
         let end = item.offsetTop + item.offsetHeight / 1.3;

         if (pageYOffset > start && pageYOffset < end) {
            document.querySelector(".active").classList.remove("active");
            let index = sections.indexOf(item);
            menuItems[index].classList.add("active");
         }
      })
   }
}

function goToTop() {
   let scrollButton = document.querySelector(".scroll_top");

   window.addEventListener("scroll", trackScroll);
   scrollButton.addEventListener("click", goUp);

   function trackScroll() {
      let scrolled = window.scrollY + 200;
      let y = document.documentElement.clientHeight;

      if (scrolled > y) {
         scrollButton.classList.add("show");
      } else {
         scrollButton.classList.remove("show");
      }
   }

   function goUp() {
      if (window.pageYOffset > 0) {
         window.scrollBy(0, -80);
         setTimeout(goUp, 0);
      };
      document.querySelector(".active").classList.remove("active");
      document.querySelector('[href="#home"]').classList.add("active")
   }
}

// slider

function slider() {
   let slide = Array.from(document.querySelectorAll(".slide"));
   let numberOfSliders = slide.length; 
   let current = document.querySelector(".shown");
   let number = slide.indexOf(current);
   let timer;

   document.querySelector(".next").addEventListener("click", right);

   function right(){
      current.classList.remove("shown");

      if (number == numberOfSliders-1) {
         number = 0;
      } else {
         number = number + 1;
      }

      current = slide[number];
      current.classList.add("shown");
   }

   document.querySelector(".prev").addEventListener("click", left)
   
   function left(){
       
      current.classList.remove("shown");

      if (number == 0) {
         number = numberOfSliders-1;
      } else {
         number = number - 1;
      }

      current = slide[number];
      current.classList.add("shown");
   }

   slide.forEach(item => {
      item.addEventListener("mouseover", function(){
         clearInterval(timer);
      })
   })
   
   slide.forEach(item => {
      item.addEventListener("mouseout", function(){
         timer = setInterval(right,5000);
      })
   })


}

// gallery

function gallery(){
   let previews = Array.from(document.querySelectorAll(".gallery-img"));
   let images = Array.from(document.querySelectorAll(".popup-img"));
   let numberOfImages = images.length;
   let overlay = document.querySelector(".overlay");
   let index;
   let current;

   previews.forEach(preview => {
      preview.addEventListener("click", show);

      function show(){
         index = previews.indexOf(preview);

         overlay.classList.add("visible");
         document.querySelector(".gallery-popup").classList.add("visible");

         current = images[index];
         current.classList.add("pop-show"); 
      }
   })

   

   document.querySelector(".right").addEventListener("click", moveRight);

   function moveRight(){
      current.classList.remove("pop-show");

      if (index == numberOfImages-1) {
         index = 0;
      } else {
         index = index + 1;
      }

      current = images[index];
      current.classList.add("pop-show");
   }

   document.querySelector(".left").addEventListener("click", moveLeft);

   function moveLeft(){
      current.classList.remove("pop-show");

      if (index == 0) {
         index = numberOfImages-1;
      } else {
         index = index - 1;
      }

      current = images[index];
      current.classList.add("pop-show");
   }

   overlay.addEventListener("click", close);
   document.querySelector(".close").addEventListener("click", close);

   function close(){
      overlay.classList.remove("visible");
      document.querySelector(".gallery-popup").classList.remove("visible");
      document.querySelector(".pop-show").classList.remove("pop-show")
   }
}




burgerMenu()
activeMenuItem()
scrollPage()
goToTop()
slider()
gallery()