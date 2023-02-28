class Pagination {
    constructor(dotsSelector) {
      this.dotsSelector = dotsSelector;
  
      this.maxLinks = 5;
      this.maxOffset = Math.ceil(this.maxLinks / 2);
  
      document.querySelector(this.dotsSelector).innerHTML = "";
    }
  
    generate(currentSlide, countSlides) {
      this.currentSlide = currentSlide + 1;
      this.countSlides = countSlides;
  
      this.offset_left = this.currentSlide > this.maxOffset;
      this.offset_right = this.currentSlide <= this.countSlides - this.maxOffset;
  
      if (this.countSlides > this.maxLinks) {
        if (this.currentSlide <= Math.floor(this.countSlides / 2)) {
          this.generateLeftPosition();
        } else if (this.currentSlide > Math.floor(this.countSlides / 2)) {
          this.generateRightPosition();
        }
      } else {
        this.generateDefault();
      }
    }
  
    generateDot(i, text, className = false, current = false) {
      var dot = document.createElement("li");
  
      if (className) {
        dot.classList.add(className);
      }
  
      if (i != "" && this.currentSlide == i) {
        dot.classList.add("active");
      }
  
      dot.id = i - 1;
      dot.innerText = text;
  
      document.querySelector(this.dotsSelector).appendChild(dot);
    }
  
    generateLeftPosition() {
      if (this.currentSlide != 1) {
        for (
          var i = this.currentSlide - 1;
          i < this.currentSlide - 1 + this.maxOffset;
          i++
        ) {
          this.generateDot(i, i, "dot");
        }
        this.generateDot("", "...");
        this.generateDot(this.countSlides, this.countSlides, "dot");
      } else {
        for (
          var i = this.currentSlide;
          i < this.currentSlide + this.maxOffset;
          i++
        ) {
          this.generateDot(i, i, "dot");
        }
        this.generateDot("", "···");
        this.generateDot(this.countSlides, this.countSlides, "dot");
      }
    }
  
    generateRightPosition() {
      if (this.currentSlide != this.countSlides) {
        this.generateDot(1, 1, "dot");
        this.generateDot("", "···");
        for (
          var i = this.currentSlide - 1;
          i < this.currentSlide - 1 + this.maxOffset;
          i++
        ) {
          this.generateDot(i, i, "dot");
        }
      } else {
        this.generateDot(1, 1, "dot");
        this.generateDot("", "···");
        for (
          var i = this.countSlides + 1 - this.maxOffset;
          i <= this.countSlides;
          i++
        ) {
          this.generateDot(i, i, "dot");
        }
      }
    }
  
    generateDefault() {
      for (var i = 1; i < this.countSlides + 1; i++) {
        this.generateDot(i, i, "dot");
      }
    }
  }

  $(document).ready(function() {
    
    if ($("#g2-slider")) {
      var g2Slider = $("#g2-slider");
  
      function addSliderListeners() {
        var dots = document.querySelectorAll(".dot");
        dots.forEach(function (el) {
          el.addEventListener("click", function () {
            g2Slider.slick("slickGoTo", el.id);
          });
        });
      }
  
      g2Slider.on("init", function (event, slick) {
        var pag = new Pagination("#g2-slider-pagination-list");
        pag.generate(slick.currentSlide, slick.slideCount);
        addSliderListeners();
      });
  
      g2Slider.on(
        "beforeChange",
        function (event, slick, currentSlide, nextSlide) {
          var pag = new Pagination("#g2-slider-pagination-list");
          pag.generate(nextSlide, slick.slideCount);
  
          addSliderListeners();
        }
      );
  
      /* slider initialization */
      g2Slider.slick({
        infinite: true,
        adaptiveHeight: true,
        fade: true,
        speed: 500,
        cssEase: "linear",
        prevArrow: $(".g2-slider-pagination .prev"),
        nextArrow: $(".g2-slider-pagination .next")
      });
    }
  });