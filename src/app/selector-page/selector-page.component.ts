import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-selector-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css'
})
export class SelectorPageComponent {

  constructor(private router:Router){}

  submitButton():void{
    this.router.navigate(['./game']); 
  }
}
