$(function() {
    const API_ADDRESS = "https://www.dnd5eapi.co";
    const API_SPELL = "https://api.open5e.com/spells";
    const API_PAGES = [
        "",
        "/?page=2",
        "/?page=3",
        "/?page=4",
        "/?page=5",
        "/?page=6",
        "/?page=7",
        "/?page=8",
        "/?page=9",
        "/?page=10",
        "/?page=11",
        "/?page=12",
        "/?page=13",
        "/?page=14",
        "/?page=15",
        "/?page=16",
        "/?page=17"
    ];

    $(".spell-result").hide();

    $(".randomize").click(function() {
        $(".box").empty();
        $(".spell-result").show()
        castRandomSpell();
    });

    $(".search").click(function() {
        $(".box").empty();
        $(".spell-result").show();
        searchSpell(API_SPELL, API_PAGES); //ERROR: when page does not have any result from input, h2 append does not disappear either 
    });

    function searchSpell(targetApi, targetApiPage) {
        let classInput = $("#class").val();
        let levelInput = $("#level").val();
        
        if(classInput == undefined || levelInput == undefined) {
            $(".name").text("Please select a class and level to proceed")
        }

        let apiResults = [];
        let apiPage = randomGenerator(targetApiPage);
        let apiAddress = targetApi + apiPage;

        fetch(apiAddress)
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            for(let i = 0; i <= data.results.length - 1; i++) {
                if(data.results[i].dnd_class.toLowerCase().includes(classInput) && data.results[i].level_int == levelInput) {
                    apiResults.push(data.results[i])
                } 
            }

            let spellResult = randomGenerator(apiResults);

            $(".name").text(spellResult.name);
            $(".first").append("<p>" + spellResult.level + " " +  spellResult.school  + " | " + spellResult.dnd_class + "</p>");
            
            if(spellResult.ritual.includes("yes") && spellResult.concentratrion.includes("yes")) {
                $(".second").append("<p><b>Ritual spell</b> | <b>Concentration spell</b></p>");
            } else if(spellResult.ritual.includes("yes")) {
                $(".second").append("<p><b>Ritual spell</b></p>");
            } else if(spellResult.concentration.includes("yes")) {
                $(".second").append("<p><b>Concentration spell</b></p>");
            }

            $(".second").append("<p><b>Range: </b>" + spellResult.range + "</p>");
            $(".second").append("<p><b>Casting time: </b>" + spellResult.casting_time + "</p>");
            $(".second").append("<p><b>Duration: </b>" + spellResult.duration + "</p>");
            $(".second").append("<p><b>Components: </b>" + spellResult.components + "</p>");

            if(spellResult.material != "") {
                $(".second").append("<p><b>Materials: </b>" + spellResult.material + "</p>");
            } 

            $(".third").append($("<p>" + spellResult.desc + "</p>"));
        })
        .catch((error) => {
            $("main").append($("<h2>Something went wrong: " + error + "</h2>"));
        })
    }

    //FINISHED FUNCTION FOR RANDOMIZER
    function castRandomSpell() {
        fetch(API_ADDRESS + "/api/spells/")
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            let randomSpell = randomGenerator(data.results);
    
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
    
                $(".third").append($("<p>" + spellsDesc.join("<br><br>") + "</p>"));
            })
            .catch((error) => {
                $("main").append($("<h2>Something went wrong: " + error + "</h2>"));
            })
        })
        .catch((error) => {
            $("main").append($("<h2>Something went wrong: " + error + "</h2>"));
        })
    }

    function randomGenerator(targetArray) {
        return targetArray[Math.floor(Math.random() * targetArray.length)];
    }
});