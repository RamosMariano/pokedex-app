import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FavoritesService 
{


  obtenerPokeFavoritos() 
  {
    let listaFavoritos = localStorage.getItem('pokemonFavoritos');

    if(listaFavoritos === null) 
    {
      return [];
    }

    return JSON.parse(listaFavoritos);

  }

  agregarPoke(pokemon: any) 
  {

    let listaFavoritos = this.obtenerPokeFavoritos();
    let yaEsFavorito = this.esFavoritoSN(pokemon.name);

    if(yaEsFavorito === false)
    {
      listaFavoritos.push(pokemon);
      localStorage.setItem('pokemonFavoritos',JSON.stringify(listaFavoritos));
    }

  }

  esFavoritoSN(nombre: string)
  {
    let listaFavoritos = this.obtenerPokeFavoritos();

    for (const pokemon of listaFavoritos)
    {
      if (pokemon.name === nombre)
      {
          return true;
      }
    }

    return false;

  }

  eliminarFavorito(nombre: string) 
  {
    let listaFavoritos = this.obtenerPokeFavoritos();

    let temp = [];

    for(let poke of listaFavoritos)
    {
      if(poke.name !== nombre)
      {
        temp.push(poke);
      }
    }

    localStorage.setItem('pokemonFavoritos',JSON.stringify(temp));
    
  }

  resetearTodo() 
  {
    localStorage.removeItem('pokemonFavoritos');
  }
}

 