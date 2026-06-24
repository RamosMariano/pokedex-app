import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})

export class FavoritesService 
{

  constructor(private userService:UserService){}

  obtenerPokeFavoritos() 
  {

    let userActual: any = this.userService.getUsuarioActual();
    let userKey = `pokemonFavoritos_${userActual.username}`;
    
    let listaFavoritos = localStorage.getItem(userKey);


    if(listaFavoritos === null) 
    {
      return [];
    }

    return JSON.parse(listaFavoritos);

  }

  agregarPoke(pokemon: any) 
  {

    let userActual: any = this.userService.getUsuarioActual();
    let userKey = `pokemonFavoritos_${userActual.username}`;

    let listaFavoritos = this.obtenerPokeFavoritos();
    let yaEsFavorito = this.esFavoritoSN(pokemon.name);

    if(yaEsFavorito === false)
    {
      listaFavoritos.push(pokemon);
      localStorage.setItem(userKey,JSON.stringify(listaFavoritos));
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

    let userActual: any = this.userService.getUsuarioActual();
    let userKey = `pokemonFavoritos_${userActual.username}`;


    let listaFavoritos = this.obtenerPokeFavoritos();

    let temp = [];

    for(let poke of listaFavoritos)
    {
      if(poke.name !== nombre)
      {
        temp.push(poke);
      }
    }

    localStorage.setItem(userKey,JSON.stringify(temp));
    
  }

  resetearTodo() 
  {
    let userActual: any = this.userService.getUsuarioActual();
    let userKey = `pokemonFavoritos_${userActual.username}`;

    localStorage.removeItem(userKey);
  }


}

 