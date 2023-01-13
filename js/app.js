$(function() {
    const API_ADDRESS = "https://api.open5e.com/spells";
    //max pages: /?page=17

    $("button").on("click", generateSpell);

    generateSpell();

    function generateSpell() {
        let selectedClass = $("#class").val();
        let selectedLevel = $("#level").val();
        console.log(selectedClass)
        console.log(selectedLevel)

        fetch(API_ADDRESS)
            .then((response) => {
                if(!response.ok) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data)
                
                //class testing filter
                console.log(typeof data.results[5].dnd_class + " " +  data.results[13].dnd_class.toLowerCase())
                let splitClassString = data.results[5].dnd_class.toLowerCase().split(", ")
                console.log(splitClassString);

                if(splitClassString.includes(selectedClass)) {
                    console.log("yup")
                } else {
                    console.log("nope")
                }

                //level testing filter
                console.log(data.results.length)
                console.log(typeof data.results[0])
                console.log(data.results[0])

                //do the loop as a function, then fetch? 
                //getLevelData(data);
                //changeApi(data);
                function getLevelData(data) {
                    for(i = 0; i <= data.results.length - 1; i++) {
                        console.log(data.results[i].level_int + " " + i)

                        if(data.results[i].level_int == 0) {
                            console.log("ZERO")
                        }
                    }
                }

                function changeApi() {
                    for(x = 2; x <= 17; x++) {
                        console.log("X IS " + x)
                        /*
                        fetch(API_ADDRESS  + "/?page=" + x)
                        .then((response) => response.json())
                        .then((data) => {
                            //getLevelData(data);
                        })*/
                    }
                
                }

                //make array of all the spells to easier generate random spell
                let spellsArray = [];

                //getOtherApi();
                function getOtherApi() {
                    createSpellArray();
                    //is it possible to target data.next and put that as the api address??
                    //for(x = 2; x <= 17; x++) {                        
                        fetch(API_ADDRESS  + "/?page=2")
                        .then((response) => response.json())
                        .then((data) => {
                            createSpellArray(data);
                        })
                   // }
                }

                function createSpellArray() {
                    let oldArray = data.results;
                    let json = JSON.stringify(oldArray);
                    let newArray = JSON.parse(json);

                    console.log(newArray)
                    console.log(newArray.length)
                    console.log(data.next)
                }

                function createArr() {
                    console.log(data)
                    console.log(data.results)
                    data.results.forEach(function(value, i) {
                        spellsArray.push(data.results)
                    })
                    console.log(spellsArray)

                    //change api, do the above again
                    fetch(data.next)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            console.log(data.results)
                            data.results.forEach(function() {
                                spellsArray.push(data.results)
        
                            })                            
                            console.log(spellsArray)
                        })
                }
                //trying to access data.reslults[i] and add it to a new array, and then go to data.next and append that data.results[i] to the same array
                //aka i want to iterate through an array of objects, add the objects to a new array, and do the same on the next api page (data.next)


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

    function randomizeSpell() {
        fetch(API_ADDRESS)
            .then((response) => response.json())
            .then((data) => {
                if(data.results.dnd_class.include() && data.results.level_int.include(level)) {
                    data.results.forEach(element => {
                        return data.results[Math.floor(Math.random() * data.results.length)];
                    });
                } else {
                    API_ADDRESS = data.next;
                }


                let levelFilter = data.results.level_int.filter(filterLevel);
                let classFilter = data.results.dnd_class.toLowerCase().includes(selectedClass)

                function filterLevel(level) {
                    return level = selectedLevel;
                }

            })



    }

});
