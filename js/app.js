$(function() {
    const API_ADDRESS = "https://www.dnd5eapi.co";
    const API_SPELL = "https://api.open5e.com/spells";

    $(".spell-result").hide();

    $(".randomize").click(function() {

        //Make the select go to the first value
        //$("#class").find("option:none").attr("selected", "selected");
        //$("#level").find("option.none").attr("selected", "selected");

        $(".box").empty();
        $(".spell-result").show()
        castRandomSpell();
    });

    $(".search").click(function() {
        $(".box").empty();
        $(".spell-result").show();
        searchSpell();
    });

    function searchSpell() {
        let classInput = $("#class").val();
        let levelInput = $("#level").val();
        
        if(classInput == undefined || levelInput == undefined) {
            $(".name").text("Please select a class and level to proceed")
        }

        let apiArray = [
            " ",
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
        let apiResults = [];

        let apiAddress = randomGenerator(apiArray);

        fetch(API_SPELL + apiAddress)
        .then((response) => response.json())
        .then((data) => {
            
            //LOGIC
            /*
                Go through data.results array
                Check if input exists in any of the index
                    IF it does      => do everything under CODE
                    ELSE (if not)   => generate new random page 
                        Fetch data from new page 
                        Go through data.results array 
                        Check if input exists in any of the index
                            IF it does      => do everything under CODE
                            ELSE (if not)   => generate new random page 
                                AND SO ON....
            */

            //LOGICAL TEST
            let testPage = null;

            for(let x = 0; x <= data.results.length -1; x++) {
                if(data.results[x].dnd_class.toLowerCase().includes(classInput) && data.results[x].level_int == levelInput) {
                    testPage = true;
                    console.log(testPage);
                    break;
                } else {
                    testPage = false;
                    console.log(testPage);
                }
            }

            //RESULT OF ABOVE TEST
            if(testPage == true) {
                console.log("true is true");
                appendSpell();
            } else {
                console.log("false is false");
                
                apiAddress = randomGenerator(apiArray);
                console.log(apiAddress);
                
                appendSpell();
                /*
                fetch(API_SPELL + apiAddress)
                .then((response) => response.json())
                .then((data) => {
                    appendSpell()
                })*/

            }

            
            
            //CODE
            function appendSpell() {
                for(let i = 0; i <= data.results.length - 1; i++) {
                    if(data.results[i].dnd_class.toLowerCase().includes(classInput) && data.results[i].level_int == levelInput) {
                        apiResults.push(data.results[i])
                    } 
                }


    
                let randomSpecSpell = randomGenerator(apiResults);
                console.log(randomSpecSpell);
    
                $(".name").text(randomSpecSpell.name);
                $(".first").append("<p>" + randomSpecSpell.level + " " +  randomSpecSpell.school  + " | " + randomSpecSpell.dnd_class + "</p>");
                
                if(randomSpecSpell.ritual.includes("yes") && randomSpecSpell.concentratrion.includes("yes")) {
                    $(".second").append("<p><b>Ritual spell</b> | <b>Concentration spell</b></p>");
                } else if(randomSpecSpell.ritual.includes("yes")) {
                    $(".second").append("<p><b>Ritual spell</b></p>");
                } else if(randomSpecSpell.concentration.includes("yes")) {
                    $(".second").append("<p><b>Concentration spell</b></p>");
                }
    
                $(".second").append("<p><b>Range: </b>" + randomSpecSpell.range + "</p>");
                $(".second").append("<p><b>Casting time: </b>" + randomSpecSpell.casting_time + "</p>");
                $(".second").append("<p><b>Duration: </b>" + randomSpecSpell.duration + "</p>");
                $(".second").append("<p><b>Components: </b>" + randomSpecSpell.components + "</p>");
    
                if(randomSpecSpell.material != "") {
                    $(".second").append("<p><b>Materials: </b>" + randomSpecSpell.material + "</p>");
                } 
    
                $(".third").append($("<p>" + randomSpecSpell.desc + "</p>"));
            }
        })
    }

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