window.addEventListener('load', function(){

	let form = document.querySelector('.form');
	let inputs = form.querySelectorAll('.check');
	let validation = {
		name: {
			pattern: /^.{2,32}$/,
			errorText: 'От 2 до 32 символов'
		},
		phone: {
			pattern: /^\d{7,15}$/,
			errorText: 'Только цифры, от 7 до 15'
		},
		email: {
			pattern: /^.+@.+\..+$/,
			errorText: 'Введите корректный email'
		}
	};

	form.addEventListener('submit', function(e){
		let hasError = false;
		
		for(let i = 0; i < inputs.length; i++){
			let inp = inputs[i];
			let rule = validation[inp.dataset.rule];

			if(rule !== undefined && !rule.pattern.test(inp.value)){
				inp.classList.add('err');
				hasError = true;
				showError(inp, rule.errorText);
			}
		}

		if(hasError){
			e.preventDefault();
		}
	});

	form.addEventListener('focusin', function(e){
		if(e.target.classList.contains('check')){
			e.target.classList.remove('err');
			showError(e.target, '');
		}
	});
});

function showError(input, message){
	let box = input.closest('.form_input_box');
	let msgBox = box.querySelector('.error-message');
	msgBox.innerHTML = message;
}