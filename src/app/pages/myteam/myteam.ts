import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { TeamPokemon } from '../../interfaces/team.interface';
import { PokemonService } from '../../services/pokemon.service';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-myteam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myteam.html',
  styleUrl: './myteam.scss'
})
export class MyteamComponent implements OnInit {

  teamService = inject(TeamService);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  equipo: TeamPokemon[] = [];
  pokeService = inject(PokemonService);

  radarChart?: Chart;
  

  async ngOnInit() {
    this.cargarEquipo();
    await this.generarGraficoEquipo();
  }

  cargarEquipo() {
    this.equipo = this.teamService.getEquipo();
  }

  eliminar(pokemon: TeamPokemon) {
    Swal.fire({
      title: `¿Quitar a ${pokemon.name} del equipo?`,
      text: 'Podés volver a agregarlo cuando quieras',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e63946',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.teamService.eliminar(pokemon.id);
        this.cargarEquipo();
        this.cdr.detectChanges();
        Swal.fire({
          icon: 'success',
          title: `${pokemon.name} fue quitado del equipo`,
          timer: 1500,
          showConfirmButton: false
        });
        this.generarGraficoEquipo();
      }
    });
  }

  irADetalle(id: number) {
    this.router.navigate(['/detail', id]);
  }

  get slotsVacios() {
    return Array(6 - this.equipo.length);
  }

  //hexagonos
  async generarGraficoEquipo() {

      const datasets = [];

      for (const pokemon of this.equipo) {

        const result = await this.pokeService.loadPokemon(
          pokemon.id.toString()
        );

        const stats = result!.pokemon.stats.map(
          (s: any) => s.base_stat
        );

        datasets.push({
          label: pokemon.name,
          data: stats,
          fill: true
        });
      }
      datasets.forEach(element => {
        console.log(element.label, element.data);
      });

      if (this.radarChart) {
        console.log('Actualizando gráfico');
        console.log(datasets);
        this.radarChart.data.datasets = datasets;
        this.radarChart.update();
        return;
      }

      const suma = [0, 0, 0, 0, 0, 0];
      for (const dataset of datasets) {
        dataset.data.forEach((valor: number, i: number) => {
          suma[i] += valor;
        });
      }

      const promedio = suma.map(
        total => total / datasets.length
      );
      datasets.push({
        label: 'Promedio del equipo',
        data: promedio,
        fill: true
      });

      this.radarChart= new Chart(document.getElementById("radarChart") as HTMLCanvasElement, {
      type: 'radar',
      data: {
        labels: ['HP', 'ATK', 'DEF', 'SP.ATK', 'SP.DEF', 'SPEED'],
        datasets: datasets
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: 255
          }
        }
      }
    });
  }

}