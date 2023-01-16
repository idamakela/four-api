$(function() {
    const API_ADDRESS = "https://api.open5e.com/spells";
    //max pages: /?page=17

    //$("button").on("click", generateSpell);

    //generateSpell();

    //THREE: get the other api address
    let apiArray = [];
    getNextApi();

    //ERRORS
    function getNextApi() {
        apiArray.push(API_ADDRESS)
        
        fetch(API_ADDRESS)
        .then(response => response.json())
        .then(data => {
            for(i = 2; i <= 17; i++) {
                let newApi = data.next;
    
                fetch(newApi)
                .then(response  => response.json())
                .then(data      => {
                    apiArray.push(data.next)
                })
            }

            console.log(apiArray)
        })   
    }

    function generateSpell() {
        let selectedClass = $("#class").val();
        let selectedLevel = $("#level").val();

        fetch(API_ADDRESS)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                
                //ONE: class testing filter
                let splitClassString = data.results[5].dnd_class.toLowerCase().split(", ")

                if(splitClassString.includes(selectedClass)) {
                    //result when it includes
                } else {
                    //result when else
                }

                
                //TWO: code to push the object data to a new array
                let spellArr = [];
                function createSpellArr() {
                    for(i = 0; i <= data.results.length - 1; i++) {
                        spellArr.push(data.results[i])
                    }
                }



                //THREE FETCH TEST 
                /*
                1. fetch /spells 
                2. await response
                */
                async function fetchMetaData() {
                    let response = await fetch(API_ADDRESS);
                    let responses = await Promise.all(
                        Array.from(
                            Array(resp.data.next),
                        )
                    )
                }

                




                //access correct data and append to html
                $(".name").text(data.results[5].name);
                $(".first").append("<p>" + data.results[5].level + " " +  data.results[5].school  + " | " + data.results[5].dnd_class + "</p>");


                $(".second").append("<p><b>Range: </b>" + data.results[5].range + "</p>");
                $(".second").append("<p><b>Casting time: </b>" + data.results[5].casting_time + "</p>");
                $(".second").append("<p><b>Ritual: </b>" + data.results[5].ritual + "</p>");
                $(".second").append("<p><b>Concentration: </b>" + data.results[5].concentration + "</p>");
                $(".second").append("<p><b>Duration: </b>" + data.results[5].duration + "</p>");
                $(".second").append("<p><b>Components: </b>" + data.results[5].components + "</p>");
                $(".second").append("<p><b>Materials: </b>" + data.results[5].material + "</p>");

                $(".third").append($("<p>").text(data.results[5].desc));

            })
    }
});
