import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCardComponent {}
