$(document).ready(function(){
    $('#btn-open-form').click(function(e){
        e.preventDefault();
        $(this).hide();
        $('.form-wrapper').slideDown(1000);
    });

    $('.phone-mask').mask('+7 (999) 999-99-99');
});