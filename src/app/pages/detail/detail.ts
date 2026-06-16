import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { SpinnerComponent } from '../../components/spinner/spinner';
import Chart from 'chart.js/auto';

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

    /*const data = {
      labels: [
        'Hp',
        'ATK',
        'DEF',
        'Sp.ATK',
        'Sp.DEF',
        'Spe'
      ],
      datasets: [{
        label: this.pokemon.name,
        data: this.pokemon.stats.map((s: any) => s.base_stat),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };
    const config = {
      type: 'radar',
      data: data,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    };
    
    new Chart(
      document.getElementById('radarChart') as HTMLCanvasElement, config as any
    );*/

  } catch (e) {
    console.error('error:', e);
    this.router.navigate(['/home']);
  } finally {
    this.loading = false;
    this.cdr.detectChanges();

    //Hexagono
    console.log(this.pokemon.stats);
    const radarData = this.pokemon.stats.map(
      (s: any) => s.base_stat
    );

    new Chart(
      document.getElementById('radarChart') as HTMLCanvasElement,
      {
        type: 'radar',
        data: {
          labels: ['HP', 'ATK', 'DEF', 'SP.ATK', 'SP.DEF', 'SPEED'],
          datasets: [{
            label: this.pokemon.name,
            data: radarData,
            fill: true
          }]
        },
        options: {
          scales: {
            r: {
              min: 0,
              max: 255
            }
          }
        }
      }
    );
  }
}

  volver() {
    this.router.navigate(['/home']);
  }
}