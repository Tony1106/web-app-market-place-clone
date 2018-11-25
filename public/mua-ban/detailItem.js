
$(document).ready(function(){
    var currentSlide = 0;
    addIndicator();
    $('.igItem').first().addClass('active');

    $('.button-left-right').click(function(){ 
        const idButton = $(this).attr('id');
        const images = $('.igItem');


        if(idButton==='right-button'){
            if(currentSlide==images.length-1){return}
            currentSlide++;
            changeIndicator(currentSlide);
            changeImageRight(currentSlide, images);
        } else {
            if(currentSlide==0){return}
            currentSlide--;
            changeIndicator(currentSlide);
            changeImageLeft(currentSlide, images); 
        }
    })
})

function addIndicator(){
    const images = $('.igItem');
    const indicator = '<li><button></button></li>';
 
    for(let i =0; i<(images.length-1); i++) {
        $('.indicator ul').append(indicator);
    }
}
function changeImageRight(currentSlide,images){
    for(let i=0; i<images.length; i++) {
        $(images[i]).removeClass('active');
    }    
    $(images[currentSlide]).addClass('active')
}
function changeImageLeft(currentSlide,images){
    for(let i=0; i<images.length; i++) {
        $(images[i]).removeClass('active');
    }      
    $(images[currentSlide]).addClass('active')
}

function changeIndicator(currentSlide){
    const indicator = $('.indicator li button');
    for(let i=0; i< indicator.length; i++){
        indicator.removeClass('active');
    }
    $(indicator[currentSlide]).addClass('active');
}
