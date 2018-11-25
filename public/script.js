
  window.onload = function() {
    slider();
    $("#more-info-menu").click(function(){
      onClickMenu();
    });
  };
  
  function slider(){
    const bannerContainer = $(".banner-container");
    const banner = $(".banner");
    const numberBanner = banner.length;
    
    
    for(let i=0; i< numberBanner; i++) {
      $(".slide-indicator").append("<button class='indicator'></button>");
    };
    
    
    let index = 0;
    const indicator = $('.indicator');

    $(indicator[0]).addClass('active');
    setInterval(function(){
      index++;
      if(index==banner.length) {
        index=0;
      }
      bannerContainer.css({"transform":`translateX(-${index*100}%)`});
      

      for(let i =0; i < numberBanner; i++) {
        $(indicator[i]).removeClass('active')
      };
      $(indicator[index]).addClass('active');
    }, 2000);

  }

  function onClickMenu() {
    $('.collasp-menu').toggleClass('hide');
    
  }