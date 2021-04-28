function upward(){
	$(function(){
	$(window).scroll(function(){
	if($(this).scrollTop()!=0){
	$('#topSite').fadeIn();
	}else{
	$('#topSite').fadeOut();
	}
	});
	$('#topSite').click(function(){
	$('body, html').animate({scrollTop:0}, 700);
	});
	});
}