$(function() {
    const API_ADDRESS = "https://www.dnd5eapi.co";

    //onclick function, missing a reload function. Data is just added on every click
    $(".start").on("click", castSpell);

    function castSpell() {
        fetch(API_ADDRESS + "/api/spells/")
        .then(response => response.json())
        .then(data => {
            let randomSpell = generateRandomSpell(data.results);
    
            fetch(API_ADDRESS + randomSpell.url)
            .then(response => response.json())
            .then(data => {
                let spellsClass = [];
                let spellsComponents = [];
                let spellsDesc = [];
    
                for(i = 0; i <= data.classes.length - 1; i++) {
                    spellsClass.push(data.classes[i].name) 
                }
    
                for(i = 0; i <= data.components.length - 1; i++) {
                    spellsComponents.push(data.components[i]) 
                }
            
                for(i = 0; i <= data.desc.length - 1; i++) {
                    spellsDesc.push(data.desc[i]) 
                }
                
                $(".name").text(data.name);
    
                if(data.ritual == true && data.concentration == true) {
                    $(".zero").append("<p><i>Ritual spell</i> | <i>Concentration spell</i></p>")
                } else if(data.ritual == true) {
                    $(".zero").append("<p><i>Ritual spell</i></p>")
                } else if(data.concentration == true) {
                    $(".zero").append("<p><i>Concentration spell</i></p>")
                }
    
                $(".first").append("<p>Level " + data.level + " " +  data.school.name  + " | " + spellsClass.join(", ") + "</p>");
                $(".second").append("<p><b>Range: </b>" + data.range + "</p>");
                $(".second").append("<p><b>Casting time: </b>" + data.casting_time + "</p>");
                $(".second").append("<p><b>Duration: </b>" + data.duration + "</p>");
                $(".second").append("<p><b>Components: </b>" + spellsComponents.join(", ") + "</p>");
    
                if(data.material != undefined) {
                    $(".second").append("<p><b>Materials: </b>" + data.material + "</p>");
                } 
    
                $(".third").append($("<p>" + spellsDesc.join("<br><br>") + "</p>"));
            });
        });
    }

    function generateRandomSpell(targetArray) {
        return targetArray[Math.floor(Math.random() * targetArray.length)];
    }
});