$(document).ready(function () {
    // Flip Animation + Blue Color Effect
    $(".Flip").click(function () {
        $(".loading div").css({
            "animation-name": "flip, color",
            "animation-duration": "2s, 4s",
            "animation-iteration-count": "infinite, infinite",
            "transform-origin": "center"
        });
    });

    // Jump Animation + Blue Color Effect
    $(".Jump").click(function () {
        $(".loading div").css({
            "animation-name": "jump, color",
            "animation-duration": "1s, 4s",
            "animation-iteration-count": "infinite, infinite"
        });
    });

    // Rotate Animation + Blue Color Effect
    $(".Rotate").click(function () {
        $(".loading div").css({
            "animation-name": "rotate, color",
            "animation-duration": "2s, 4s",
            "animation-iteration-count": "infinite, infinite"
        });
    });
});
