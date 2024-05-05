import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyPageComponent } from './lobby-page/lobby-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateServerComponent } from './create-server/create-server.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GuessWordComponent } from './guess-word/guess-word.component';
import { EndGameComponent } from './end-game/end-game.component';
import { SelectLobbyComponent } from './select-lobby/select-lobby.component';
import { SelectorPageComponent } from './selector-page/selector-page.component';

const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'select-lobby', component: SelectLobbyComponent },
    { path: 'create-server', component: CreateServerComponent },
    { path: 'lobby', component: LobbyPageComponent },
    { path: 'selector-page', component: SelectorPageComponent},
    { path: 'game', component: GamePageComponent },
    { path: 'guess-word', component: GuessWordComponent },
    { path: 'end-game', component: EndGameComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}