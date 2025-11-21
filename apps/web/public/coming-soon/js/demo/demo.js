// ------------------------------------------------
// Project Name: Ramio - Clean Coming Soon and Landing Page Template
// Project Description: Ramio - awesome coming soon template to kick-start your project
// Tags: Ramio, coming soon, under construction, template, coming soon page, html5, css3
// Version: 2.0.4
// Build Date: April 2018
// Last Update: July 2025
// This product is available exclusively on Themeforest
// Author: mix_design
// Author URI: https://themeforest.net/user/mix_design
// File name: demo.js
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  1. Loader
//  2. Demo Main Section Loading Animation
//  3. SVG Fallback
//  4. Chrome Smooth Scroll
//  5. Images Moving Ban
//  6. Smooth Scroll To Top
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(window).on("load", function() {

  "use strict";

  // --------------------------------------------- //
  // Loader Start
  // --------------------------------------------- //
  setTimeout(function(){
    $(".loader-logo").removeClass('slideInDown').addClass('fadeOutUp');
    $(".loader-caption").removeClass('slideInUp').addClass('fadeOutDown');
  },600);
  // --------------------------------------------- //
  // Loader End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Demo Main Section Loading Animation Start
  // --------------------------------------------- //
  setTimeout(function(){
    $(".loader").addClass('loaded');
    $("body").addClass('loaded');
  },1200);
  // --------------------------------------------- //
  // Demo Main Section Loading Animation End
  // --------------------------------------------- //

});

$(document).ready(function() {

  // --------------------------------------------- //
  // SVG Fallback Start
  // --------------------------------------------- //
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };
  // --------------------------------------------- //
  // SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  //try {
    //$.browserSelector();
    //if($("html").hasClass("chrome")) {
      //$.smoothScroll();
    //}
  //} catch(err) {
  //};
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scroll To Top Start
  // --------------------------------------------- //
  var offset = 300,
      offset_opacity = 1200,
      scroll_top_duration = 500,
      $back_to_top = $('.to-top-button');

	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible fade-out');
		if( $(this).scrollTop() > offset_opacity ) {
			$back_to_top.addClass('fade-out');
		}
	});

	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0,
		 	}, scroll_top_duration);
	});
  // --------------------------------------------- //
  // Smooth Scroll To Top End
  // --------------------------------------------- //

});
