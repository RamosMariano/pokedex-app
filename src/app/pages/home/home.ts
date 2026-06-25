import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card';
import { SpinnerComponent } from '../../components/spinner/spinner';
import { FormsModule } from '@angular/forms';

const POKEMON_TYPES = [
  'fire','water','grass','electric','ice','fighting','poison','ground',
  'flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy','normal'
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, SpinnerComponent, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  loading = false;
  allPokemons: any[] = [];
  filteredPokemons: any[] = [];
  pokemons: any[] = [];

  currentPage = 1;
  pageSize = 50;
  totalCount = 0;

  searchQuery = '';
  selectedType = '';
  pokemonTypes = POKEMON_TYPES;

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  get total() {
    return Math.ceil(this.filteredPokemons.length / this.pageSize);
  }

  async ngOnInit() {
    try {
      const response = await this.pokemonService.listaPokemon();
      /*this.allPokemons = Array.from({ length: 1025 }, (_, i) => ({
        name: `${i + 1}`
      }));*/
      this.allPokemons = response;
      this.filteredPokemons = [...this.allPokemons];
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
    const slice = this.filteredPokemons.slice(start, start + this.pageSize);

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

  async applyFilters() {
    const query = this.searchQuery.trim().toLowerCase();

    if (this.selectedType) {
      const byType = await this.pokemonService.getPokemonByType(this.selectedType);
      this.filteredPokemons = byType.filter(p => {
        if (!query) return true;
        const isNumber = !isNaN(Number(query));
        if (isNumber) return false;
        return p.name.toLowerCase().includes(query);
      });
    } else if (query && !isNaN(Number(query))) {
      this.filteredPokemons = this.allPokemons.filter(p => p.name === query);
    } else if (query) {
        this.filteredPokemons = this.allPokemons.filter(p =>
          p.name.toLowerCase().includes(query)
        );
    } else {
      this.filteredPokemons = [...this.allPokemons];
    }

    this.currentPage = 1;
    await this.loadPage(1);

    if (query && !this.selectedType && isNaN(Number(query))) {
      this.pokemons = this.pokemons.filter(p =>
        p.name.toLowerCase().includes(query)
      );
    }

    this.cdr.detectChanges();
  }

  selectType(type: string) {
    this.selectedType = this.selectedType === type ? '' : type;
    this.applyFilters();
  }

  async onSearch() {
    await this.applyFilters();
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