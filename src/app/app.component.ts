import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioPlayerComponent } from "../audio-player/audio-player.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AudioPlayerComponent, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'player-app';
}
