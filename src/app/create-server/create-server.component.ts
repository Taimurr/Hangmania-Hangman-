import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { LobbyInfo } from '../models/LobbyInfo';

@Component({
  selector: 'create-server',
  templateUrl: './create-server.component.html',
  styleUrl: './create-server.component.css'
})

export class CreateServerComponent {
  num_rounds: number = 0;
  max_players: number = 0;

  playerButtons = [{
    num: 1,
    clicked:false
  },
  {
    num: 2,
    clicked:false
  },
  {
    num: 3,
    clicked:false
  },
  {
    num: 4,
    clicked:false
  },
  {
    num: 5,
    clicked:false
  }]  
  
  roundButtons = [{
    num: 3,
    clicked:false
  },
  {
    num: 4,
    clicked:false
  },
  {
    num: 5,
    clicked:false
  },
  {
    num: 6,
    clicked:false
  },
  {
    num: 7,
    clicked:false
  }] 
  
  constructor(private router:Router, private appService: AppService){}
  

  createServer(){
    
    if(this.max_players != 0 && this.num_rounds != 0){
      

      var lobby: LobbyInfo = {
        id: null,
        word: "",
        state: false,
        round: 0,
        total_rounds: this.num_rounds,
        max_player: this.max_players,
        host: this.appService.getCurrentPlayer().name,
        current_players: 0
      };

      this.appService.createLobby(lobby).subscribe(r => {
        this.appService.setCurrentLobby(r);
        this.appService.addPlayerToLobby(this.appService.getCurrentLobby().id, this.appService.getCurrentPlayer().id).subscribe(() => this.router.navigate(['/lobby']));
      });
      

      
    }
  }

  goBack(){
    this.router.navigate(['/select-lobby']);
  }
  
  playerCount(i:number){ 
    this.max_players = this.playerButtons[i].num;
    this.playerButtons[0].clicked = false;
    this.playerButtons[1].clicked = false;
    this.playerButtons[2].clicked = false;
    this.playerButtons[3].clicked = false;
    this.playerButtons[4].clicked = false;

    this.playerButtons[i].clicked = true;
  }

  roundCount(i:number){
    this.num_rounds = this.roundButtons[i].num;

    this.roundButtons[0].clicked = false;
    this.roundButtons[1].clicked = false;
    this.roundButtons[2].clicked = false;
    this.roundButtons[3].clicked = false;
    this.roundButtons[4].clicked = false;

    this.roundButtons[i].clicked = true;
  }

}
