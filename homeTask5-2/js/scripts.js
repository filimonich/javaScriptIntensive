window.addEventListener('load', function(){
	let faq = document.querySelector('.faq');
	
	delegate(faq, '.ask', 'click', function(){
		let answer = this.closest('.item').querySelector('.answer');
		let cl = answer.classList;

		if(cl.contains('open')){
			let animation = answer.animate([
				{ height: answer.clientHeight + 'px' },
				{ height: 0 }
			], { duration: 500 });

			animation.addEventListener('finish', function(){
				cl.remove('open');
			});
		}
		else{
			cl.add('open');

			answer.animate([
				{ height: 0 },
				{ height: answer.clientHeight + 'px' }
			], { duration: 500 });
		}
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
