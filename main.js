$(document).ready(function(){

  //COMMON var
  var $window = $(window);
  var $body = $("body");
  
  // var to OPEN/CLOSE menu
  var $header = $(".page-header");
  var $switcher = $(".open-btn");
  
  // var to intro-block
  var $intro = $(".intro .container");
  var $skills =  $(".skills--part-1");
  
  // var to skills-reverse
  var $skill_item = $(".skills__list-item"); 
  
  // var to ajax-block
  var $btn_ajax = $(".btn--ajax");
  var $container_ajax = $(".skills__list-item--ajax");
  var $skill_section_ajax = $(".skills__section-skill--ajax");
  var $load_img = $(".loading");
  
  // var to scrolling
  var $visited = false;
  var $scrollHeight = 0;
  var $showed = false;
  var $overFlow = $(".overflow-blue");
  
  //var to WOW
  var $project_content = $(".project__content");
  var $project_logo = $(".project__logo");
  
  //var to form
  var $form = $(".form");
  var $form_btn = $("#submit");
  var $name = $("#name");
  var $mail = $("#mail");
  var $message = $("#message");
  
  
  
  //function to form
  
  $(".loading--f").hide();
  
  $form.submit(function(e){
    var $moment_of_submit = new Date();
  
    e.preventDefault();
    var $data = $(this).serialize();
    
    $name.addClass("zoomOut");
    $mail.addClass("zoomOut--delay400");
    $message.addClass("zoomOut--delay800");
    $form_btn.addClass("zoomOut--delay1200");
    
    $(".loading--f").delay(2000).fadeIn(200);
    
    
    
          
    
    
    $.ajax({
      url: 'action.php',
      type: 'POST',
      data: $data,
      success: 
        function(responce){
        
        
        $(".loading--f").css({            
              background: 'none',
              transform: 'translateY(1500px)',
              'animation-iteration-count': '1'
            });
        
        $("#indicator").css({opacity:'0'});
        $("#indicator").html('Ваше предложение успешно отправлено!').css({color:'#04c880'});
        
          var $moment_of_responce = new Date();
          var $diff = $moment_of_responce - $moment_of_submit;
          
          if($diff <= 2200){
            
            $form.delay(2200-$diff).fadeOut(1);
            $("#indicator").delay(2200-$diff).animate({opacity:1},400);                 
            $(".contacts").delay(2200-$diff).slideDown(400);                 
          } else {
            $form.fadeOut(1);
            $("#indicator").animate({opacity:1},400);
            $(".contacts").slideDown(400);             
          }
        }
      //,
      // error: alert('not ok')   
    })

  })
  
  
  
  // function to OPEN/CLOSE menu
  $switcher.click(function(e){
    $switcher.toggleClass("cross-btn");
    $header.toggleClass("open-menu");
    $intro.toggleClass("container-move");
    
  });
  
  //function to intro-fade-in
  $intro.delay(300).fadeIn(500);
  
  $intro.click(function(e){
    $("body, html").animate({ scrollTop: ($skills.offset().top +5) }, 300)
  });
  
  
  //function to skills-reverse 
  $skill_item.each(function(){
    var $card = $(this).children('.card');
    $(this).click(function(){
      $card.toggleClass("card  card--reverse");
      $body.removeClass("body-blue");
      $(".skills__list-item--html").removeClass("skills__list-item--firstside");
    })
  });
  
  //function to ajax-block
  $load_img.hide();
  
  $btn_ajax.click(function(e){
    $(this).fadeOut(300);
    $container_ajax.addClass("ajax-start");
    $skill_section_ajax.addClass("ajax-start");
    $(".data-source").delay(300).fadeIn(300);
    $load_img.delay(300).fadeIn(200);
    
    $.ajax({
      url : 'ajax-data.html',
      type : 'GET',
      cache : false,
      error: function(XMLHttpRequest){
        console.log(XMLHttpRequest);
      },
      success: 
        function(response){
          if (response == 0){
            alert('ошибка');
          }
            else{ 
              $load_img.fadeOut(200);
              $(".data-source").append(response);
              $(".data-source__content").delay(400).fadeIn(200);
              $(".skills__level-container--ajax").delay(400).fadeIn(200);
            };
        }
    });
    
  });
  
  //function scrolling
  $window.scroll(function(e){
  
  if (!$visited){
      $visited = localStorage.getItem("visited");
  }
  
  $scrollHeight = $window.scrollTop();
  
    if(!$visited){
      giveTip($scrollHeight);
    };
  });
  
  function giveTip(scrollHeight){
    if( (scrollHeight >= $skills.offset().top) && (scrollHeight <= 6000) && (!$showed)){
      $showed = true;
      $("body, html").animate({ scrollTop: ($skills.offset().top +5) }, 300)
      $body.addClass("body-blue");
      $overFlow.fadeIn(700);
      $(".skills__list-item--html").addClass("skills__list-item--firstside");
      localStorage.setItem("visited", true);
      
    };
  };
  
  //function to WOW
  if($window.width() <= 1100){
    $project_content.attr('data-wow-delay', '0.1s')
  } else {
    $project_logo.removeClass("bounceInRight");
    $project_logo.addClass("bounceInLeft");
  }
  
  
  
});