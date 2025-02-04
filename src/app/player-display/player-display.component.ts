import { Component } from '@angular/core';
import { RadioMetaService } from '../shared/radio-meta.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NowPlayingModel } from '../shared/radio-station-data/now-playing';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-player-display',
  imports: [AsyncPipe, NgOptimizedImage],
  templateUrl: './player-display.component.html',
  styleUrl: './player-display.component.scss'
})
export class PlayerDisplayComponent {

  nowPlayingData$!: Observable<NowPlayingModel>;
  nowPlayingData!: NowPlayingModel;
  elapsedTime = 0;
  remainingTime = 0;
  duration = 0;
  elapsedTimeDisplay = "";
  durationDisplay = "";
  nowPlayingImage = "";
  nextPlayingImage = "";
  nowPlayingDjUrl = "";
  nextDjUrl = "";
  private songId = "";
  private timerId:any;
  isLoaded = false;

  constructor(private radioService: RadioMetaService) { }

  ngOnInit(): void {
    this.radioService.getNowPlaying().subscribe(nowPlayingData => {
      this.resetDisplay(nowPlayingData);
      this.startDisplayFetch();
      this.isLoaded = true;
    })
  }

  private startDisplayFetch() {
    setInterval(() => {
      this.radioService.getNowPlaying().subscribe(nowPlayingData => { 
        this.nowPlayingData = nowPlayingData;
        if (this.songId != this.nowPlayingData.now_playing.song.id) {
          this.resetDisplay(nowPlayingData) // song has changed
        }
      })
    }, 20000); // every 10 seconds
  }

  private startTimer() {
    var start = Date.now();
    this.timerId = setInterval(() => {
      var delta = Date.now() - start; // milliseconds elapsed since 
      var elapsed = this.elapsedTime + Math.floor(delta / 1000);
      this.elapsedTimeDisplay = this.getMins(elapsed);
    }, 1000); // update about every second
  }

  private resetDisplay(nowPlayingData:NowPlayingModel) {
    this.nowPlayingData = nowPlayingData;
    this.elapsedTime = nowPlayingData.now_playing.elapsed;
    this.remainingTime = nowPlayingData.now_playing.remaining;
    this.duration = nowPlayingData.now_playing.duration;
    this.durationDisplay = this.getMins(this.duration);
    this.elapsedTimeDisplay = this.getMins(this.elapsedTime);
    this.songId = nowPlayingData.now_playing.song.id;
    this.nowPlayingImage = nowPlayingData.now_playing.song.art;
    this.nextPlayingImage = nowPlayingData.playing_next.song.art;

    if (nowPlayingData.now_playing.song.custom_fields.dj_url)
    {
      this.nowPlayingDjUrl = nowPlayingData.now_playing.song.custom_fields.dj_url;
    }

    if (nowPlayingData.playing_next.song.custom_fields.dj_url)
      {
        this.nextDjUrl = nowPlayingData.playing_next.song.custom_fields.dj_url;
      }


    clearInterval(this.timerId);
    this.startTimer();
  }

  private getMins(seconds:number) {
    var minutesDisplay = Math.floor(seconds / 60);
    var secondsDisplay = seconds % 60;
    var timeDisplay = `${minutesDisplay.toString().padStart(2, "0")}:${secondsDisplay.toString().padStart(2, "0")}`;
    return timeDisplay;
  }
}
