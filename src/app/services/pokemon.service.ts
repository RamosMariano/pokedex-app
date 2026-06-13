import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  allPokemon: any[] = [];
  currentPokemonData: any = null;
  currentPokemonSpeciesData: any = null;

  async listaPokemon() {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=1025'
      );

      const data = await response.json();

      this.allPokemon = data.results;

      return this.allPokemon;

    } catch (error) {
      console.error('Error cargando lista de Pokémon:', error);
      return [];
    }
  }

  async loadPokemon(pokemonName: string) {

  try {

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    this.currentPokemonData = await response.json();

    const response2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );

    this.currentPokemonSpeciesData = await response2.json();

    return {
      pokemon: this.currentPokemonData,
      species: this.currentPokemonSpeciesData
    };

  } catch (error) {

    console.error('Error cargando Pokémon:', error);

    this.currentPokemonData = null;
    this.currentPokemonSpeciesData = null;

    return null;
  }
}

  showSprites(currentPokemonData: any, generation: string, version: string) {
    return currentPokemonData?.sprites?.versions?.[generation]?.[version];
  }

  listAbilities() {
    return this.currentPokemonData?.abilities || [];
  }

  listMoves() {
    return this.currentPokemonData?.moves || [];
  }

  getTipos() {

    if (
      !this.currentPokemonData?.types ||
      !Array.isArray(this.currentPokemonData.types)
    ) {
      return [];
    }

    return this.currentPokemonData.types.map((typeSlot: any) => ({
      name: typeSlot.type.name,
      slot: typeSlot.slot,
      formattedName: typeSlot.type.name.replace(/-/g, ' ').toUpperCase()
    }));
  }

  async getFullEvolutionChain(speciesData: any) {

    if (!speciesData?.evolution_chain?.url) {
      return [{ name: speciesData.name, isCurrent: true }];
    }

    try {

      const response = await fetch(speciesData.evolution_chain.url);

      const evolutionChain = await response.json();

      const chain: any[] = [];

      const traverse = (node: any) => {

        if (!node) return;

        const name = node.species.name;

        chain.push({
          name,
          isCurrent: name === speciesData.name,
          evolvesTo: node.evolves_to.length
        });

        node.evolves_to.forEach((evo: any) => traverse(evo));
      };

      traverse(evolutionChain.chain);

      return chain;

    } catch (error) {

      console.error(
        'Error obteniendo cadena evolutiva:',
        error
      );

      return [{ name: speciesData.name, isCurrent: true }];
    }
  }

  async getCadenaEvo(pokemonName: string) {

    try {

      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
      );

      const speciesData = await speciesRes.json();

      return await this.getFullEvolutionChain(speciesData);

    } catch (error) {

      console.error(error);

      return null;
    }
  }
  //lo agregue para el filtro por tipo
  async getPokemonByType(type: string): Promise<any[]> {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      return data.pokemon.map((entry: any) => ({
        name: entry.pokemon.name
      }));
    } catch (error) {
      console.error('Error cargando Pokémon por tipo:', error);
      return [];
    }
  }

  
}