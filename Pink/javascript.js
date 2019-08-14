//navigation-var
var btn_nav = document.body.getElementsByClassName('open-btn')[0];
var navigation = document.body.getElementsByClassName('main-navigation__list')[0];
var header = document.body.getElementsByClassName('page-header')[0];
var links = navigation.getElementsByClassName('main-navigation__link');

//reviews-var
var btn_rev_prev = document.body.getElementsByClassName('toggle-btn')[0];
var btn_rev_next = document.body.getElementsByClassName('toggle-btn')[1];
var controls = document.body.getElementsByClassName('control');
var check = document.body.getElementsByClassName('slider-control');
var c = 0;

//navigation-options
btn_nav.onclick = function(){
  btn_nav.classList.toggle('cross-btn');
  navigation.classList.toggle('main-nav-toggle');
  header.classList.toggle('header-on');
}

//reviews-options
btn_rev_prev.onclick = function(){

};



btn_rev_next.addEventListener('click', function(e){
  while (true){
    if (controls[c].checked && c<2){
      controls[c].checked = false;
      controls[c+1].checked = true;
      break;
    } else if(c<2){
        c=c+1;
      } else{
        c=2;
        break;
      }
  }
  
  if (c<controls.length-1){
    c=c+1;
    btn_rev_prev.classList.remove('disabled');

  } 
    else {
      c=controls.length-1
    }; 
  
  if (c==controls.length-1){
    btn_rev_next.classList.add('disabled');
  }  
  
  
});

btn_rev_prev.addEventListener('click', function(e){
    while (true){
    if (controls[c].checked && c>0){
      controls[c].checked = false;
      controls[c-1].checked = true;
      break;
    } else if(c>0){
        c=c-1;
      } else{
        c=0;
        
        break;
      }
  }
  
  if (c>0){
    c=c-1;
    btn_rev_next.classList.remove('disabled');
  } 
    else {
      c=0
    };  
    
  if (c==0){
    btn_rev_prev.classList.add('disabled');
  }  
});


check[0].onclick = function(e){
  c=0;
  btn_rev_prev.classList.add('disabled');
  btn_rev_next.classList.remove('disabled');

}
check[1].onclick = function(e){
  c=1;
  btn_rev_prev.classList.remove('disabled');
  btn_rev_next.classList.remove('disabled');
}
check[2].onclick = function(e){
  c=2;
  btn_rev_next.classList.add('disabled');
  btn_rev_remove.classList.remove('disabled');
}


