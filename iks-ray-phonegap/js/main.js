$(document).ready(function(){
	//alert("hello");
	
	
	
	
//var margin = {top: 20, right: 20, bottom: 30, left: 40};
var infoTitre = document.getElementById("titre");
var infoColl = document.getElementById("collection");
var infoCote = document.getElementById("cote");
var infoCouv = document.getElementById("infos-couverture");
	
var svgLignes = [{url:"ligne-1.svg",svg:false,d:"M53.715-7.12V6.976c-15.673-0.001-57.306,0-86.59-50.039l12.165-7.121C4.492-7.121,38.987-7.12,53.715-7.12z"},
	{url:"ligne-2.svg",svg:false,d:"M9.2-17.944c0-10.459,5.854-22.275,11.575-32.186l12.208,7.047c-10.579,18.321-10.64,25.907-8.829,29.043 c1.809,3.132,8.405,6.867,29.562,6.867V6.922c-15.707,0-34.648-1.581-41.768-13.914C10.013-10.34,9.2-14.049,9.2-17.944z"},
	{url:"ligne-3.svg",svg:false,d:"M-53.63-7.172h5.887l0.067,0.001c0.293,0.005,29.468,0.549,47.504,0.001 C17.96-7.72,46.437-7.21,48.396-7.172h5.32V6.923l-5.518-0.001C47.901,6.916,18.294,6.372,0.256,6.92 c-18.127,0.551-46.187,0.04-48.132,0.003h-5.753L-53.63-7.172z"}];

var grille = [];
var livres = [];
var s = 0;

var ligneNum = 0, rot = 0, equipeJoueur = 2;
var mode = "explore";

var equipes = [
	{theme:"Arts Plastiques", couleur:"#a5e034"},
	{theme:"Cinéma", couleur:"#4242cc"},
	{theme:"Photographie", couleur:"#00c9ff"},
	{theme:"Musique", couleur:"#dd2f3c"},
	{theme:"Art du spectacle", couleur:"#f7e608"},
	{theme:"beta-testeur", couleur:"#00ff00"}
];

var width = window.innerWidth - 0;
var height = window.innerHeight - 0;
var radius = 64;
var etendu = 3;
var padding = 1;
          
var color = d3.scale.linear()
    .domain([0, 20])
    .range(["white", "steelblue"])
    .interpolate(d3.interpolateLab);

var hexbin = d3.hexbin()
    .size([width, height])
    .radius(radius);
	
//-------------------------------------------

var zoom = d3.behavior.zoom()
    .scaleExtent([0.5, 1.3])
    .on("zoom", zoomed);

var svg = d3.select("#content").append("svg")
    .attr("width", width )
    .attr("height", height )
	.append("g")
	.call(zoom).on("dblclick.zoom", null).append("g");

svg.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("class", "mesh")
    .attr("width", width)
    .attr("height", height);
	
$(".icone-equipe-joueur").css("background-color", equipes[equipeJoueur].couleur);
$("#info-equipe-joueur").html("Équipe : <br>" + equipes[equipeJoueur].theme);
	
			
	$.getJSON( "2.json", function( data ) {
		
		$.each( data, function( key, val ) {
			livres.push(val);
		});

	}).done(function() {
		
		//alert( livres[1].Titre );
		//création de la grille
		creaGrille();
		
		var exas = svg.append("g")
			.selectAll(".hexagon")
			.data(grille)
			.enter().append("g")
			.attr("id", function(d, i){
				return "g-" + i;
			})
			.attr("class", function(d) { return "hexagon x" + d.coordinates[0] + " y" + d.coordinates[1]; });
			
		var groupe = document.querySelectorAll("g .hexagon");
		var nbrGroupe = groupe.length;
		
		exas.append("defs").append("pattern")
			.attr("id", function(d, i) {
				return "img-" + i; 
			})
			.attr("width", 1)
			.attr("height", 1)
			.attr("x", 0)
			.attr("y", 0)
			.append("image")
			.attr("width", 112)
			.attr("height", 152)
			.attr("xlink:href", function(d) {
				return d.couverture; 
			});
		
		exas.append("path")
			.attr("d", hexbin.hexagon())
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")"; 
			})
			.style("fill", function(d, i) {
				return d.bgcolor; 
				//return "#000";
			});
		
		exas.append("path")
			.attr("d", hexbin.hexagon())
			.attr("id", function(d, i) {
				return "couv-" + i; 
			})
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")"; 
			})
			.style("fill", function(d, i) {
				//return d.bgcolor; 
				return "url(#img-" + i + ")";
			});
		
		

		exas.append("path")
			.attr("transform", function(d){
				return "transform", " translate(" + (d.x-(radius)+64) + "," + (d.y-(radius)+64) + ") rotate("+60+")"; 
			})
			.style("fill",equipes[0].couleur)
			.attr("d", function(d, i){
				if(i < 0){
					return svgLignes[1].d; 
				}
			});
			
					
		/*exas.append("image")
			.attr("transform", function(d){
				return "translate(" + (d.x-(radius)+40) + "," + (d.y-(radius)+40) + ")"; 
			})
			.attr("width",(radius*0.8)+"px")
			.attr("height",(radius*0.8)+"px")
			.attr("xlink:href",function(d){
				return d.couverture;
				//return "livre.jpg";
			});*/
		/*exas.append("text")
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")"; 
			})
			.attr("text-anchor","middle")
			.text(function(d, i){
				return d.nom;
			});*/
			
		svg.append("path")
			.attr("d", hexbin.hexagon())
			.attr("id", "select-color")
			.attr("transform", function(d) {
				return "translate(" + 0 + "," + 0 + ")"; 
			})
			.style("fill", "#f00");
			
		svg.append("image")
			.attr("width",(radius*2.38)+"px")
			.attr("height",(radius*2.38)+"px")
			.attr("id", "select")
			.attr("xlink:href", "select.png");
			
		svg.append("image")
			.attr("width",(radius*3.3)+"px")
			.attr("height",(radius*3.3)+"px")
			.attr("id", "selectRot")
			.attr("xlink:href", "select-rot.png");
			
		var select = document.getElementById("select");
		select.setAttribute("display", "none");
		var selectRot = document.getElementById("selectRot");
		selectRot.setAttribute("display", "none");
		var selectColor = document.getElementById("select-color");
		selectColor.setAttribute("display", "none");

		
		/*var btn = document.getElementById("btn");
		btn.addEventListener("click", function(){

		}, true);*/
		
		
		var btnP1 = document.getElementById("btn-p1");
		btnP1.addEventListener("click", function(){
			if(mode == "pose"){
				ligneNum = 1;
				d3.select("#pose-en-cours").attr("d", svgLignes[ligneNum].d);
			}
		}, true);
		var btnP0 = document.getElementById("btn-p0");
		btnP0.addEventListener("click", function(){
			if(mode == "pose"){
				ligneNum = 0;
				d3.select("#pose-en-cours").attr("d", svgLignes[ligneNum].d);
			}
		}, true);
		var btnP2 = document.getElementById("btn-p2");
		btnP2.addEventListener("click", function(){
			if(mode == "pose"){
				ligneNum = 2;
				d3.select("#pose-en-cours").attr("d", svgLignes[ligneNum].d);
			}
		}, true);
		
		
		var btnValider = document.getElementById("btn-valider");
		btnValider.addEventListener("click", function(){
			if(mode == "pose")
			{
				selectRot.setAttribute("display", "none");
				d3.select("#pose-en-cours").attr("id", null);
				grille[s].ligneNum = ligneNum;
				grille[s].rot = rot; // on enregistre les infos sur la grille
				grille[s].equipe = equipeJoueur;
				$("#interface-pose").slideUp();
				mode = "explore";
			}
		}, true);

		
		select.addEventListener("click", function(){
			/*alert( grille[s].titre + " \n " + livres[s].dispos[0].Collection);*/
			/*alert( "x " + grille[s].coordinates[0] + " ,     y " + grille[s].coordinates[1]);*/
			/*var test = getHexaId(grille[s].coordinates[0]+1, grille[s].coordinates[1]-1);
			if(test >= 0){
				alert( "La pièce en haut à droite se nomme : \n" + grille[test].titre );
			}
			else{alert("pas de voisin en haut à droite !");}*/
			
			if(mode == "explore")
			{
				if(grille[s].ligneNum == -1)
				{
					// appareil photo !
					document.getElementById("couv-" + s).style.display = "none";
					select.setAttribute("display", "none");
					selectColor.setAttribute("display", "none");
					selectRot.setAttribute("transform", "translate(" + (grille[s].x - 62) + "," + (grille[s].y - 112) + ")");
					selectRot.setAttribute("display", "block");
					
					/*
					var ligneNum = prompt("Ligne numero  0, 1, 2", "0");
					var rot = prompt("rotation : 0, 60 , 120 etc.", "0");*/
					
					d3.select("#g-" + s).append("path")
					.attr("transform", " translate(" + (grille[s].x-(radius)+64) + "," + (grille[s].y-(radius)+64) + ") rotate("+rot+")" )
					.attr("id", "pose-en-cours")
					.style("fill",equipes[equipeJoueur].couleur)
					.attr("d",svgLignes[ligneNum].d);

					$("#interface-pose").slideDown();
					$("#interface-infos").slideUp();
					mode = "pose";
				}
				else{alert("L'équipe "+ equipes[grille[s].equipe].theme +" à déjà posé une ligne ici.");}
			}
		
		}, true);
		
		
		selectRot.addEventListener("click", function(){
			if(mode == "pose")// condition pas vraiment obligatoire, car cet élément est masqué en mode "explore"
			{
				//alert("tourne");
				//d3.select("#pose-en-cours").attr("d",svgLignes[ligneNum].d);
				rot += 60;
				if(rot >= 360){rot = 0;}
				
				d3.select("#pose-en-cours")
				.attr("transform", " translate(" + (grille[s].x-(radius)+64) + "," + (grille[s].y-(radius)+64) + ") rotate("+rot+")" );
				
				
			}
		}, true);
		
		
		for(i = 0; i < nbrGroupe ; i++)
		{
			groupe[i].addEventListener("click", function(e){
			
				if(mode == "explore")
				{
					//alert(e.target.parentNode.nodeName.toLowerCase());
					var id = Number(e.target.parentNode.id.substr(2));
					s = id;
					//alert( id );
					//alert(livres[id].dispos[0].Collection);
					//alert(grille[id].titre);
					
					infoColl.innerHTML = livres[id].dispos[0].Collection;
					infoColl.style.backgroundColor = grille[id].bgcolor;
					infoCote.innerHTML = livres[id].dispos[0].Cote;
					infoTitre.innerHTML = grille[id].titre;
					infoCouv.src = grille[id].couverture;
							
					select.setAttribute("transform", "translate(" + (grille[id].x - 74) + "," + (grille[id].y - 80) + ")");
					select.setAttribute("display", "block");
					selectColor.setAttribute("transform", "translate(" + (grille[id].x - 0) + "," + (grille[id].y - 0) + ")");
					selectColor.setAttribute("display", "block");
					$("#select-color").css("fill", grille[id].bgcolor);
					
					$("#interface-infos").slideDown();
					
					/*document.getElementById("couv-" + id).style.display = "none";*/
				}
				
				
			}, false);
		}
	
	});



	
function creaGrille(){
	
	//création de la grille
	var id = 0,
		limit1 = 0,
		limit2 = etendu; //nombre d'hexagone autour du centre
		
		
	//alert(livres[1].Titre);
	
	var bgcolor = "#eee";
	var k = 0;
    for (var j = -etendu; j <= etendu; j++) {
        var i = limit1;
        while (i <= limit2) {

			if(livres[k].dispos[0].Collection == "Arts plastiques - SA"){bgcolor = "#8caf2c";}
			else if(livres[k].dispos[0].Collection == "Cinéma - SC"){bgcolor = "#2c2c84";}
			else if(livres[k].dispos[0].Collection == "Musique - SM"){bgcolor = "#9b212a";}
			else if(livres[k].dispos[0].Collection == "Photographie - SP"){bgcolor = "#43aed4";}
			else if(livres[k].dispos[0].Collection == "Arts du spectacle - ST"){bgcolor = "#d0177d";}
			else if(livres[k].dispos[0].Collection == "Urbanisme - T"){bgcolor = "#d3bf09";}
			else if(livres[k].dispos[0].Collection == "Géographie - X"){bgcolor = "#277038";}
			else if(livres[k].dispos[0].Collection == "Bandes dessinées"){bgcolor = "#43aed4";}
			else if(livres[k].dispos[0].Collection == "Sciences - L"){bgcolor = "#6b1756";}
			else if(livres[k].dispos[0].Collection == "Informatique Tech - N"){bgcolor = "#2c2c84";}
			else if(livres[k].dispos[0].Collection == "Philosophie - B"){bgcolor = "#674b37";}
			else if(livres[k].dispos[0].Collection == "Psychologie - C"){bgcolor = "#ca8330";}
			else{bgcolor = "#eee";}
				
        	grille.push({
                id: id++,
                coordinates: [i, j],
                lastSelected: 0,
                type: 'regular',
                idUti: -1,
                login: "",
                nbDoc: -1,
                role: "",
                resource: false,
                length:i*j,
                nom:"exa "+i+","+j,
				titre:"" + livres[k].Titre,
				isbn: "" + livres[k].isbn,
				bgcolor: "" + bgcolor,
				couverture: livres[k].couverture,
				ligneNum: -1,
				rot:0,
				equipe:-1
                
            });		        				        		
            i++;
			k++;
        }
        if (j < 0) {
            limit1--;
        } else {
            limit2--;
        }
		
    }

	
    // http://goo.gl/8djhT
	var tilted = false, // true is horizontal alignment
		size = radius*2; // hexagon size
	
    var stepX = tilted ? size * 3 / 4 : Math.sqrt(3) * size / 2,
        stepY = tilted ? Math.sqrt(3) * size / 2 : size * 3 / 4,
        offset = size / Math.sqrt(3) * 3 / 4;
        
   grille.map(function(d, i) {
        var i = d.coordinates[0],
            j = d.coordinates[1],
            x = stepX * i + (!tilted ? offset * j : 0) + width / 2,
            y = stepY * j + (tilted ? offset * i : 0) + height / 2;
        d.centroid = [Math.round(x * 1e2) / 1e2, Math.round(y * 1e2) / 1e2];
        d.x = Math.round(x * 1e2) / 1e2;
        d.y = Math.round(y * 1e2) / 1e2;
        d.visible = !outbounds(x, y);
    });

}

function outbounds(x, y) {
    return x < padding || x > width - padding || y < padding || y > height - padding;
}

function zoomed() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}
function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}
function dragended(d) {
  d3.select(this).classed("dragging", false);
}

/* fonction retourne l'id d'un hexagone à partir de X et Y */
function getHexaId( x, y){
	var classX = "x" + x;
	var classY = "y" + y;
	var hexa = document.querySelector("." + classX + "." + classY);
	var id = -1; /* retourne ce chiffre si l'hexagone n'existe pas (si on dépasse la map par exemple) */
	
	if(hexa){id = Number( hexa.id.substr(2));}
	
	return id;
}


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	$('#btncodebarre').click(function(event){
	
		cordova.plugins.barcodeScanner.scan(function(result){
			if(!result.cancelled)
			{
				$('#isbn').text('isbn : ' + result.text);
				
				$.getJSON('https://www.googleapis.com/books/v1/volumes?q=' + result.text, 
				{
					q: 'isbn:'+result.text
				}, function(data) {
					$('#titre').text("aaaaaa");
					$('#titre').text(data.items[0].volumeInfo.title);
				});
			}
		}, function(error){
			alert("Erreur : " + error);
		});
	
	});
	*/
	
	
	/*
	$('.btnphoto').click(function(event){

		//alert("Click");
		
		
		navigator.camera.getPicture(
			function(image) {
				$('#maphoto').attr('src', 'data:image/jpeg;base64,' + image);
			},
			function() {
				alert('Erreur !'); 
			},
			{
				quality: 75,
				sourceType: Camera.PictureSourceType.CAMERA,
				cameraDirection: Camera.Direction.BACK,
				targetWidth: 500,
				targetHeight: 500,
				destinationType: Camera.DestinationType.DATA_URL
			}
		);
	});*/
	
	$('#btn1').click(function(event){
	
		navigator.vibrate(2000);
	
	});
	
	$('#btn2').click(function(event){
	
		navigator.vibrate([50, 50, 200, 300, 500, 600, 50, 50, 50, 50, 50, 50]);
	
	});
	
	$('#btn3').click(function(event){
	
		navigator.notification.beep(1);
	
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});