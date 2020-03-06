
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
   return block ;
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
         let menuHeight = document.querySelector(".menu").offsetHeight;

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

function scrollPage(){
   let menuItems = Array.from(document.querySelectorAll(".item"));
   window.addEventListener('scroll', activeBlock);

   function activeBlock(){
      sections.forEach(item => {
         let start = item.offsetTop - menuHeight;
         let end = item.offsetTop + item.offsetHeight/1.3;

         if (pageYOffset > start && pageYOffset < end){
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





burgerMenu()
activeMenuItem()
scrollPage()
goToTop()