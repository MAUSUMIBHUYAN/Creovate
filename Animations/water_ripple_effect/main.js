$(document).ready(()=>{
	$(".hero").ripples({
		resolution: 512,
		dropRadius: 30,
		perturbance: 0.01,
	});

	setInterval(function () {
		var $el = $(".hero");
		var x = Math.random() * $el.outerWidth();
		var y = Math.random() * $el.outerHeight();
		var dropRadius = 50;
		var strength = 0.04 + Math.random() * 0.04;

		$el.ripples("drop",x,y,dropRadius,strength);
	}, 2000);
});