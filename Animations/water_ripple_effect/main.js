$(document).ready(() => {
	$(".hero").ripples({
		resolution: 512,
		dropRadius: 30,
		perturbance: 0.01,
	});

	setInterval(() => {
		let $el = $(".hero");
		let x = Math.random() * $el.outerWidth();
		let y = Math.random() * $el.outerHeight();
		let dropRadius = 50;
		let strength = 0.04 + Math.random() * 0.04;

		$el.ripples("drop", x, y, dropRadius, strength);
	}, 2000);
});
