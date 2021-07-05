# Projektni zahtev

## Veb aplikacija za igre i kvizove

### 1. Uvod

Veb aplikacija za igre i kvizove omogućava zabavu i proveru znanja korisnika. Sistem će biti dostupan za korišćenje
svim korisnicima putem veb pregledača [1].

#### 1.1 Cilj razvoja

Upotrebom aplikacije korisnici mogu na lak i efikasan način da testiraju svoje znanje.

#### 1.2 Obim sistema

Aplikacija će biti hostovana [2] na veb serveru[3] i pristupaće joj se putem veb pregledača. Za funkcionisanje celog sistema 
potrebno je obezbediti i pristup bazi podataka. Sistem ne može funkcionisati bez stalne internet konekcije.

#### 1.3 Prikaz proizvoda 

Funkcionalni zahtevi aplikacije:

* Prijava i registracija korisnika
* Unos korisničkog imena za neprijavljene/neregistrovane korisnike
* Dodavanje novih pitanja i izmena sadržaja u slučaju obeleženog netačnog odgovora za prijavljene/registrovane korisnike
* Mogućnost igranje kviza za prijavljene i neprijavljene korisnike
* Prikaz ostvarenih bodova
* Onemogućavanje slanja odgovora ukoliko je vreme isteklo

Nefunkcionalni zahtevi aplikacije:

* Aplikacija treba da bude hostovana na veb serveru
* Korisnici ne mogu uticati na rad aplikacije. Podaci koji se unose kroz različite forme prolaze višestruku proveru i na 
  klijentskoj i na serverskoj strani aplikacije.
  
#### 1.3.1 Perspektiva proizvoda

Aplikacija u narednim iteracijama moze pružiti beleženje ostvarenih rezultata koji bi bili javno vidljivi, odnosno ovo
bi omogućilo takmičarima uvid u rang listu i svoju poziciju na istoj što bi dalo podsticaj takmičarima da budu bolji i 
više koriste aplikaciju.

####1.3.2 Funkcije proizvoda

Na dijagramu slučajeva korišćenja (slika 1) prikazane su funkcije sistema namenjene krajnjem korisniku. Detalji o tipu
korisnika su detaljnije opisani u sekciji 1 i sekciji 1.3 ovog dokumenta.

![Slika 1](use_case_diagram.png)

#### 1.3.3 Karakteristike korisnika

Korisnik mora da ima pristup računaru i veb pretraživaču sa stabilnom internet konekcijom.

#### 1.3.4 Ograničenja

* Baza podataka mora da bude relaciona i treba koristiti MySQL ili MariaDB sistem za upravljanje bazama podataka (RDBMS) 
* Back-end i front-end delovi projekta moraju da budi pisani na TypeScript jeziku, prevedeni TypeScript prevodiocem na adekvatan JavaScript. 
* Za postupak provere identiteta korisnika koji upućuje zahteve back-end delu aplikacije može da se koristi mehanizam sesija ili JWT (JSON Web Tokena), po slobodnom izboru.
* Sav generisani HTML kôd koji proizvodi front-end deo aplikacije mora da bude 100% validan, tj. da prođe proveru W3C Validatorom (dopuštena su upozorenja - Warning, ali ne i greške - Error). 
* Grafički korisnički interfejs se generiše na strani klijenta (client side rendering), korišćenjem React biblioteke, dok podatke doprema asinhrono iz back-end dela aplikacije (iz API-ja).
* Front-end deo aplikacije treba da bude realizovan tako da se prilagođava različitim veličinama ekrana (responsive design).

#### 1.4 Definicije
1. Veb pregledač - (engl. web browser) poseban program čija je osnovna funkcija da omogući korisniku da pregledava web stranice, kao i sve prateće sadržaje širom globalne mreže (Interneta) [1]
2. Hostovanje - Host je bilo koji uređaj povezan u računalnu mrežu (najčešće Internet) a koji može korištenjem standardnih protokola ostvariti komunikaciju s drugim sličnim uređajima (hostovima). [2]
3. Veb server - U računarstvu, server je računarski program ili uređaj koji pruža funkcionalnost za druge programe ili uređaje koje zovemo "klijentima". [3]


### 2. Specifikacije zahteva
Registrovani i prijavljeni korisnici mogu da dodaju nova pitanja i izmene
sadržaje u slučaju obeleženog pogrešnog odgovora. Korisnik koji želi da igra kviz ne mora da se registruje, ali je potrebno
da upiše svoje korisničko ime prilikom pokretanja kviza.

Korisniku su na raspolaganju četiri različite igre:
* Prva igra koja se pokreće je generisanje reči od deset nasumično generisanih slova koju korisnik treba da upiše u tekstualno polje u roku od šezdeset sekundi. Reč treba biti što duža I za svako slovo se dobija jedan bod.

* Druga igra je pogađanje države sa zastavom. U navedenoj igri se prikaže zastava I u tekstualnom polju je potrebno da se upiše koja je država u pitanju. Korisnik ima deset sekundi vremena da pogodi koja je država u pitanju.

* Treća igra je pogađanje zastave za ime države. U navedenoj igri se prikaže naziv države I prikažu se tri ponuđene zastave. Korisnik treba da izabere koja je od navedenih zastava tačan odgovor. Korisnik ima deset sekundi vremena da pogodi koja je zastava tačan odgovor.

* Četvrta igra je pogađanje matematičkih pitanja. Korisnik ima trideset sekundi vremena da pogodi tačan odgovor. U ovoj igri korisnik bira koji je rezultat tačan za izraz koji se nalazi u pitanju.

#### 2.1 Spoljašnji interfejs

Skica spoljašnjeg interfejsa dostupna je u datoteci pod nazivom [mock.png](../02-resources/mock.png) unutar 02-resources/ direktorijuma. 
Skica je generisana putem alata [excalidraw](https://excalidraw.com/), u pomenutom direktorijumu nalazi se i datoteka [mock.excalidraw](../02-resources/mock.excalidraw) koji se
može učitati u excalidraw alat i time omogućiti bolji pregled skice interfejsa.

#### 2.2 Funkcije

U okviru sistema postoje dve role, prijavljeni korisnik i posetilac, ovlascenja po roli prikazana su u sekciji [1.3.2](#1.3.2-Funkcije-proizvoda)

#### 2.3 Pogodnosti za upotrebu

Sistem je realizovan kao veb aplikacija sto mu omogucava da bude lako dostupan i upotrebljiv.

#### 2.4 Zahtevane performanse

Sistem ne vrši kompleksne obrade podataka te je vrlo performantan, u slučaju slabije konekcije korisniku se prikazuje 
sadržaj koji ima svrhu da ga animira dok čeka na prikaz interfejsa.

#### 2.5 Zahtevi baze podataka

Model baze podataka sa tipovima podataka i obelezenim primarnim i stranim kljucevima dostupan je u datoteci pod nazivom [db-model.png](../02-resources/db-model.png)

#### 2.6 Projektna ograničenja

Ograničenja su navedena u sekciji [1.3.4](#1.3.4-Ograničenja)

#### 2.7 Sistemske karakteristike softvera

Zbog prirode tehnologija koje su korišćene pri pravljenju sistema on zahteva korišćenje modernih operativnih sistema i veb pretraživača

#### 2.8 Dopunske informacije

U direktorijumu 02-resources/ nalazi se dump baze podataka sa inicijalnim parametrima potrebnim za pokretanje sistema.
Kredencijali vec registrovanog korisnika su:
username: vsimonovski
pass: test123