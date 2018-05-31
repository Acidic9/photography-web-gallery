var imgs = [
	"img/photoshoot/Building_Pattern.jpg",
	"img/photoshoot/Focus_Floor.jpg",
	"img/photoshoot/Moon.jpg",
	"img/photoshoot/Perspective_Wall.jpg",
	"img/photoshoot/Plant.jpg",
	"img/photoshoot/Street_Art_Face.jpg",
	"img/photoshoot/Textured_Shirt.jpg",
	"img/photoshoot/Walking_Couple.jpg",
	"img/photoshoot/Water_Stream.jpg",
	"img/photoshoot/Wet_Floor.jpg",
	"img/photoshoot/Wet_Railing.jpg",
	"img/photoshoot/Wet_Window.jpg",
	"img/photoshoot/Wires_Over_Building.jpg",
	"img/photoshoot/Beaded_Banner.jpg",
	"img/photoshoot/Reed.jpg"
],
	activeImage = 0,
	shadowDisabled = false;

for (var i = 0; i < imgs.length; i++) {
	console.log(imgs[i]);
	$("#container").append('<img src="'+imgs[i]+'" id="'+i+'" class="image-preview" style="display:none">');
	$("#"+i).on('load', function() {
		$(this).fadeIn();
	});
}

$("#shadow").click(function() {
	if (!shadowDisabled)
		$(this).fadeOut("fast");
});

$(".image-preview").click(function() {
	activeImage = parseInt($(this).attr("id"));
	var imgSrc = $(this).attr("src");
	$("#preview img").attr("src", imgSrc);
	if (activeImage >= imgs.length - 1) {
		$("#next").hide();
	} else {
		$("#next").show();
	}
	if (activeImage <= 0) {
		$("#previous").hide();
	} else {
		$("#previous").show();
	}
	$("#shadow").fadeIn();
	updateCurrentImageIndicator();
});

$("#previous").click(function(e) {
	e.stopPropagation();
	if (activeImage >= 0) {
		console.log("DOING IT");
		$("#preview img").attr("src", imgs[activeImage - 1]);
		activeImage--;
	}
	if (activeImage >= imgs.length - 1) {
		$("#next").hide();
	} else {
		$("#next").show();
	}
	if (activeImage <= 0) {
		$(this).hide();
	} else {
		$(this).show();
	}
	updateCurrentImageIndicator();
});

$("#next").click(function(e) {
	e.stopPropagation();
	if (activeImage < imgs.length-1) {
		console.log("DOING IT");
		$("#preview img").attr("src", imgs[activeImage + 1]);
		activeImage++;
	}
	if (activeImage <= 0) {
		$("#previous").hide();
	} else {
		$("#previous").show();
	}
	if (activeImage >= imgs.length - 1) {
		$(this).hide();
		shadowDisabled = true;
		setTimeout(function() { shadowDisabled = false; }, 500);
	} else {
		$(this).show();
	}
	updateCurrentImageIndicator();
});

$(window).resize(function() {
	$("#preview img").css("display", "flex");
	setTimeout(function() { $("#preview img").css("display", "block"); }, 0);
});

function updateCurrentImageIndicator() {
	$("#current-image").text((activeImage + 1) + "/" + imgs.length);
}