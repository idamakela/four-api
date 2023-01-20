//THIS IS ONLY FOR WORKING ON TESTING PAGE WITH INPUT LOOP

$(function() {
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



    //LOGICAL TEST VARIABLES 
    let testVar = 0;
    let classInput = "sorcerer";
    let levelInput = 2;
    //

    $(".spell-result").hide();

    $(".search").click(function() {
        $(".box").empty();
        $(".spell-result").show();

    });

    function test() {
        //these need to be incide the function 
        let classInput = $("#class").val();
        let levelInput = $("#level").val();
        console.log(classInput)
        console.log(levelInput)
    }

    //LOGICAL TEST NOT DONE
    function testPageResult(targetApi, targetApiPage) {
        let apiPage = randomGenerator(targetApiPage);
        let apiAddress = targetApi + apiPage;
        console.log(classInput + " " + levelInput);
        console.log(apiAddress);

        //ERROR: could be fetch, seem like there is a ajax async set to false method 
        fetch(apiAddress)
        .then((response) => response.json())
        .then((data) => {
            //ERROR: boolean expression
            for(i = 0; i <= data.results.length - 1; i++) {
                if(data.results[i].dnd_class.toLowerCase().includes(classInput) && data.results[i].level_int == levelInput) {
                    testVar = 1;
                    console.log(testVar)
                    break;
                } else {
                    console.log(testVar)
                }
            }           
        })
    }


    //FETCH AS SYNCHRONOUS 
    let urls = [
        "https://api.open5e.com/spells",
        "https://api.open5e.com/spells/?page=2",
        "https://api.open5e.com/spells/?page=3",
        "https://api.open5e.com/spells/?page=4",
        "https://api.open5e.com/spells/?page=5",
        "https://api.open5e.com/spells/?page=6",
        "https://api.open5e.com/spells/?page=7",
        "https://api.open5e.com/spells/?page=8",
        "https://api.open5e.com/spells/?page=9",
        "https://api.open5e.com/spells/?page=10",
        "https://api.open5e.com/spells/?page=11",
        "https://api.open5e.com/spells/?page=12",
        "https://api.open5e.com/spells/?page=13",
        "https://api.open5e.com/spells/?page=14",
        "https://api.open5e.com/spells/?page=15",
        "https://api.open5e.com/spells/?page=16",
        "https://api.open5e.com/spells/?page=17"
    ]

    function getData(url) {
        return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let dataArray = data.results
            
            return Promise.resolve(dataArray)
        })
    }

    Promise.all(
        urls.map(getData)
    ).then((dataArray) => {
        console.log(dataArray)                  //object
        console.log(dataArray[0])               //object
        console.log(dataArray[0][0])            //object
        console.log(dataArray[0][0].dnd_class)  //string
        console.log(dataArray[0][0].level_int)  //number

        //readData(dataArray);


    })
    //ABOVE RETURNS ALL THE PAGES DATA.RESULTS IN AN ARRAY

    //MANIPULATING THE ABOVE DATA
    let spellsArray = [];
    function readData(targetArray) {
        //function to empty spellsArray first

        for(let i = 0; i <= targetArray.length; i++) {
            for(let j = 0; j <= targetArray[i].length - 1; j++) {
                if(targetArray[i][j].dnd_class.toLowerCase().includes(classInput) && targetArray[i][j].level_int == levelInput) {
                    spellsArray.push(targetArray[i][j]);
                }
            }
        }
        console.log(spellsArray)

    }







    /*
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
                fetch(API_SPELL + apiPage)
                .then((response) => response.json())
                .then((data) => {
                    appendSpell()
                })

            }
            //LOGICAL FUNCTION ABOVE

            
            
            //CODE: feel like i could break this appart in functions 
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
    } */


    function randomGenerator(targetArray) {
        return targetArray[Math.floor(Math.random() * targetArray.length)];
    }
});