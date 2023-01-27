$(function() {
    const API_ADDRESS = "https://www.dnd5eapi.co";

    $(".restart").hide();
    $(".spell-result").hide();

    $(".start").click(function() {
        $(".start").hide();
        $(".restart").show();
        $(".spell-result").show()
        castSpell();
    });

    $(".restart").click(function() {
        $(".box").empty();
        castSpell();
    });

    function castSpell() {
        fetch(API_ADDRESS + "/api/spells/")
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            let randomSpell = generateRandomSpell(data.results);
    
            fetch(API_ADDRESS + randomSpell.url)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                let spellsClass = [];
                let spellsComponents = [];
                let spellsDesc = [];
    
                for(let x = 0; x <= data.classes.length - 1; x++) {
                    spellsClass.push(data.classes[x].name);
                }
    
                for(let y = 0; y <= data.components.length - 1; y++) {
                    spellsComponents.push(data.components[y]);
                }
            
                for(let z = 0; z <= data.desc.length - 1; z++) {
                    spellsDesc.push(data.desc[z]);
                }
                
                $(".name").text(data.name);
                $(".first").append("<p>Level " + data.level + " " +  data.school.name  + " | " + spellsClass.join(", ") + "</p>");
    
                if(data.ritual == true && data.concentration == true) {
                    $(".second").append("<p><b>Ritual spell</b> | <b>Concentration spell</b></p>");
                } else if(data.ritual == true) {
                    $(".second").append("<p><b>Ritual spell</b></p>");
                } else if(data.concentration == true) {
                    $(".second").append("<p><b>Concentration spell</b></p>");
                }
    
                $(".second").append("<p><b>Range: </b>" + data.range + "</p>");
                $(".second").append("<p><b>Casting time: </b>" + data.casting_time + "</p>");
                $(".second").append("<p><b>Duration: </b>" + data.duration + "</p>");
                $(".second").append("<p><b>Components: </b>" + spellsComponents.join(", ") + "</p>");
    
                if(data.material != undefined) {
                    $(".second").append("<p><b>Materials: </b>" + data.material + "</p>");
                } 
    
                $(".third").append("<p>" + spellsDesc.join("<br><br>") + "</p>");
            })
            .catch((error) => {
                $("main").append("<h2>Something went wrong: " + error + "</h2>");
            })
        })
        .catch((error) => {
            $("main").append("<h2>Something went wrong: " + error + "</h2>");
        })
    }

    function generateRandomSpell(targetArray) {
        return targetArray[Math.floor(Math.random() * targetArray.length)];
    }
});