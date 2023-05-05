window.addEventListener('load', function(){
	let menu = document.querySelector('.menu');
	let menuItems = menu.querySelectorAll('a');
	let btnUp = document.querySelector('.btnUp');

	delegate(menu, 'a', 'click', function(e){
		e.preventDefault();

		let target = document.querySelector(this.hash);
		scrollToElem(target);
	});

	btnUp.addEventListener('click', function(){
		scrollToY(0);
	});

	let scrollDelay = 100;
	let scrollTimeout;

	document.addEventListener('scroll', function(){
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(onScroll, scrollDelay);
	});

	function onScroll(){
		let pos = window.scrollY;
		console.log('here');
		let cl = btnUp.classList;
		let threshold = window.innerHeight / 2;
		pos > threshold ? cl.add('btnUp-open') : cl.remove('btnUp-open');
		
		for(let i = menuItems.length - 1; i >= 0; i--){
			let link = menuItems[i];
			let header = document.querySelector(link.hash);
			
			if(header.getBoundingClientRect().y < threshold){
				setActiveMenuItem(menu, link);
				break;
			}
		}
	}
});

function delegate(box, selector, eventName, handler){
	box.addEventListener(eventName, function(e){
		let elem = e.target.closest(selector);

		if(elem !== null && box.contains(elem)){
			handler.call(elem, e);
		}
	});
}

function setActiveMenuItem(menu, item){
	menu.querySelectorAll('a').forEach(link => link.classList.remove('menu__link-active'));
	item.classList.add('menu__link-active');
}
	
function scrollToElem(el){
	let cords = el.getBoundingClientRect();
	let contentStyles = window.getComputedStyle(document.querySelector('.content'));
	let shift = parseInt(contentStyles.marginTop);
	let top = window.scrollY + cords.top - shift;
	scrollToY(top);
}

function scrollToY(top){
	window.scrollTo({
		top,
		behavior: "smooth"
	});
}