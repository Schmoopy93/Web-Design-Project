var korisnik1 = {Ime: "Marko", Prezime: "Rajic", Email: "rajicm@hotmail.com", Pol: "Musko", Korisničko_ime: "markor412", Lozinka: "markor412", Adresa: "Alekse Santica 52/40", Telefon: "0604043991" };
var korisnik2 = {Ime: "Petar", Prezime: "Petrovic", Email: "petarp@gmail.com", Pol: "Musko", Korisničko_ime: "petar412", Lozinka: "petar412", Adresa:"Sremska 47", Telefon: "0639384498"};
var korisnik3 = {Ime: "Mika", Prezime: "Mikic", Email: "mikam@gmail.com", Pol: "Musko", Korisničko_ime: "mika412", Lozinka: "mika412", Adresa: "Vojvodjanska 54", Telefon: "0610098745"};
var korisnici = [korisnik1,korisnik2,korisnik3]


function ucitajkorisnik() {
    for (var korisnik in korisnici) {
        localStorage.setItem(korisnici[korisnik].Korisničko_ime, JSON.stringify(korisnici[korisnik]))
    }
}

function logovanje() {
    
    var a = document.getElementById("kor_ime").value;
    var b = document.getElementById("lozinka").value;

    if(localStorage.getItem(a) !== null)
    
    {
        korisnik = JSON.parse(localStorage.getItem(a))
        
        
        if (korisnik.Lozinka !== b)
        {
        alert('Uneli ste pogrešnu lozinku, molimo Vas pokušajte ponovo !')
            
        }
        else
        {
            alert('Uspešno ste se ulogovali !'); 
            localStorage.setItem("aktivni_korisnik", JSON.stringify(korisnik));
            window.open('../htmls/Pocetna.html');
        }
        
    }
    else
    {
    alert('Molimo vas da popunite sva polja koja se zahtevaju od Vas !')
        }
}

function provera_korisnika() {
    var a = JSON.parse(localStorage.getItem("aktivni_korisnik"))

    if(a !== null)
    
    {
        var korisnik = a
        var ime_baza = korisnik["Ime"];
        var prezime_baza = korisnik["Prezime"];

        var kor_info = document.createElement('div');
        kor_info.classList.add('box_kor');

        var kor_ime = document.createElement('div');
        kor_ime.appendChild(document.createTextNode("Ime: " + ime_baza));
        kor_ime.classList.add('kor_ime');

        var kor_prezim = document.createElement('div');
        kor_prezim.appendChild(document.createTextNode("Prezime: " + prezime_baza));
        kor_prezim.classList.add('kor_prezim');

        kor_info.appendChild(kor_ime)
        kor_info.appendChild(kor_prezim)
        document.getElementById('prov_korisnik').appendChild(kor_info);

        
    }
} 

function registracija() {
            
    var Korisničko_ime = document.getElementById("Korisničko_ime");
    var Lozinka = document.getElementById("Lozinka");
    var Ime = document.getElementById("Ime");
    var Prezime = document.getElementById("Prezime");
    var Datum_rodjenja = document.getElementById("Datum_rodjenja");
    var Adresa = document.getElementById("Adresa");
    var Grad = document.getElementById("Grad");
    var Email = document.getElementById("Email");
    var Telefon = document.getElementById("Telefon");

    var korisnik = {"Korisničko_ime": Korisničko_ime.value,"Lozinka": Lozinka.value, "Ime": Ime.value, "Prezime": Prezime.value, "Datum_rodjenja": Datum_rodjenja.value, "Adresa": Adresa.value, "Grad": Grad.value, "Email": Email.value, "Telefon": Telefon.value}
    localStorage.setItem(Korisničko_ime.value,JSON.stringify(korisnik));
    window.alert("Uspešno ste se registrovali ! ");
    window.location = "../htmls/Pocetna.html";
}


function dodaj_oglas() {
    var broj_oglasa = localStorage.getItem("broj_oglasa");
    var Naslov = document.getElementById("Naslov").value;
    var Količina = document.getElementById("Količina").value;
    var Kategorije = document.getElementById("Kategorije").value;
    var Cena = document.getElementById("Cena").value;
    var Način_plaćanja = document.getElementById("Način_plaćanja").value;
    var Dodaj_sliku = document.getElementById("Dodaj_sliku").files[0].ime;


    if ((Naslov && Količina && Kategorije && Cena && Način_plaćanja).length >0){
        var oglas = {"Slika":"../resources/" + Dodaj_sliku,
        "Naslov": Naslov,
        "Količina": Količina,
        "Kategorije": Kategorije,
        "Cena": Cena,
        "Način_plaćanja": Način_plaćanja,
        }
        localStorage.setItem("oglas" + broj_oglasa++, JSON.stringify(oglas));
        window.alert("Uspešno ste kreirali oglas !");
        localStorage.setItem("broj_oglasa", broj_oglasa);
        window.location("Pocetna.html")

    }
    else {
        alert("Niste popunili svako obavezno polje !");
    }
        
}

var sviOglas = [];

function dugme(a) {
    if (a.keyCode == 13)
        pretraga();
}

err_izb = function(){};

function pretraga() {
    var unos = document.getElementById('search').value;
    var errmsg = document.getElementById('ErrorMessage');
    if (unos == "") {
            errmsg.appendChild(document.createTextNode('You have searched nothing!'));
    }
    else {
        var a = unos.toLowerCase();
        for (oglas in sviOglas) {
            if (sviOglas[oglas].Naslov.toLowerCase().includes(a)) {
                document.getElementById("oglas" + oglas).classList.add('pronadjen');
            }
        }
    }
}

function prikaz_oglas() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.toLowerCase().startsWith("oglas")) {
            var baza_oglas = localStorage.getItem(localStorage.key(i));

            var oglasi = JSON.parse(baza_oglas);
            allAds.push(oglasi);
            var baza_imena = oglasi["Naslov"];
            var baza_cena = oglasi["Cena"];
            var baza_kolicina = oglasi["Količina"];
            var baza_slika = oglasi["slika_id"];

            var ad = document.createElement('div');
            ad.classList.add('ad');
            ad.setAttribute('id', key);

            var ime = document.createElement('div');
            ime.appendChild(document.createTextNode(baza_imena));
            ime.classList.add('ime');

            var kolicina = document.createElement('div');
            kolicina.appendChild(document.createTextNode(baza_kolicina));
            kolicina.classList.add('kolicina');

            var price = document.createElement('div');
            price.appendChild(document.createTextNode(baza_cena + ".00"+""+"USD"));
            price.classList.add('Price');

            var slika_id = document.createElement('div');
            var slika = document.createElement('img');
            slika.setAttribute('src', baza_slika);
            slika.classList.add('Dodaj_sliku');
            slika_id.appendChild(slika);

            ad.appendChild(slika);
            ad.appendChild(ime);
            ad.appendChild(price);
            document.getElementById('OglasPrikaz').appendChild(ad);
        } 
    }