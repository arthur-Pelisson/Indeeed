document.addEventListener('DOMContentLoaded', (event) => {

    $('a').on({
       click: function() {
           $('.advertisement').css("visibility", "visible");
       }
    });

    $('.close').on({
        click: function (){
            $('.advertisement').css("visibility", "hidden");
        }
    })


})