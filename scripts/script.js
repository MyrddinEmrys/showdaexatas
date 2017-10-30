$(document).ready(function() {
  $('body').scrollspy({ target: ".navbar", offset: 50 });

  // var w = window.innerWidth + "px";
  // var h = window.innerHeight + "px";

  // var section1 = document.getElementById("section1");
  // section1.style.width = w;
  // section1.style.height = h;

  // var section2 = document.getElementById("section2");
  // section2.style.width = w;
  // section2.style.height = h;

  // var section3 = document.getElementById("section3");
  // section3.style.width = w;
  // section3.style.height = h;

  // var section41 = document.getElementById("section41");
  // section41.style.width = w;
  // section41.style.height = h;

  // var section42 = document.getElementById("section42");
  // section42.style.width = w;
  // section42.style.height = h;

  // var section43 = document.getElementById("section43");
  // section43.style.width = w;
  // section43.style.height = h;
});





// Not required!
// This is just to demo functionality.
$("#add").on("click", function() {
  $("<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>").appendTo(".content");
});






// QUIZ
$(function(){
  var loading = $('#loadbar').hide();
  $(document)
  .ajaxStart(function () {
      loading.show();
  }).ajaxStop(function () {
    loading.hide();
  });
  
  $("label.btn").on('click',function () {
    var choice = $(this).find('input:radio').val();
    $('#loadbar').show();
    $('#quiz').fadeOut();
    setTimeout(function(){
      $( "#answer" ).html(  $(this).checking(choice) );      
      $('#quiz').show();
      $('#loadbar').fadeOut();
      /* something else */
      console.log('Carregado!');
    }, 1500);
    // 1.5 segundos
  });

  $ans = 4;

  $.fn.checking = function(ck) {
    if (ck != $ans) {
      return 'INCORRETO!';
    }
    else {
      return 'CORRETO!';
    }
  }; 
}); 









