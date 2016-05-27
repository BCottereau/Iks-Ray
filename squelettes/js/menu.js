jQuery(document).ready(function(){
	var largeurEcran = screen.width;
	var hauteurEcran = screen.height;
	var largeurSlider = jQuery('#container-slider').width();
	
	
	jQuery('#container-slider ul').width( (largeurSlider * 2) + "px");
	jQuery('#container-slider').height( (hauteurEcran - 213) + "px");
	jQuery('#container-slider li').width( (largeurSlider) + "px");
	
	jQuery('#etage-2').css("display", "none");
	
	jQuery('#etage-1').click(function(){
		jQuery('#container-slider ul').animate({left: -largeurSlider + "px"});
		jQuery('#etage-2').css("display", "block");
		jQuery('#etage-1').css("display", "none");
	});
	jQuery('#etage-2').click(function(){
		jQuery('#container-slider ul').animate({left: 0 + "px"});
		jQuery('#etage-1').css("display", "block");
		jQuery('#etage-2').css("display", "none");
	});
	
	function dirSalle(salle){

			/*window.location.href="index.html?salle=" + salle;*/
			setTimeout(function() {window.location.href="equipe.html?salle=" + salle;},310);
		
	}
	jQuery('.salle-rose').click(function(){document.getElementById("e2").src = "design/e2-rose.png"; dirSalle("rose");  });
	jQuery('.salle-bleu').click(function(){document.getElementById("e2").src = "design/e2-bleu.png"; dirSalle("bleu");  });
	jQuery('.salle-rouge').click(function(){document.getElementById("e2").src = "design/e2-rouge.png"; dirSalle("rouge");  });
	jQuery('.salle-marron').click(function(){document.getElementById("e2").src = "design/e2-marron.png"; dirSalle("marron");  });
	
	jQuery('.salle-vert').click(function(){document.getElementById("e1").src = "design/e1-vert.png"; dirSalle("vert");  });
	jQuery('.salle-orange').click(function(){document.getElementById("e1").src = "design/e1-orange.png"; dirSalle("orange");  });
	jQuery('.salle-violet').click(function(){document.getElementById("e1").src = "design/e1-violet.png"; dirSalle("violet");  });
	
});