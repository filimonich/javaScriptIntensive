window.addEventListener('load', function(){
	let menu = document.querySelector('.menu');
	let btnUp = document.querySelector('.btnUp');

	delegate(menu, 'a', 'click', function(e){
		e.preventDefault();

		let target = document.querySelector(this.hash);
		scrollToElem(target);
		setActiveMenuItem(menu, this);
	});

	let hash = window.location.hash;
	let autoTarget = hash.length > 0 ? document.querySelector(hash) : null;

	if(autoTarget !== null){
		scrollToElem(autoTarget);
		setActiveMenuItem(menu, menu.querySelector(`[href$="${hash}"]`));
	}

	btnUp.addEventListener('click', function(){
		scrollToY(0);
	});

	document.addEventListener('scroll', function(){
		let cl = btnUp.classList;
		let threshold = window.innerHeight / 2;
		window.scrollY > threshold ? cl.add('btnUp-open') : cl.remove('btnUp-open');
	});
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