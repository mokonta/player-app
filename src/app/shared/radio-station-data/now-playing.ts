export class CustomFields {
  dj_url: string;

  constructor() {
    this.dj_url = "";
  }
}

export class Listeners {
  total: number;
  unique: number;
  current: number;

  constructor() {
    this.total = 0;
    this.unique = 0;
    this.current = 0;
  }
}

export class Remote {
  id: number;
  name: string;
  url: string;
  bitrate: number;
  format: string;
  listeners: Listeners;

  constructor() {
    this.id = 0;
    this.name = "";
    this.url = "";
    this.bitrate = 0;
    this.format = "";
    this.listeners = new Listeners();
  }
}

export class Song {
  text: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
  isrc: string;
  lyrics: string;
  id: string;
  art: string;
  custom_fields: CustomFields;

  constructor() {
    this.text = "";
    this.artist = "";
    this.title = "";
    this.album = "";
    this.genre = "";
    this.isrc = "";
    this.lyrics = "";
    this.id = "";
    this.art = "";
    this.custom_fields = new CustomFields();
  }
}

export class Live {
  is_live: boolean;
  streamer_name: string;
  broadcast_start: number;
  art: string;

  constructor() {
    this.is_live = false;
    this.streamer_name = "";
    this.broadcast_start = 0;
    this.art = "";
  }
}

export class NowPlaying {
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: Song;
  elapsed: number;
  remaining: number;

  constructor() {
    this.sh_id = 0;
    this.played_at = 0;
    this.duration = 0;
    this.playlist = "";
    this.streamer = "";
    this.is_request = false;
    this.song = new Song();
    this.elapsed = 0;
    this.remaining = 0;
  }
}

export class PlayingNext {
  cued_at: number;
  played_at: number;
  duration: number;
  playlist: string;
  is_request: boolean;
  song: Song;

  constructor() {
    this.cued_at = 0;
    this.played_at = 0;
    this.duration = 0;
    this.playlist = "";
    this.is_request = false;
    this.song = new Song();
  }
}

export class SongHistory {
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: Song;

  constructor() {
    this.sh_id = 0;
    this.played_at = 0;
    this.duration = 0;
    this.playlist = "";
    this.streamer = "";
    this.is_request = false;
    this.song = new Song();
  }
}

export class NowPlayingModel {
  listeners: Listeners;
  live: Live;
  now_playing: NowPlaying;
  playing_next: PlayingNext;
  song_history: SongHistory[];
  is_online: boolean;
  cache: string;

  constructor() {
    this.listeners = new Listeners();
    this.live = new Live();
    this.now_playing = new NowPlaying();
    this.playing_next = new PlayingNext();
    this.song_history = [];
    this.is_online = false;
    this.cache = "";
  }
}
