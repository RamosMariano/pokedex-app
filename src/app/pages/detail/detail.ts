import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { SpinnerComponent } from '../../components/spinner/spinner';
import Swal from 'sweetalert2';
import { TeamService } from '../../services/team.service';
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


  estaEnEquipo=false;
  teamService = inject(TeamService);

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

    this.estaEnEquipo = this.teamService.estaEnEquipo(this.pokemon.id);

  } catch (e) {
    console.error('error:', e);
    this.router.navigate(['/home']);
  } finally {
    this.loading = false;
    this.cdr.detectChanges();

    const radarData = this.pokemon.stats.map((s: any) => s.base_stat);

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
          scales: { r: { min: 0, max: 255 } }
        }
      }
    );
  }
}

  volver() {
    this.router.navigate(['/home']);
  }

   //reproducir el sonido del pokemon
  reproducirSonido() {
    const sonido = new Audio(this.pokemon.cries.latest);
    sonido.play();
  }

  //logica para el boton de agregar al equipo 
  
  enEquipo(): boolean {
    return this.pokemon ? this.teamService.estaEnEquipo(this.pokemon.id) : false;
  }

  toggleEquipo() {
    if (this.estaEnEquipo) {
      Swal.fire({
        title: `¿Quitar a ${this.pokemon.name} del equipo?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quitar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#e63946',
        cancelButtonColor: '#6c757d'
      }).then(result => {
        if (result.isConfirmed) {
          this.teamService.eliminar(this.pokemon.id);
          this.estaEnEquipo = false;
          this.cdr.detectChanges();
          Swal.fire({
            icon: 'success',
            title: `${this.pokemon.name} quitado del equipo`,
            timer: 1500,
            showConfirmButton: false
          });
        }
      });
    } else {
      const ok = this.teamService.agregar({
        id: this.pokemon.id,
        name: this.pokemon.name,
        image: this.pokemon.sprites.front_default,
        types: this.pokemon.types.map((t: any) => t.type.name)
      });
      if (!ok) {
        Swal.fire({
          icon: 'error',
          title: 'Equipo lleno',
          text: 'Ya tenés 6 Pokémon en tu equipo',
          confirmButtonColor: '#e63946'
        });
      } else {
        this.estaEnEquipo = true; 
        Swal.fire({
          icon: 'success',
          title: `¡${this.pokemon.name} agregado al equipo!`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    }
  }
}