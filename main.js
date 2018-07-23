// Service Worker
if ('serviceWorker' in navigator ) {
    console.log('Existe serviceworker');

    navigator.serviceWorker.register('./sw.js')
        .then( res => console.log('Service worker cargado correctamente',res))
        .catch( err => console.log('Service worker no se ha podido registrar',err));

} else {
    console.log('No se tiene service worker');
    
}

// Scroll menu
$(document).ready( function() {
    $("#menu a").click(function(e){
        e.preventDefault();

        //console.log($(this).attr('href'));
        //console.log($('#servicios').offset());
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
})