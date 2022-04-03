export interface ConnectionResult {
    connections: Connection[],
    from: Station,
    to: Station,
    stations: { from: Station[], to: Station[] };
}

interface Station {
    name: string;
}

export interface Connection {
    from: Checkpoint;
    to: Checkpoint;
    duration: string;
    products: string[];
    sections: Section[];
}

 interface Section {
    arrival: SectionDetail;
    departure: SectionDetail;
    journey: {category: string};
    walk: any;
}

 interface Checkpoint {
    station: Station;
    arrival: string;
    departure: string;
    delay: string;
}

 interface SectionDetail {
    arrival: string;
    departure: string;
    station: Station;
}