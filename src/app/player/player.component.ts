import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  audioSource = "https://stream.bigmixradio.uk/listen/big_mix_radio/radio.mp3";
  audio = new Audio(this.audioSource);
  btnLabel = 'Play';
  playBtnClass = 'paused';

  playToggle() {
    if (this.audio.paused) {
      this.play();
    }
    else {
      this.pause();
    }
  }

  play() {
    this.btnLabel = 'Pause';
    this.audio.src = this.audioSource;
    this.audio.load();
    this.audio.play();
    this.playBtnClass = 'playing';
  }

  pause() {
    this.audio.src = "";
      this.audio.pause();
      this.btnLabel = 'Play';
      var _this = this;
      this.playBtnClass = 'paused';

      setTimeout(function () {
        _this.audio.load();
      })
  }
}
