new Vue({
    el: '#app',
    data: {
        showInfoContainer: false,
        button_text: "Show activity",
        avatarUrl: '',
        username: '',
	    globalname: '',
        discriminator: '',
        banner: "https://cdn.discordapp.com/banners/530356512615563264/a_477d1187cb067c0a1ce9327fd67bdc4c.gif?size=480",
        status: '',
        avatar_color: '',
        farbe: 'green',
        spotify_name: '',
        spotify_artist: '',
        hoert_spotify: '',
        spotify_status: '',
        spotify_album: '',
        spotify_link_id: '',
        spotify_link: '',
        spotify_current_time: '',
        spotify_current_time_number: '',
        ende_zeit: '',
        ende_zeit_min_sek: '',
        millis_int: '',
        datenzeigen: '',
        datenzeigen3: '',
        aktivitaet:'',
        speichern1: '',
        speichern2: '',
        speichern_status1: '',
        speichern_status2: '',

        datenzeigen2: '',
        speichern_spiel1: '',
        speichern_spiel2: '',
        speichern_spiel3: '',
        spiel_url_id1: '',
        spiel_url_id2: '',
        spiel_url: '',
        spiel_url_ohne_assets: '',
        spiel_url_premid: '',
        spiel_url_kein_bild: '',
        spielma: '',
        spieloa: '',
        spielpr: '',
        spielkb: '',
        spielen: '',
        spiel_geteilt: '',
        spielanzeigen: '',
        nix: '',
        nix2: '',

    },
    mounted() {
        this.fetchData();
        setInterval(this.fetchData, 500);
    },
    methods: {
        showInfo() {
            this.showInfoContainer = !this.showInfoContainer;
            this.button_text = this.showInfoContainer ? "Hide activity" : "Show activity";
        },

        fetchData() {
            fetch('https://api.lanyard.rest/v1/users/530356512615563264')
                .then(response => response.json())
                .then(data => {
                    this.aktivitaet = "";
                    this.avatarUrl = "https://api.lanyard.rest/530356512615563264.png";
                    this.username = data.data.discord_user.username;
		    this.globalname = data.data.discord_user.global_name;
                    this.status = data.data.discord_status;
                    if (data.data.discord_status === "dnd"){
                        this.status = "Do not disturb! 🔴";
                        this.avatar_color = "#F8312F";
                    }
                    else if(data.data.discord_status === "online"){
                        this.status = "Online 🟢";
                        this.avatar_color = "#00D26A";
                    }
                    else if(data.data.discord_status === "idle"){
                        this.status = "Idle 🌙";
                        this.avatar_color = "#FCD53F";
                    }
                    else if(data.data.discord_status === "offline"){
                        this.status = "Offline ☁️";
                        this.avatar_color = "grey";
                    }
                    
                    if (data.data.spotify === null) {
                        this.spotify_status = null;
                        this.spotify_name = null;
                        this.spotify_artist = null;
                        this.spotify_album = null;
                        this.datenzeigen = false;
                        this.nix = true;
                    } else {
                        this.spotify_status = "Listening to Spotify...";

                        this.spotify_name = data.data.spotify.song;
                        this.speichern1 =  this.spotify_name;

                        this.spotify_artist = data.data.spotify.artist;
                        this.speichern2 = this.spotify_artist;

                        this.spotify_album = data.data.spotify.album_art_url;
                        this.datenzeigen=true;
                        this.nix = false;
                        this.spotify_link_id = data.data.spotify.track_id;
                        this.spotify_link= "https://open.spotify.com/track/" + this.spotify_link_id;
                        var start =  data.data.spotify.timestamps.start;
                        var end = data.data.spotify.timestamps.end;
                        this.ende_zeit = Math.round((end - start)/1000);
                        var ende_zeit_sek =this.ende_zeit%60;
                        var ende_zeit_min = parseInt(this.ende_zeit/60);
                        var ende_zeit_sek_text = "";
                        var ende_zeit_min_text = "";
                        if(ende_zeit_min < 10){
                            ende_zeit_min_text = "0" + ende_zeit_min.toString();
                        }
                        else{
                            ende_zeit_min_text  = ende_zeit_sek.toString();
                        }
                        if(ende_zeit_sek < 10){
                            ende_zeit_sek_text = "0" + ende_zeit_sek.toString();
                        }
                        else{
                            ende_zeit_sek_text = ende_zeit_sek.toString();
                        }
                        this.ende_zeit_min_sek = ende_zeit_min_text + ":" + ende_zeit_sek_text;
                        this.millis_int = Math.round((Date.now() - start)/1000);
                        var millis_sekunden = this.millis_int % 60;
                        var millis_minuten = parseInt(this.millis_int / 60);
                        var millis_sekunden_text = "";
                        var millis_minuten_text = "";
                        if(millis_sekunden < 10){
                            millis_sekunden_text = "0" + millis_sekunden.toString();
                        }
                        else{
                            millis_sekunden_text = millis_sekunden.toString();
                        }
                        if(millis_minuten < 10){
                            millis_minuten_text = "0" + millis_minuten.toString();
                        }
                        else{
                            millis_minuten_text = millis_minuten.toString();
                        }
                        this.spotify_current_time_number = millis_minuten_text + ":" + millis_sekunden_text;

                        var zeit = ((Date.now() - start)/(end - start) )*100;
                        this.spotify_current_time=Math.round(zeit);
                    }
                    if(data.data.activities.hasOwnProperty([0]) && data.data.activities[0].type == 4){
                        if(data.data.activities[0].name === "Custom Status")
                        this.speichern_status1 = "Own status:";
                        this.speichern_status2 = data.data.activities[0].state;
                        this.datenzeigen3 = true;
                    }
                    else{
                        this.speichern_status1 = null;
                        this.speichern_status2 = null;
                        this.datenzeigen2 = false;
                    }
                    if(data.data.activities.hasOwnProperty([0]) && data.data.activities[0].type == 0){
                        this.speichern_spiel1 = data.data.activities[0].name;
                        if(data.data.activities[0].hasOwnProperty("details")){
                            this.speichern_spiel2 = data.data.activities[0].details;
                        }
                        else{
                            this.speichern_spiel2 = null;
                        }
                        if(data.data.activities[0].hasOwnProperty("state")){
                            this.speichern_spiel3 = data.data.activities[0].state;
                        }
                        else{
                            this.speichern_spiel3 = null;
                        }
                        this.nix2 = false;
                        this.datenzeigen2 = true;
                        this.spiel_url_id1 = data.data.activities[0].application_id;
                        if(data.data.activities[0].hasOwnProperty("assets") && data.data.activities[0].hasOwnProperty("application_id")){
                            if(data.data.activities[0].assets.hasOwnProperty("large_image")){
                                if(data.data.activities[0].assets.large_image.startsWith("mp")){
                                    if(data.data.activities[0].assets.large_image.includes("i.")){
                                        this.spiel_geteilt = "i." + data.data.activities[0].assets.large_image.split("i.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                    else if(data.data.activities[0].assets.large_image.includes("i3.")){
                                        this.spiel_geteilt = "i3." + data.data.activities[0].assets.large_image.split("i3.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                    else if(data.data.activities[0].assets.large_image.includes("lh3.")){
                                        this.spiel_geteilt = "lh3." + data.data.activities[0].assets.large_image.split("lh3.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                    else if(data.data.activities[0].assets.large_image.includes("yuzu-emu.")){
                                        this.spiel_geteilt = "yuzu-emu." + data.data.activities[0].assets.large_image.split("yuzu-emu.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                }
                                else{
                                    this.spiel_url_id2 = data.data.activities[0].assets.large_image;
                                    this.spiel_geteilt = null;
                                }
                            }
                            else{
                                this.spiel_url_id2 = data.data.activities[0].assets.small_image;
                                this.spiel_geteilt = null;
                            }
                        }
                        else{
                            this.spiel_url_id2 = null;
                            this.spiel_geteilt = null;
                        }
                        if(this.spiel_url_id2 !== null && this.spiel_geteilt === null && data.data.activities[0].hasOwnProperty("application_id")){
                            this.spiel_url = "https://cdn.discordapp.com/app-assets/" + this.spiel_url_id1 + "/" + this.spiel_url_id2 + ".png";
                            this.spielma = true;
                            this.spieloa = false;
                            this.spielpr = false;
                            this.spielkb = false;
                        }
                        else if(this.spiel_url_id2 === null && this.spiel_geteilt === null && data.data.activities[0].hasOwnProperty("application_id")){
                            this.spiel_url_ohne_assets = "https://dcdn.dstn.to/app-icons/" + this.spiel_url_id1 + ".png";
                            this.spielma = false;
                            this.spieloa = true;
                            this.spielpr = false;
                            this.spielkb = false;
                        }
                        else if(this.spiel_geteilt !== null && this.spiel_url_id2 === null && data.data.activities[0].hasOwnProperty("application_id")){
                            this.spiel_url_premid = "https://" + this.spiel_geteilt;
                            this.spielma = false;
                            this.spieloa = false;
                            this.spielpr = true;
                            this.spielkb = false;
                        }
                        else if(!data.data.activities[0].hasOwnProperty("application_id")){
                            this.spielma = false;
                            this.spieloa = false;
                            this.spielpr = false;
                            this.spielkb = true;
                            this.spiel_url_kein_bild = "img/fragezeichen.jpg";
                        }
                        else{
                            this.spiel_url_ohne_assets = null;
                            this.spiel_url = null;
                            this.spiel_url_premid = null;
                            this.spiel_url_kein_bild = null;
                            this.datenzeigen2 = false;
                        }
                    }
                    else if(data.data.activities.hasOwnProperty([1]) && data.data.activities[1].type == 0){
                        this.speichern_spiel1 = data.data.activities[1].name;
                        if(data.data.activities[1].hasOwnProperty("details")){
                            this.speichern_spiel2 = data.data.activities[1].details;
                        }
                        else{
                            this.speichern_spiel2 = null;
                        }
                        if(data.data.activities[1].hasOwnProperty("state")){
                            this.speichern_spiel3 = data.data.activities[1].state;
                        }
                        else{
                            this.speichern_spiel3 = null;
                        }
                        this.nix2 = false;
                        this.datenzeigen2 = true;
                        this.spiel_url_id1 = data.data.activities[1].application_id;
                        if(data.data.activities[1].hasOwnProperty("assets") && data.data.activities[1].hasOwnProperty("application_id")){
                            if(data.data.activities[1].assets.hasOwnProperty("large_image")){
                                if(data.data.activities[1].assets.large_image.startsWith("mp")){
                                    if(data.data.activities[1].assets.large_image.includes("i.")){
                                        this.spiel_geteilt = "i." + data.data.activities[1].assets.large_image.split("i.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                    else if(data.data.activities[1].assets.large_image.includes("i3.")){
                                        this.spiel_geteilt = "i3." + data.data.activities[1].assets.large_image.split("i3.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                    else if(data.data.activities[1].assets.large_image.includes("lh3.")){
                                        this.spiel_geteilt = "lh3." + data.data.activities[1].assets.large_image.split("lh3.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                    else if(data.data.activities[1].assets.large_image.includes("yuzu-emu.")){
                                        this.spiel_geteilt = "yuzu-emu." + data.data.activities[0].assets.large_image.split("yuzu-emu.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                }
                                else{
                                    this.spiel_url_id2 = data.data.activities[1].assets.large_image;
                                    this.spiel_geteilt = null;
                                }
                            }
                            else{
                                this.spiel_url_id2 = data.data.activities[1].assets.small_image;
                                this.spiel_geteilt = null;
                            }
                        }
                        else{
                            this.spiel_url_id2 = null;
                            this.spiel_geteilt = null;
                        }
                        if(this.spiel_url_id2 !== null && this.spiel_geteilt === null && data.data.activities[1].hasOwnProperty("application_id")){
                            this.spiel_url = "https://cdn.discordapp.com/app-assets/" + this.spiel_url_id1 + "/" + this.spiel_url_id2 + ".png";
                            this.spielma = true;
                            this.spieloa = false;
                            this.spielpr = false;
                            this.spielkb = false;
                        }
                        else if(this.spiel_url_id2 === null && this.spiel_geteilt === null && data.data.activities[1].hasOwnProperty("application_id")){
                            this.spiel_url_ohne_assets = "https://dcdn.dstn.to/app-icons/" + this.spiel_url_id1 + ".png";
                            this.spielma = false;
                            this.spieloa = true;
                            this.spielpr = false;
                            this.spielkb = false;
                        }
                        else if(this.spiel_geteilt !== null && this.spiel_url_id2 === null && data.data.activities[1].hasOwnProperty("application_id")){
                            this.spiel_url_premid = "https://" + this.spiel_geteilt;
                            this.spielma = false;
                            this.spieloa = false;
                            this.spielpr = true;
                            this.spielkb = false;
                        }
                        else if(!data.data.activities[1].hasOwnProperty("application_id")){
                            this.spielma = false;
                            this.spieloa = false;
                            this.spielpr = false;
                            this.spielkb = true;
                            this.spiel_url_kein_bild = "img/fragezeichen.jpg";
                        }
                        else{
                            this.spiel_url_ohne_assets = null;
                            this.spiel_url = null;
                            this.spiel_url_premid = null;
                            this.spiel_url_kein_bild = null;
                            this.datenzeigen2 = false;
                        }
                    }
                    else if(data.data.activities.hasOwnProperty([2]) && data.data.activities[2].type == 0){
                        this.speichern_spiel1 = data.data.activities[2].name;
                        if(data.data.activities[1].hasOwnProperty("details")){
                            this.speichern_spiel2 = data.data.activities[2].details;
                        }
                        else{
                            this.speichern_spiel2 = null;
                        }
                        if(data.data.activities[1].hasOwnProperty("state")){
                            this.speichern_spiel3 = data.data.activities[2].state;
                        }
                        else{
                            this.speichern_spiel3 = null;
                        }
                        this.nix2 = false;
                        this.datenzeigen2 = true;
                        this.spiel_url_id1 = data.data.activities[2].application_id;
                        if(data.data.activities[2].hasOwnProperty("assets") && data.data.activities[2].hasOwnProperty("application_id")){
                            if(data.data.activities[2].assets.hasOwnProperty("large_image")){
                                if(data.data.activities[2].assets.large_image.startsWith("mp")){
                                    if(data.data.activities[2].assets.large_image.includes("i.")){
                                        this.spiel_geteilt = "i." + data.data.activities[2].assets.large_image.split("i.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                    else if(data.data.activities[2].assets.large_image.includes("i3.")){
                                        this.spiel_geteilt = "i3." + data.data.activities[2].assets.large_image.split("i3.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                    else if(data.data.activities[2].assets.large_image.includes("lh3.")){
                                        this.spiel_geteilt = "lh3." + data.data.activities[2].assets.large_image.split("lh3.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                    else if(data.data.activities[2].assets.large_image.includes("yuzu-emu.")){
                                        this.spiel_geteilt = "yuzu-emu." + data.data.activities[0].assets.large_image.split("yuzu-emu.")[1];
                                        this.spiel_url_id2 = null;
                                    }
                                }
                                else{
                                    this.spiel_url_id2 = data.data.activities[2].assets.large_image;
                                    this.spiel_geteilt = null;
                                }
                            }
                            else{
                                this.spiel_url_id2 = data.data.activities[2].assets.small_image;
                                this.spiel_geteilt = null;
                            }
                        }
                        else{
                            this.spiel_url_id2 = null;
                            this.spiel_geteilt = null;
                        }
                        if(this.spiel_url_id2 !== null && this.spiel_geteilt === null && data.data.activities[2].hasOwnProperty("application_id")){
                            this.spiel_url = "https://cdn.discordapp.com/app-assets/" + this.spiel_url_id1 + "/" + this.spiel_url_id2 + ".png";
                            this.spielma = true;
                            this.spieloa = false;
                            this.spielpr = false;
                            this.spielkb = false;
                        }
                        else if(this.spiel_url_id2 === null && this.spiel_geteilt === null && data.data.activities[2].hasOwnProperty("application_id")){
                            this.spiel_url_ohne_assets = "https://dcdn.dstn.to/app-icons/" + this.spiel_url_id1 + ".png";
                            this.spielma = false;
                            this.spieloa = true;
                            this.spielpr = false;
                            this.spielkb = false;
                        }
                        else if(this.spiel_geteilt !== null && this.spiel_url_id2 === null && data.data.activities[2].hasOwnProperty("application_id")){
                            this.spiel_url_premid = "https://" + this.spiel_geteilt;
                            this.spielma = false;
                            this.spieloa = false;
                            this.spielpr = true;
                            this.spielkb = false;
                        }
                        else if(!data.data.activities[1].hasOwnProperty("application_id")){
                            this.spielma = false;
                            this.spieloa = false;
                            this.spielpr = false;
                            this.spielkb = true;
                            this.spiel_url_kein_bild = "img/fragezeichen.jpg";
                        }
                        else{
                            this.spiel_url_ohne_assets = null;
                            this.spiel_url = null;
                            this.spiel_url_premid = null;
                            this.spiel_url_kein_bild = null;
                            this.datenzeigen2 = false;
                        }
                    }
                    else {
                      this.spielma = false;
                      this.spieloa = false;
                      this.spielpr = false;
                      this.spielkb = false;
                      this.nix2 = true;
                      this.datenzeigen2 = false;
                    }
                })
                .catch(error => console.log(error));
        }
    }
});

