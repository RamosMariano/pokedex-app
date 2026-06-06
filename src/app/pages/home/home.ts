import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { SpinnerComponent } from '../../components/spinner/spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, SpinnerComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  loading = false;
  allPokemons: any[] = [];
  pokemons: any[] = [];

  currentPage = 1;
  pageSize = 50;
  totalCount = 0;

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  get total() {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  async ngOnInit() {
    try {
      this.allPokemons = Array.from({ length: 1025 }, (_, i) => ({
        name: `${i + 1}`
      }));
      this.totalCount = this.allPokemons.length;
      await this.loadPage(1);
    } catch (e) {
      console.error(e);
    }
  }

  async loadPage(page: number) {
    this.loading = true;
    this.pokemons = [];
    this.cdr.detectChanges();

    const start = (page - 1) * this.pageSize;
    const slice = this.allPokemons.slice(start, start + this.pageSize);

    try {
      for (const p of slice) {
        const result = await this.pokemonService.loadPokemon(p.name);
        if (!result?.pokemon) continue;
        this.pokemons.push({
          name: result.pokemon.name,
          image: result.pokemon.sprites.front_default,
          types: result.pokemon.types.map((t: any) => t.type.name)
        });
        this.cdr.detectChanges();
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async nextPage() {
    if (this.currentPage < this.total) {
      this.currentPage++;
      await this.loadPage(this.currentPage);
    }
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadPage(this.currentPage);
    }
  }

  async goToPage(page: number) {
    if (page >= 1 && page <= this.total && page !== this.currentPage) {
      this.currentPage = page;
      await this.loadPage(this.currentPage);
    }
  }
}