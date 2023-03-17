/*
	No Swiper by ny™ v1.0.0
	https://www.notreyork.com
	© 2023, Notre York Inc.
	Licensed under the MIT license.
*/

$(".noswiper-thumbnails-wrapper ul li img").click(function(e){		                                        
	$(this).closest(".noswiper").find(".noswiper-featured-image-wrapper img").attr("src",$(this).prop('src'));
});
