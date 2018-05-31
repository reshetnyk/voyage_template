window.onload = function(){

	(function toTopBtn(){
		$('#to-top').click(function(){
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
		});
	})();
	
	(function(){
		/*********************banner-carousel*****************/
		$banner = $('#banner-carousel');
		$banner.flickity({
			cellAlign: 'left',
			contain: true,
			cellSelector: '.slider-item',
			pageDots: false,
		});
		$banner.flickity('resize');
		/******************************************************/


		/*********************offers-carousel*****************/
		var $offers = $('#offers-carousel');
		$offers.flickity({
			pageDots: false,
			wrapAround: true,
			cellAlign: 'center',
			prevNextButtons: false,
			adaptiveHeight: false,
		});
		var offersLength = $offers.data('flickity').cells.length;
		var $offersItems = $offers.find('.item');
		setOpacity($offersItems, 0);
		$offers.on( 'change.flickity', function( event, index ) {
			setOpacity($offersItems, index);
		});
		$offers.on( 'staticClick.flickity', selectClickedItem);
		function setOpacity(items, current){
			items.addClass('set-opacity');
			items.eq(current-1).removeClass('set-opacity');
			items.eq(current).removeClass('set-opacity');
			items.eq(getNextIndex(current, offersLength)).removeClass('set-opacity');
		}
		function getNextIndex(current, length){
			return (current + 1 > length - 1) ? 0 : ++current;
		}
		function selectClickedItem(event, pointer, cellElement, cellIndex){
			if ( !cellElement ) {
				return;
			}
			$(this).flickity('select', cellIndex);
		}
		/******************************************************/


		/*********************clients-carousel*****************/
		var $clients = $('#clients-carousel');
		$clients.flickity({
			pageDots: false,
			wrapAround: true,
			cellAlign: 'center',
			prevNextButtons: false,
			adaptiveHeight: false,
		});
		$clients.on( 'staticClick.flickity', selectClickedItem);
		$clients.flickity('resize');
		/******************************************************/
	})();
	//$("#carousel").trigger('refresh.owl.carousel');
	(function toggleHeaderSections(){
		var openedSection;
		var buttons = [];

		buttons.push({
			id: '#hide-left-side-btn',
			hideSection: '.header-top .grow-wrapper>.left-side'
		});
		buttons.push({
			id: '#hide-right-side-btn',
			hideSection: '.header-top .grow-wrapper .right-side-wrapper'
		});
		buttons.push({
			id: '#hide-menu-btn',
			hideSection: '#main-nav li'
		});

		var showButtonsListener = function(){
			var prevButton = getButtonBySection(openedSection);
			var clickedButton = getButton('#' + $(this).attr('id'));
			if(openedSection){//если есть открытое меню
				//закрываем	
				$(openedSection).animate({maxHeight: '0', opacity: '0' }, 500 ).animate({maxWidth:'0'}, 0 );//закрыть его
				$(prevButton.id).toggleClass('active');
				if(clickedButton.hideSection !== openedSection){//если нужно открыть второе меню, связанное с кнопкой, по которой мы кликнули
					//открываем меню
					$(clickedButton.hideSection).delay(510).animate({maxWidth:'100%'}, 0 ).animate({maxHeight: '400', opacity: '1' }, 500 );
					$(clickedButton.id).toggleClass('active');
					openedSection = clickedButton.hideSection;
				}else 
					//открытых секций больше нет
					//открывать ничего не нужно
					openedSection = undefined;
			}else{
				//если до этого у нас небыло открытых секций, открываем
				$(clickedButton.hideSection).animate({maxWidth:'100%'}, 0 ).animate({maxHeight: '400', opacity: '1' }, 500 );
				$(clickedButton.id).toggleClass('active');
				openedSection = clickedButton.hideSection; 
			}
		}

		function getButton(btnId){
			for (var i = 0; i < buttons.length; i++)
				if(buttons[i].id === btnId)
					return buttons[i];
			return;
		}

		function getButtonBySection(section){
			var button;
			for (var i = 0; i < buttons.length; i++)
				if(buttons[i].hideSection === section)
					return buttons[i];
			return;
		}

		buttons.forEach(function(item){
			$(item.id).click(showButtonsListener);
		});
	})();

	(function animateMainButton(){

		$('.pulse-circle-animation').click(function(e){
			var pulse = $('<div></div>');
			var btnWidth = $(this).width();

			pulse.addClass('pulse');
			pulse.width(btnWidth);
			pulse.height(btnWidth);

			var mouseX = (e.pageX - $(this).offset().left);
            var mouseY = (e.pageY - $(this).offset().top);
            pulse.css('left', (mouseX - pulse.width() / 2) + 'px');
            pulse.css('top', (mouseY - pulse.width() / 2)) + 'px';

       		pulse.appendTo(this);

			setTimeout(() => {
				pulse.remove();
			}, 1000)﻿;
		});
	})();
};