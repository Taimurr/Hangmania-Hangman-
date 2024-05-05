import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { MatTableModule } from '@angular/material/table';
import { SelectLobbyComponent } from './select-lobby/select-lobby.component';
import { CreateServerComponent } from './create-server/create-server.component';
import {MatButtonModule} from '@angular/material/button';
import {CdkTableModule} from '@angular/cdk/table';
import { LobbyPageComponent } from './lobby-page/lobby-page.component';


@NgModule({
  declarations: [ 
    AppComponent,
    SelectLobbyComponent,
    CreateServerComponent,
    LobbyPageComponent,
   ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    CdkTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }