import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { SpinnerComponent } from '../../components/spinner/spinner';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class DetailComponent {
  pokemon: any = null;
  species: any = null;
  tipos: any[] = [];
  habilidades: any[] = [];
  stats: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) {
    this.router.navigate(['/home']);
    return;
  }

  try {
    const result = await this.pokemonService.loadPokemon(id);
    if (!result?.pokemon) {
      this.router.navigate(['/home']);
      return;
    }

    this.pokemon = result.pokemon;
    this.species = result.species;
    this.tipos = this.pokemonService.getTipos();
    this.habilidades = this.pokemonService.listAbilities();
    this.stats = this.pokemon.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
      percentage: Math.round((s.base_stat / 255) * 100)
    }));
  } catch (e) {
    console.error('error:', e);
    this.router.navigate(['/home']);
  } finally {
    this.loading = false;
    this.cdr.detectChanges();
  }
}

  volver() {
    this.router.navigate(['/home']);
  }
}