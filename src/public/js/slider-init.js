$(document).ready(function(){
    $('.recent-jobs-slider').slick({
      infinite: true,
      dots:true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      prevArrow:"<button type='button' class='slick-prev pull-left'><img src='/src/public/img/prev-arr.svg' alt='Previous'></button>",
            nextArrow:"<button type='button' class='slick-next pull-right'><img src='/src/public/img/next-arr.svg' alt='Next'></i></button>"
    });
    $('.job-cate-slider').slick({
      infinite: false,
      dots:true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      rows: 2,  
      slidesPerRow: 1,
      prevArrow:"<button type='button' class='slick-prev pull-left'><img src='/src/public/img/prev-arr.svg' alt='Previous'></button>",
            nextArrow:"<button type='button' class='slick-next pull-right'><img src='/src/public/img/next-arr.svg' alt='Next'></i></button>"
    });
    $('.customer-slider').slick({
      infinite: true,
      dots:true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      prevArrow:"<button type='button' class='slick-prev pull-left'><img src='/src/public/img/prev-arr.svg' alt='Previous'></button>",
            nextArrow:"<button type='button' class='slick-next pull-right'><img src='/src/public/img/next-arr.svg' alt='Next'></i></button>"
    });
    $('.result-list-slider').slick({
      infinite: false,
      speed: 0, 
      cssEase: 'none',
      dots:true,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 8,  
      slidesPerRow: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      slidesMargin: 20,
      prevArrow:"<button type='button' class='slick-prev pull-left'><img src='/src/public/img/prev-arr.svg' alt='Previous'></button>",
            nextArrow:"<button type='button' class='slick-next pull-right'><img src='/src/public/img/next-arr.svg' alt='Next'></i></button>"
    });
  });