$(function() {
    const API_ADDRESS = "https://api.open5e.com/spells";
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

                //THREE: get the other api address
                getNextApi();
                function getNextApi() {
                    for(i = 2; i <= 17; i++) {
                        let newApi = API_ADDRESS + "/?=page" + i;

                        console.log(newApi);
                        fetch(newApi)
                            .then(response => response.json())
                            .then(data => console.log(data));
                    }
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
