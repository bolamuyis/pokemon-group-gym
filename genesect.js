"use strict"
document.body.style.backgroundColor = "rgb(254, 214, 90)";
document.body.style.backgroundImage = "url('images/genesec-bg.png')";

function ajax(url, cb) {
    axios.get(url).then((r) => {

        return cb(r.data);
    });
}

function getFile(url) {
    return ASQ(function (done) {
        ajax(url, done);
    });
}

ASQ()
    .runner(function* loadfiles() {
        var p1 = getFile("https://pokeapi.co/api/v2/pokemon/649/")

        var data = yield p1;

        // Capture all the indexes of abilities in to this array
        var abilitiesArray = [];
        for (let i = 0; i < data.abilities.length; i++) {
            abilitiesArray.push(data.abilities[i].ability.name);
        }

        var movesArray = [];

        var movesInfoArray = [];

        var p_URLs = [];

        for (let i = 0; i < data.moves.length; i++) {
            movesArray.push(data.moves[i].move.name);
            p_URLs.push(data.moves[i].move.url);
            var p2 = getFile(p_URLs[i]);
            var moveInfo = yield p2;
            movesInfoArray.push(['Accuracy: ' + moveInfo.accuracy, ' Power: ' + moveInfo.power, ' Priority: ' + moveInfo.priority]);
        }


        //declare and empty array to capture all the abilities
        let electivire = new Pokemon(
            data.forms[0].name,
            // data.abilities[0].ability.name,
            abilitiesArray,
            data.stats[4].base_stat,
            data.stats[3].base_stat,
            data.stats[5].base_stat,
            //data.moves[5].move.name,
            movesArray,
            data.weight
        )

        console.log(electivire);
        document.getElementById("electivire").innerHTML += `<p><span class="key">${"Name"}</span><span class="value"><strong>${electivire.name}</strong></span></p>`
        document.getElementById("electivire").innerHTML += `<p><span class="key">${"Abilities"}<span class="value"><strong>${electivire.abilities}</strong></span></p>`
        document.getElementById("electivire").innerHTML += `<p><span class="key">${"Attack"}<span class="value"><strong>${electivire.attack}</strong></span></p>`
        document.getElementById("electivire").innerHTML += `<p><span class="key">${"Defense"}<span class="value"><strong>${electivire.defense}</strong></span></p>`
        document.getElementById("electivire").innerHTML += `<p><span class="key">${"HP"}<span class="value"><strong>${electivire.hp}</strong></span></p>`
        document.getElementById("electivireWM").innerHTML += `<p><span class="key">${"Weight"}<span class="value"><strong>${electivire.weight}</strong></span></p>`

        var electivireWM = document.getElementById("electivireWM");
        var moveParagraph = document.createElement("p");
        var moveSpan = document.createElement("span");
        moveParagraph.appendChild(moveSpan);
        moveSpan.className = "value";
        moveSpan.innerHTML = `${"Moves"}`
        electivireWM.appendChild(moveParagraph);
        var span = document.createElement('span');
        span.className = 'value2';
        const U = document.querySelector('.value');
        moveSpan.appendChild(span);
        for (var i = 0; i < 10; i++) {
            var parent = document.createElement('div');
            parent.innerHTML = electivire.moves[i];
            parent.className = 'parent';
            var baby = document.createElement('div');
            baby.className = 'hover-content';
            baby.innerHTML = movesInfoArray[i];
            parent.appendChild(baby);
            span.appendChild(parent);
        }
    }).val(function () {
        console.log("Complete!");
    });