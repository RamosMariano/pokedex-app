import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private allPokemon: any[] = [];

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

  showSprites(currentPokemonData: any, generation: string, version: string) {
    return currentPokemonData?.sprites?.versions?.[generation]?.[version];
  }

  listAbilities(currentPokemonData: any) {
    return currentPokemonData?.abilities || [];
  }

  listMoves(currentPokemonData: any) {
    return currentPokemonData?.moves || [];
  }

  getTipos(currentPokemonData: any) {

    if (
      !currentPokemonData?.types ||
      !Array.isArray(currentPokemonData.types)
    ) {
      return [];
    }

    return currentPokemonData.types.map((typeSlot: any) => ({
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
}