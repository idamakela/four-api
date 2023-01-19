$(function() {
    const API_ADDRESS = "https://www.dnd5eapi.co";
    const API_SPELL = "https://api.open5e.com/spells";

    //LOGICAL TEST VARIABLES 
    let result = false;
    //

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




    //LOGICAL TEST 2
    let classInput = "sorcerer";
    let levelInput = 2;
    
    //while loop has relation to if else in the function
        //the result variable needs to be set in if else in function 
    /*
        q = 0
    while(q <= 11) {
        if(classInput == undefined || levelInput == undefined) {
            $(".name").text("Please select a class and level to proceed")
            q++;
        } else {
            testPageResult(API_SPELL);
            console.log("false");
            q++;
        }
    }
    console.log("while loop is broken")
    */
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

   testPageResult(API_SPELL, API_PAGES);
   
   
   function testPageResult(targetApi, targetApiPage) {
        //Can I have this outside the function??
        //let classInput = $("#class").val();
        //let levelInput = $("#level").val();


        let apiPage = randomGenerator(targetApiPage);
        let apiAddress = targetApi + apiPage;


        //prob something weird with fetch 
        fetch(apiAddress)
        .then((response) => response.json())
        .then((data) => {
            //issue with fetch according to chrome debugger
            console.log(data);
            
            

            for(let x = 0; x <= data.results.length -1; x++) {

                if(data.results[x].dnd_class.toLowerCase().includes(classInput) && data.results[x].level_int == levelInput) {
                    result = true;
                    console.log(result);
                } else {
                    result = false;
                    console.log(result);
                }
            
            }
        })
    }





    function searchSpell() {
        let classInput = $("#class").val();
        let levelInput = $("#level").val();
        
        if(classInput == undefined || levelInput == undefined) {
            $(".name").text("Please select a class and level to proceed")
        }

        let apiPages = [
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

        let apiPage = randomGenerator(apiPages);
        let apiAddress = API_SPELL + apiPage;

        fetch(apiAddress)
        .then((response) => response.json())
        .then((data) => {
            
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
                
                apiPage = randomGenerator(apiPages);
                console.log(apiPage);
                
                appendSpell();
                /*
                fetch(API_SPELL + apiPage)
                .then((response) => response.json())
                .then((data) => {
                    appendSpell()
                })*/

            }
            //LOGICAL FUNCTION ABOVE

            
            
            //CODE
            function appendSpell() {

                //generate random spell from input 
                let apiResults = [];

                for(let i = 0; i <= data.results.length - 1; i++) {
                    if(data.results[i].dnd_class.toLowerCase().includes(classInput) && data.results[i].level_int == levelInput) {
                        apiResults.push(data.results[i])
                    } 
                }
    
                let spellResult = randomGenerator(apiResults);
                console.log(spellResult);
    
                //append result
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
            }
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