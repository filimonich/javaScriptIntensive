window.addEventListener('load', function(){

	new Timer('.timer1', 10);
	let t2 = new TimerFormatted('.timer2', 5000);
	console.log(t2);

	document.querySelector('.getSale').addEventListener('click', function(){
		this.disabled = true;
		this.innerHTML = 'Скидка Ваша!';
		t2.stop();
	});
});

class Timer{
	constructor(boxSelector, initialTime){
		this.box = document.querySelector(boxSelector);
		this.time = initialTime;
		this.interval = null;
		this.render();
		this.start();
	}

	render(){
		this.box.innerHTML = this.time;
	}

	tick(){
		this.time--;
		this.render();

		if(this.time < 1){
			this.stop();
		}
	}

	start(){
		this.interval = setInterval(() => this.tick(), 1000);
	}

	stop(){
		clearInterval(this.interval);
	}
}

class TimerFormatted extends Timer{
	render(){
		let h = parseInt(this.time / 3600);
		let hs = this.time % 3600;
		let m = parseInt(hs / 60);
		let s = hs % 60;

		this.box.innerHTML = `${h}:${m}:${s}`;
	}

	/* tick(){
		super.tick();
		console.log(this.time);
	} */
}

/* 
<div bgcolor="green">
	<span border="1px"></span>
</div>

<div class="box">
	<span class="item"></span>
</div>

.box{
	background: green
}

.item{
	border: 1px solid red;
}

<div class="box">
	<span class="box__item shadow"></span>
</div>

.box{
	background: green
}

.box__item{
	border: 1px solid red;
}

.shadow{

}

<div class="bg-green">
	<span class="border-1"></span>
</div> */