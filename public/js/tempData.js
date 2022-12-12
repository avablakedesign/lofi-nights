const stations = [{}];
const shows = [{
    show_name: "Nocturne FM",
    trackQueue: [
        {src:"https://archive.org/download/cd_the-ultimate-four-seasons-vivaldis-greates_vivaldi/disc1/06.%20Vivaldi%20-%20Concerto%20in%20G%20minor%2C%20op.%208-2%20%28Summer%29%20-%20III.%20Presto_sample.mp3", played:null, ended:null, trackname: "Concerto in G minor, op. 8/2 (Summer) III Presto", artist: "Vivaldi"}, 
        {trackname:"Toccata in D minor", artist: "Bach", played:null, ended:null, src:"https://archive.org/download/ToccataAndFugueInDMinor/12ToccataAndFugueInDMinor.mp3"}
    ],
    playlists: [{
        playlists_id: 1, 
        tracks: [
            {artist:"Slowdive",
            album:"Souvlaki",
            label:"Creation Records",
            trackname:"When the sun hits",
            played: "2022-12-10: 13:30:00",
            ended: "2022-12-10: 13:34:16"
            },
            {artist:"Slowdive",
            album:"Souvlaki",
            label:"Creation Records",
            trackname:"Alison",
            played: "2022-12-10: 13:20:26",
            ended: "2022-12-10: 13:30:00"
            }
        ]
    }]
}];
const currentUser = {firstName: "John", lastName: "Smith", role_name: "Manager", email:"random@email.com"};