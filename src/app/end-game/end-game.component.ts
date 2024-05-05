import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.css'
})
export class EndGameComponent {
  constructor(private router:Router){}

  exit():void{
    this.router.navigate(['/select-lobby']);
  }
}
