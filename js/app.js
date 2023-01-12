$(function() {
    const API_ADDRESS = "https://api.open5e.com/spells";

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
                $(".name").text(data.results[5].name);
                $(".school").text(data.results[5].level + " " +  data.results[5].school);
                $(".class").text(data.results[5].dnd_class);

                $(".range").text("Range: " + data.results[5].range);
                $(".casting-time").text("Casting time: " + data.results[5].casting_time);
                $(".ritual").text("Ritual: " + data.results[5].ritual);
                $(".concentration").text("Concentration: " + data.results[5].concentration);
                $(".duration").text("Duration: " + data.results[5].duration);
                $(".components").text("Components: " + data.results[5].components);
                $(".materials").text("Materials: " + data.results[5].material);

                $(".description").text(data.results[5].desc);

            })
    }

});
