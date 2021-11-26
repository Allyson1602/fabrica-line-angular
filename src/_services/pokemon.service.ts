import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, mergeMap, ReplaySubject } from 'rxjs';
import { Pokemon } from 'src/_model/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemons: Pokemon[] = [];

  constructor(
    private httpClient: HttpClient,
  ) {
    const allPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';

    this.httpClient.get<any>(allPokemonsUrl).pipe(
      map((value: any) => value.results),
      map((value: any) => {
        return from(value).pipe(
          mergeMap((v: any) => this.httpClient.get(v.url))
        );
      }),
      mergeMap((value: any) => value),
    ).subscribe((result: any) => this.pokemons[result.id] = {
      number: result.id,
      image: result.sprites.front_default,
      name: result.name,
      types: result.types.map((t: any) => t.type.name),
    });
  }
}
