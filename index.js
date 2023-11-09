/*
  Name: Derrek Do
  Date: 11/5/2023

  JS code to add functionality to the pokedex.
  Once the page loads, it will immediately send an API request to the 
  PokeAPI and extracts data of the first 151 pokemon and saves it.
  Additionally this saved data will be used to display all pokemon 
  as well as its dex entry whenever theyre clicked on.

  Currently does not change or update the current pokemons type in the
  pokedex entry.
*/
"use strict";
(function(){
    window.addEventListener("load", init);
    
    const API_URL = "https://pokeapi.co/api/v2/pokemon/"; //pokemon/number from 1 - 151
    const GEN_ONE = 151;
    var pokedex = {};
    let num = 1;
    function init() {
        for (let i = 1; i <= GEN_ONE; i++) {
            makeRequest(i);            
        }
        
    }

    function makeRequest(num) {
        let url = API_URL + num;
         
        fetch(url)
        .then(statusCheck)
        .then(resp => resp.json())
        .then(loadPokemon)
        .catch(handleError);
        
    }

    async function loadPokemon(pokemonData) {
        // console.log(pokemonData);
        
        let name = pokemonData["name"];
        let type = pokemonData["type"];
        let img = pokemonData["sprites"]["other"]["official-artwork"]["front_default"];
        
        let resp = await fetch(pokemonData["species"]["url"]);
        let entry = await resp.json();
        entry = entry["flavor_text_entries"][8]["flavor_text"];
        
        pokedex[num] = {"name" : name, "types" : type, "entry" : entry, "img" : img};
    
        let pokemon = document.createElement("img");
        pokemon.id = num;
        pokemon.className = "dexNum";
        pokemon.src = img;
        pokemon.alt = name;
        pokemon.addEventListener("click", getPokemon);
        id("pokemonList").append(pokemon);
        
        num++;
    }

    function getPokemon() {
        id("pokemonImg").src = pokedex[this.id].img;
        id("description").textContent = pokedex[this.id].entry;
    
    }

    function handleError(e) {
        window.alert(e);
    }

    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

    function id(id) {
        return document.getElementById(id);
    }

    function className(className) {
        return document.getElementsByClassName(className);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }
    
    function qsa(selector) {
        return document.querySelectorAll(selector);
    }

})();