$(function() {
    /*
        IDEA:
        Array from all the api addresses
        Random selector of api
        Fetch the API data 
        Random selector from the data.results
            Maybe two parameters: class and level 
            AKA get class and level data, generate random spell from the result 
    */















    let API_ADDRESS = "https://api.open5e.com/spells";
    //max pages: /?page=17

    $("button").on("click", generateSpell);

    generateSpell();

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
                
                //class testing filter
                let splitClassString = data.results[5].dnd_class.toLowerCase().split(", ")

                if(splitClassString.includes(selectedClass)) {
                    //result when it includes
                } else {
                    //result when else
                }

                //trying to access data.reslults[i] and add it to a new array, and then go to data.next and append that data.results[i] to the same array
                //aka i want to iterate through an array of objects, add the objects to a new array, and do the same on the next api page (data.next)
                
                //code to push the object data to a new array
                let spellArr = [];
                //createSpellArr();
                //console.log(spellArr)
                function createSpellArr() {
                    console.log(data.results)
                    console.log(data.results[0])

                    //get the objects and place them in a new array
                    for(i = 0; i <= data.results.length - 1; i++) {
                        spellArr.push(data.results[i])
                    }
                }

                //trying to get to the next page of data
                //IDEA: just search the data and return the results from the input and randomize that to generate a spell. the returned data prob need to be in an array and randomize a spell from that array.
                //ERROR: the data doesnt have a url connected to each and every spell
                changeApi();
                function changeApi() {
                    //it gets stuck on the second page and creates a infinite loop 
                    //something wrong with the fetch, prob cus its async, need it to wait for the response then call the functions
                    let iii = 0;
                    while(iii < 18) {    
                        API_ADDRESS = data.next
                        console.log(API_ADDRESS)
                        fetch(API_ADDRESS)
                            .then(response => response.json())
                            .then(data => console.log(data.next))
                        iii++;
                    }
                    
                    //this gets all the api addresses but they are not in order
                    // for (let ii = 2; ii < 18; ii++) {
                    //     let newApi = API_ADDRESS + "/?page=" + ii;
                    //     fetch(newApi)
                    //         .then(response =>   response.json())
                    //         .then(data     =>   console.log(data.next) );
                    // }

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
