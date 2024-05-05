import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { io } from 'socket.io-client';
import { PlayerInfo } from '../models/PlayerInfo';

@Component({
  selector: 'login',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  socket: any;
  nickname: string = "";

  constructor(private router: Router, private appService: AppService) {}

  onSubmit(playerName: string) {
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", () => {console.log("connected")});
    if (playerName != ""){
      this.nickname = playerName;
      var newPlayer: PlayerInfo = {
        name: this.nickname,
        id: null,
        lobby: 5,
        score: 0,
      }
      this.appService.createPlayer(newPlayer).subscribe(result => this.appService.setCurrentPlayer(result));
      this.router.navigateByUrl('/select-lobby');
    }
  }
}
