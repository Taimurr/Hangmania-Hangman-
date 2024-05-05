import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

export interface PlayerList {
  name: string;
}

const PLAYER_DATA: PlayerList[] = [
  {name: 'Lou'},
  {name: 'Batman'},
  {name: 'Robin'},
];

@Component({
  templateUrl: './lobby-page.component.html',
  styleUrl: './lobby-page.component.css'
})

export class LobbyPageComponent implements OnInit {
  max_player: number = 0;
  total_rounds: number = 0;
  displayedColumns: string[] = ['name'];
  lobbyTable: any;
  lobby: any;
  player: any;

  constructor(private router: Router, private route: ActivatedRoute, private appService: AppService) {}

  ngOnInit(): void {
    
      this.lobby = this.appService.getCurrentLobby();
      this.player = this.appService.getCurrentPlayer();
      
      this.max_player = this.lobby.max_player;
      this.total_rounds = this.lobby.total_rounds;
      this.appService.getLobbyInfo(this.lobby.id).subscribe(result => {
        this.max_player = result['max_player'];
        this.total_rounds = result['total_rounds'];
      });

      
      this.appService.getPlayers(this.lobby.id).subscribe(result => {
        this.lobbyTable = result;
      })
  }

  leaveLobby() {
    this.appService.removePlayerFromLobby(this.lobby.id, this.player.id).subscribe(() => {
      this.router.navigateByUrl('/select-lobby');
    });
  }

  startGame() {
    // this.appService.remove().subscribe();
    this.router.navigateByUrl('/game');
  }
}

export class ExampleDataSource extends DataSource<PlayerList> {
  data = new BehaviorSubject<PlayerList[]>(PLAYER_DATA);

  connect(): Observable<PlayerList[]> {
    return this.data;
  }

  disconnect() {}
}
