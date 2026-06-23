import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { TeamPokemon } from '../../interfaces/team.interface';
import Swal from 'sweetalert2';


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
  

  ngOnInit() {
    this.cargarEquipo();
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
      }
    });
  }

  irADetalle(id: number) {
    this.router.navigate(['/detail', id]);
  }

  get slotsVacios() {
    return Array(6 - this.equipo.length);
  }

}