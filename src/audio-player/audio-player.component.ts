import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  imports: [],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {
  audioSource = "https://radio.okoro.org/listen/okoro_radio/radio.mp3";
}
