import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from "./player/player.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-root',
  imports: [PlayerComponent, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'player-app';
}
