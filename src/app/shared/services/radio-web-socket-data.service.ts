import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { RadioMessageModel } from '../models/radio-message.model';

@Injectable({
  providedIn: 'root'
})
export class RadioWebSocketDataService {

  private socket$: WebSocketSubject<RadioMessageModel>;
  public messages$: Observable<RadioMessageModel>;   
  private connxMsg = { "subs": { "station:big_mix_radio": { "recover": true } } };        
  
  constructor() {
     this.socket$ = webSocket('wss://stream.bigmixradio.uk/api/live/nowplaying/websocket');
     this.sendMessage(this.connxMsg);
     this.messages$ = this.socket$.asObservable();
   }

  // Send a message to the server
  private sendMessage(message: any) {
    this.socket$.next(message);
  }

  // Close the WebSocket connection
  closeConnection() {
    this.socket$.complete();
  }
}
