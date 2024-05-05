import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { LobbyInfo } from '../models/LobbyInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'select-lobby',
  templateUrl: './select-lobby.component.html',
  styleUrl: './select-lobby.component.css'
})
export class SelectLobbyComponent implements OnInit{
  player: any;
  lobbyInfo: any;
  displayedColumns: string[] = ['numPlayers', 'host', 'round', 'joinable'];
  
  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.appService.getLobbies().subscribe(result => {
      this.lobbyInfo = result;
      console.log(result);
    });
  }

  async joinLobby(selectedLobby: any) {
    const playerID = this.appService.getCurrentPlayer().id;
    
    const result = await this.appService.addPlayerToLobby(selectedLobby.id, playerID).toPromise();


    this.appService.setCurrentLobby(selectedLobby);
    
    this.router.navigateByUrl('/lobby');
  }

  createServer() {
    this.router.navigateByUrl('/create-server');
    // this.appService.remove().subscribe();
  }
}
