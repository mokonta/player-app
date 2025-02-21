import { StationDataModel } from "./station-data.model";

export class PubData {
    np: StationDataModel;
    triggers: string[];
    current_time: number;

    constructor() {
        this.np = new StationDataModel();
        this.triggers = [];
        this.current_time = 0;
    }
}

export class Publication {
    data: PubData;
    offset: number;

    constructor() {
        this.data = new PubData();
        this.offset = 0;
    }
}

export class Subscription {
    recoverable: boolean;
    epoch: string;
    publications: Publication[];
    recovered: boolean;
    positioned: boolean;
    was_recovering: boolean;

    constructor() {
        this.recoverable = false;
        this.epoch = "";
        this.publications = [];
        this.recovered = false;
        this.positioned = false;
        this.was_recovering = false;
    }
}

export class Subs {
    [key: string]: Subscription;
}

export class Connect {
    client: string;
    version: string;
    subs: Subs;
    ping: number;
    session: string;
    time: number;

    constructor() {
        this.client = "";
        this.version = "";
        this.subs = new Subs();
        this.ping = 0;
        this.session = "";
        this.time = 0;
    }
}

export class RadioMessageModel {
    channel: string;
    pub!: Publication;
    connect!: Connect;

    constructor() {
        this.channel = "";
    }
}