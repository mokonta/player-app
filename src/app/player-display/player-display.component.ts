import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { StationDataModel } from '../shared/models/station-data.model';
import { NgOptimizedImage } from '@angular/common';
import { RadioWebSocketDataService } from '../shared/services/radio-web-socket-data.service';

@Component({
  selector: 'app-player-display',
  imports: [AsyncPipe, NgOptimizedImage],
  templateUrl: './player-display.component.html',
  styleUrl: './player-display.component.scss'
})
export class PlayerDisplayComponent {

  stationData: StationDataModel;
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
    this.stationData = new StationDataModel();
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
    this.getNowPlayingData();
  }

  private getNowPlayingData() {
      this.messageSubscription = this.webSocketService.messages$.subscribe((message) => {
      if (message.pub) {
        this.handleMessageData(message.pub);
      }
      else if (message.connect) {
        const connectData = message.connect;

        // New Centrifugo cached NowPlaying initial push.
        for (const subName in connectData.subs) {
          const sub = connectData.subs[subName];
          if ('publications' in sub && sub.publications.length > 0) {
            sub.publications.forEach((initialRow: any) => this.handleMessageData(initialRow));
          }
        }
      }
    });
  }

  private handleMessageData(ssePayload: any) {
    this.stationData = ssePayload.data.np;
    
    if (this.songId != this.stationData.now_playing.song.id) {
      this.resetDisplay(this.stationData); // song has changed
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

  private resetDisplay(stationDataModel: StationDataModel) {
    this.stationData = stationDataModel;
    this.elapsedTime = stationDataModel.now_playing.elapsed;
    this.remainingTime = stationDataModel.now_playing.remaining;
    this.duration = stationDataModel.now_playing.duration;
    this.durationDisplay = this.getMins(this.duration);
    this.elapsedTimeDisplay = this.getMins(this.elapsedTime);
    this.songId = stationDataModel.now_playing.song.id;
    this.nowPlayingImage = stationDataModel.now_playing.song.art;
    this.nextPlayingImage = stationDataModel.playing_next.song.art;

    if (stationDataModel.now_playing.song.custom_fields.dj_url) {
      this.nowPlayingDjUrl = stationDataModel.now_playing.song.custom_fields.dj_url;
    }

    if (stationDataModel.playing_next.song.custom_fields.dj_url) {
      this.nextDjUrl = stationDataModel.playing_next.song.custom_fields.dj_url;
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

  ngOnDestroy() {
    // Unsubscribe from WebSocket messages and close the connection
    this.messageSubscription.unsubscribe();
    this.webSocketService.closeConnection();
  }
}
