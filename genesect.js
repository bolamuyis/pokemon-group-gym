"use strict"
document.body.style.backgroundColor = "rgb(254, 214, 90)";
document.body.style.backgroundImage = "url('images/genesect-bg.png')";

axios.get("https://pokeapi.co/api/v2/pokemon/649/")
.then((response) => {
    const data = response.data;
    console.log(data); 

// Capture all the indexes of abilities in to this array
var abilitiesArray = [];
for (let i=0; i<data.abilities.length; i++){
    abilitiesArray.push(data.abilities[i].ability.name);
} 

let electivire = new Pokemon(
    data.forms[0].name,
    //data.abilities[0].ability.name,
    abilitiesArray,
    data.stats[4].base_stat,
    data.stats[3].base_stat,
    data.stats[5].base_stat
)
    console.log(electivire);
    document.getElementById("electivire").innerHTML += `<p><span class="key">${"Name"}</span><span class="value"><strong>${ electivire.name }</strong></span></p>`
    document.getElementById("electivire").innerHTML += `<p><span class="key">${"Abilities" }<span class="value"><strong>${ electivire.abilities }</strong></span></p>`
    document.getElementById("electivire").innerHTML += `<p><span class="key">${"Attack" }<span class="value"><strong>${ electivire.attack }</strong></span></p>`
    document.getElementById("electivire").innerHTML += `<p><span class="key">${"Defense" }<span class="value"><strong>${ electivire.defense}</strong></span></p>`
    document.getElementById("electivire").innerHTML += `<p><span class="key">${"HP" }<span class="value"><strong>${ electivire.hp }</strong></span></p>`
});