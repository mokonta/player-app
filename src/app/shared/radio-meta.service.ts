import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NowPlayingModel } from './radio-station-data/now-playing';


@Injectable({
  providedIn: 'root'
})

export class RadioMetaService {

  private nowPlayingUrl = "https://stream.bigmixradio.uk/api/nowplaying/big_mix_radio";

  constructor(private http: HttpClient) { }

  getNowPlaying() : Observable<NowPlayingModel> {
    return this.http.get<NowPlayingModel>(this.nowPlayingUrl);
  }

}
