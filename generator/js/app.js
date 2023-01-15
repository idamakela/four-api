$(function() {
    const API_ADDRESS = "https://www.dnd5eapi.co";


    fetch(API_ADDRESS + "/api/spells/")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        let randomSpell = generateRandomSpell(data.results);
        console.log(randomSpell)

        fetch(API_ADDRESS + randomSpell.url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            let spellsClass = [];
            getClasses();
            function getClasses(){
                for(i = 0; i <= data.classes.length - 1; i++) {
                    spellsClass.push(data.classes[i].name) 
                }
            }

            let spellsComponents = [];
            getComponents();
            function getComponents() {
                for(i = 0; i <= data.components.length - 1; i++) {
                    spellsComponents.push(data.components[i]) 
                }
            }

            let spellsDesc = [];
            getDesc();
            function getDesc() {
                for(i = 0; i <= data.desc.length - 1; i++) {
                    spellsDesc.push(data.desc[i]) 
                }
            }
            

            
            //other code
            $(".name").text(data.name);
            $(".first").append("<p>Level " + data.level + " " +  data.school.name  + " | " + spellsClass.join(", ") + "</p>");



            $(".second").append("<p><b>Range: </b>" + data.range + "</p>");
            $(".second").append("<p><b>Casting time: </b>" + data.casting_time + "</p>");

            if(data.ritual == true) {
                $(".second").append("<p><b>Ritual: </b>yes</p>");
            } else {
                $(".second").append("<p><b>Ritual: </b>no</p>");
            }

            if(data.concentration == true) {
                $(".second").append("<p><b>Concentration: </b>yes</p>");
            } else {
                $(".second").append("<p><b>Concentration: </b>no</p>");
            }

            $(".second").append("<p><b>Duration: </b>" + data.duration + "</p>");
            $(".second").append("<p><b>Components: </b>" + spellsComponents.join(", ") + "</p>");
            $(".second").append("<p><b>Materials: </b>" + data.material + "</p>");

            $(".third").append($("<p>").text(spellsDesc.join(" ")));
            
        })


    })

    function generateRandomSpell(targetArray) {
        return targetArray[Math.floor(Math.random() * targetArray.length)];
    }


    /*
        All spells: data.results
        Specific spell: data.results[x]
            generate random number for x to generate random specific spell
        Fetch the random spells url: API_ADDRESS + data.results[i].url
        Append spells results in html
    */
})