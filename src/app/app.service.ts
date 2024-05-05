import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LobbyInfo } from './models/LobbyInfo';
import { PlayerInfo } from './models/PlayerInfo';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl = 'http://localhost:3000';
  lobby: any;
  player: any;

  constructor(private httpClient: HttpClient) { }

  setCurrentPlayer(player: PlayerInfo) {
    this.player = player;
  }
  getCurrentPlayer() {
    return this.player;
  }
  
  setCurrentLobby(lobby: LobbyInfo) {
    this.lobby = lobby;
  }
  getCurrentLobby() {
    return this.lobby;
  }

  getPlayerTest(id: number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/api/getPlayerTest/${id}`);
  }

  updatePlayerScore(id: number, score: number): Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/api/updatePlayerScore`, {id, score});
  }
  
  createPlayer(player: PlayerInfo): Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/api/createPlayer`, player);
  }

  getData(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/test`);
  }

  getLobbies(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/lobbies`);
  }

  createLobby(lobby: LobbyInfo): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/api/createLobby`, lobby);
  }

  getLobbyInfo(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/getLobbyInfo/${id}`);
  }

  getPlayers(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/getPlayers/${id}`);
  }

  addPlayerToLobby(lobbyID: number, playerID: number): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/api/addPlayerToLobby`, {lobbyID, playerID});
  }

  removePlayerFromLobby(lobbyID: number, playerID: number): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/api/removePlayerFromLobby`, {lobbyID, playerID});
  }

  getWordToGuess(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/getWordToGuess/${id}`);
  }

  remove(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/api/remove`);
  }

}
