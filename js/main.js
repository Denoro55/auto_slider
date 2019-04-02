(function(){

	var func = (function(){

		var initSlider = function() {

			var autoslide = false;

			// автослайдер переключатель
			$('.js-slideshow').on('click',function(){
				$(this).toggleClass('slideshow-active');
				autoslide = !autoslide;
			})

			var structure = [1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,2,1,1,1,1,1,1,1,1,2,4,7,6,6,4,3,1];

			var years = [];
			var pos = [];
			var posNext = 0;
			var slider = $('.slider');
			var pager = $('.bx-pager');
			var navHistory = $('.history-nav__pager');
			var activeElement = 0;
			var images = $('.history-slider__item');

			var index = 0;
			var totalWidth = 0;

			// автослайдер
			var autoslider = setInterval(function(){
				if (autoslide) {
					preMove(1);
				}
			},3000)

			// инициализация

			images.each(function(i,elem){
				years.push($(elem).find('.history-slider__year').text())
			})

			var iterYears = 0;

			structure.forEach(function(value){
				for (var k=0;k<value;k++) {
					var obj;
					var getYear = years[iterYears];
					if (k!==0) {
						getYear = '';
					}
					if (iterYears===0) {
						obj = $('<div class="bx-pager__item active"><div class="bx-pager__year">'+getYear+'</div><a class="bx-pager__link bx-pager__link-active" href="#">1</a></div>');
					} else {
						obj = $('<div class="bx-pager__item"><div class="bx-pager__year">'+getYear+'</div><a class="bx-pager__link" href="#">1</a></div>');
					}
					pager.append(obj);
					iterYears++;
				}
			})

			var dots = $('.bx-pager__item a');
			var items = $('.bx-pager__item');

			structure.forEach(function(value){
				var width = 160;
				for (var i=0;i<value;i++) {
					if (i<value-1) {
						items.eq(index).css('width',20);
						width -= 20;
						pos.push(posNext);
						posNext += 20;
					} else {
						items.eq(index).css('width',width).addClass('bx-pager__last');
						pos.push(posNext);
						posNext += width;
					}
					index++;
				}
				totalWidth+=160;
			})

			pager.css('width',totalWidth+'px');

			$('.bx-wrapper__controls').fadeIn(500);

			// смена слайда с помощью стрелок
			$('.js-prev').on('click',function(e) {
				preMove(-1);
				e.preventDefault();
			})

			$('.js-next').on('click',function(e) {
				preMove(1);
				e.preventDefault();
			})

			// смена слайда с помощью точек
			$('.bx-pager__item a').on('click',function(e) {
				e.preventDefault();
				activeElement = $(this).closest('.bx-pager__item').index();
				slide($(this).closest('.bx-pager__item').index());
			})

			function preMove(dir){
				if (dir>0) {
					if (activeElement >= items.length-1) {
						activeElement = 0;
						slide(activeElement);
					} else {
						slide(activeElement+1);
						activeElement+=1;
					}
				} else {
					if (activeElement == 0) {
						activeElement = items.length-1;
						slide(activeElement);
					} else {
						slide(activeElement-1);
						activeElement-=1;
					}
				}
			}

			function slide(ind) {

				images.removeClass('history-slider__item-active')
				images.eq(ind).addClass('history-slider__item-active');

				var $this = $('.bx-pager__item').eq(ind).find('a');
				var next = true;
				var prev = true;
				var block = $this.closest('.bx-pager__item');

				var currentIndex;

				if (ind !== undefined) {
					currentIndex = ind;
				}

				currentIndex = block.index();

				var fullWidth = pager.width();
				var navWidth = -navHistory.width();
				var centerX = navHistory.width()/2;
				var clickX = block.position().left;

				if (clickX > centerX) {
					var offsetX = 0-(clickX - centerX);
					if (clickX+centerX > fullWidth) {
						pager.css('transform','translate3d('+(-(fullWidth+navWidth))+'px,0,0)');
					} else {
						pager.css('transform','translate3d('+offsetX+'px,0,0)');
					}
				} else {
					pager.css('transform','translate3d(0,0,0)');
				}

				items.removeClass('active');
				block.addClass('active');

				dots.removeClass('bx-pager__link-active')
				$this.addClass('bx-pager__link-active');

				if (block.hasClass('bx-pager__last')) {
					next = false;
				}

				if (next) {
					colorizeDots(1);
				}

				colorizeDots(-1);

				function colorizeDots(dir) {
					var counter = currentIndex;
					var iter = true;
					while (iter) {
						var nextIndex = counter += dir;
						if (!items.eq(nextIndex).hasClass('active') && !items.eq(nextIndex).hasClass('bx-pager__last')){
							items.eq(nextIndex).addClass('active');
						} else {
							if (dir > 0 ) items.eq(nextIndex).addClass('active');
							iter = false;
						}
					}
				}
			}

			// свайп

			$("img").mousedown(function(){
			    return false;
			});

			var myElement = document.querySelector('.history-slider');
      		var hammertime = new Hammer(myElement);

		  	hammertime.on('panend', function(ev) { // возвращение слайдера после свайпа
		  		if (ev.deltaX > 100) {
		  			preMove(-1);
		  		}
		  		if (ev.deltaX < -100) {
		  			preMove(1);
		  		}
		  	})

		}

		return{
			init: function(){
				initSlider();
			}
		}

	}());

	func.init();

}(jQuery));
