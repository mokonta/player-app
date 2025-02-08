import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NowPlayingModel } from '../shared/radio-station-data/now-playing.model';
import { NgOptimizedImage } from '@angular/common';
import { RadioWebSocketDataService } from '../shared/services/radio-web-socket-data.service';

@Component({
  selector: 'app-player-display',
  imports: [AsyncPipe, NgOptimizedImage],
  templateUrl: './player-display.component.html',
  styleUrl: './player-display.component.scss'
})
export class PlayerDisplayComponent {

  nowPlayingData: NowPlayingModel;
  elapsedTime: number;
  remainingTime: number;
  duration: number;
  elapsedTimeDisplay: string;
  durationDisplay: string;
  nowPlayingImage: string;
  nextPlayingImage: string;
  nowPlayingDjUrl: string;
  nextDjUrl: string;
  private songId: string;
  private timerId: number;
  isLoaded: boolean;
  private messageSubscription: Subscription;

  constructor(private webSocketService: RadioWebSocketDataService) {
    this.nowPlayingData = new NowPlayingModel();
    this.elapsedTime = 0;
    this.remainingTime = 0;
    this.duration = 0;
    this.elapsedTimeDisplay = "";
    this.durationDisplay = "";
    this.nowPlayingImage = "";
    this.nextPlayingImage = "";
    this.nowPlayingDjUrl = "";
    this.nextDjUrl = "";
    this.songId = "";
    this.timerId = 0;
    this.isLoaded = false;
    this.messageSubscription = new Subscription();
  }

  ngOnInit(): void {
    const msg = { "subs": { "station:big_mix_radio": { "recover": true } } };
    this.webSocketService.sendMessage(msg);

    this.messageSubscription = this.webSocketService.getMessages().subscribe((message) => {
      if ('connect' in message) {
        const connectData = message.connect;

        if ('data' in connectData) {
          // Legacy SSE data
          connectData.data.forEach(
            (initialRow: any) => this.handleSseData(initialRow)
          );
        } else {
          // New Centrifugo time format
          // if ('time' in connectData) {
          //   currentTime = Math.floor(connectData.time / 1000);
          // }

          // New Centrifugo cached NowPlaying initial push.
          for (const subName in connectData.subs) {
            const sub = connectData.subs[subName];
            if ('publications' in sub && sub.publications.length > 0) {
              sub.publications.forEach((initialRow: any) => this.handleSseData(initialRow));
            }
          }
        }
      } else if ('pub' in message) {
        this.handleSseData(message.pub);
      }
    })
  }

  private handleSseData(ssePayload: any) {
    this.nowPlayingData = ssePayload.data.np;
    
    if (this.songId != this.nowPlayingData.now_playing.song.id) {
      this.resetDisplay(this.nowPlayingData); // song has changed
    }
  }

  private startTimer() {
    var start = Date.now();
    this.timerId = window.setInterval(() => {
      var delta = Date.now() - start; // milliseconds elapsed since 
      var elapsed = this.elapsedTime + Math.floor(delta / 1000);
      this.elapsedTimeDisplay = this.getMins(elapsed);
    }, 1000); // update about every second
  }

  private resetDisplay(nowPlayingData: NowPlayingModel) {
    this.nowPlayingData = nowPlayingData;
    this.elapsedTime = nowPlayingData.now_playing.elapsed;
    this.remainingTime = nowPlayingData.now_playing.remaining;
    this.duration = nowPlayingData.now_playing.duration;
    this.durationDisplay = this.getMins(this.duration);
    this.elapsedTimeDisplay = this.getMins(this.elapsedTime);
    this.songId = nowPlayingData.now_playing.song.id;
    this.nowPlayingImage = nowPlayingData.now_playing.song.art;
    this.nextPlayingImage = nowPlayingData.playing_next.song.art;

    if (nowPlayingData.now_playing.song.custom_fields.dj_url) {
      this.nowPlayingDjUrl = nowPlayingData.now_playing.song.custom_fields.dj_url;
    }

    if (nowPlayingData.playing_next.song.custom_fields.dj_url) {
      this.nextDjUrl = nowPlayingData.playing_next.song.custom_fields.dj_url;
    }

    this.isLoaded = true;
    window.clearInterval(this.timerId);
    this.startTimer();
  }

  private getMins(seconds: number) {
    var minutesDisplay = Math.floor(seconds / 60);
    var secondsDisplay = seconds % 60;
    var timeDisplay = `${minutesDisplay.toString().padStart(2, "0")}:${secondsDisplay.toString().padStart(2, "0")}`;
    return timeDisplay;
  }
}
