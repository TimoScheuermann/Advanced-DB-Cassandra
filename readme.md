# Installation & SetUp

## Datensätze laden

Die Datensätze der NHL-Statistik wurden von Kaggle geladen [[https://www.kaggle.com/martinellis/nhl-game-data]](https://www.kaggle.com/martinellis/nhl-game-data%5D)(Hier laden)



## Cassandra DB mit Hilfe von Docker aufsetzen

Für das Aufsetzen der Datenbank muss das Cassandra Image vom DockerHub geladen werden [https://hub.docker.com/_/cassandra](Cassandra Image)

Hierzu wird folgender Befehl ausgeführt:

```shell
 docker run --name cassy -d -p 9042:9042 cassandra:tag
```

> **Wichtig** der Port der später vom Backend verwendet wird ist `9042`, deshalb muss dieser dementsprechend nach ausen hin offen sein.



Bevor nun mit der Datenbank gearbeitet werden kann, müssen die CSV Dateien, welche die Datensätze beinhalten in das Image geladen werden, um sie später in eine Tabelle in Cassandra zu laden.

```shell
docker cp {Pfad zur .csv Datei}/{Name}.csv cassy:/{NAME}.csv
```

> Wo die Datei in Cassy gespeichert wird, ist an sich egal. Man muss später nur den Pfad wissen, um die Daten in Cassandra zu importieren



Nachdem nun die Datensätze ins Image geladen wurden, kann mit folgendem Befehl auf die DB zugegriffen werden

```shell
docker exec -it cassy cqlsh
```

Es muss ein Keyspace ausgewählt werden, bzw. erstellt werden falls noch nicht vorhanden

**Erstellen**

```sql
CREATE  KEYSPACE IF NOT EXISTS nhl_stats 

   WITH REPLICATION = { 
      'class' : 'SimpleStrategy', 'replication_factor' : 3
   }
 ;
```

**Benutzen**

```sql
use nhl_stats;
```



Nun müssen noch die Tabellen erstellt werden und mit Datensätzen befüllt werden. Wir haben uns dabei am Relationsschema der Datensätze gehalten, welches sich im gleichen Ordner wie die Datensätze befindet. `table_relationships.JPG`



**Tabellen erstellen**



> **Info** alle Befehle sind aufgelistet um alle Tabellen zu erstellen die für NHL-Stats benötigt werden



*game_goalie_stats*

```sql
CREATE TABLE game_goalie_stats (game_id int, player_id int, team_id int, timeOnIce int, assists int, goals int, pim int, shots int, saves int, powerPlaySaves int, shortHandedSaves int, evenSaves int, shortHandedShotsAgainst int, evenShotsAgainst int, powerPlayShotsAgainst int, decision text, savePercentage double, powerPlaySavePercentage double, evenStrengthSavePercentage double, PRIMARY KEY (game_id, player_id));
```

*game_shifts*

```sql
CREATE TABLE game_shifts (game_id int, player_id int, period int, shift_start int, shift_end int, PRIMARY KEY (game_id, player_id, period, shift_start, shift_end));
```

*game_teams_stats*

```sql
CREATE TABLE game_teams_stats (game_id int, team_id int, HoA text, won boolean, settled_in text, head_coach text, goals int, shots int, hits int, pim int, powerPlayOpportunities int, powerPlayGoals int, faceOffWinPercentage double, giveaways int, takeaways int, PRIMARY KEY (game_id, team_id));
```

*game*

```sql
CREATE TABLE game (game_id int PRIMARY KEY, season int, type text, date_time text, date_time_GMT text, away_team_id int, home_team_id int, away_goals int, home_goals int, outcome text, home_rink_side_start text, venue text, venue_link text, venue_time_zone_id text, venue_time_zone_offset int, venue_time_zone_tz text);
```

*game_skater_stats*

```sql
CREATE TABLE game_skater_stats (game_id int, player_id int, team_id int, timeOnIce int, assists int, goals int, shots int, hits int, powerPlayGoals int, powerPlayAssists int, penaltyMinutes int, faceOffWins int, faceoffTaken int, takeaways int, giveaways int, shortHandedGoals int, shortHandedAssists int, blocked int, plusMinus int, evenTimeOnIce int, shortHandedTimeOnIce int, powerPlayTimeOnIce int, PRIMARY KEY (game_id, player_id));
```

*game_plays_players*

```sql
CREATE TABLE game_plays_players (play_id text, game_id int, play_num int, player_id int, playerType text, PRIMARY KEY (play_id, game_id, play_num, player_id));
```

*player_info*

```sql
CREATE TABLE player_info (player_id int, firstName text, lastName text, nationality text, birthCity text, primaryPosition text, birthDate date, link text, PRIMARY KEY (player_id));
```



**Datensätze der CSV importieren**

> **Info** alle Befehle sind aufgelistet um alle Tabellen mit Datensätzen zu befüllen

> **Wichtig** unser Pfad für die .csv Dateien ist direkt bei Cassy. Wir haben keinen Unterordner verwendet. Ggf. muss der Pfad zur .csv angepasst werden

*game_goalie_stats*

```sql
COPY game_goalie_stats (game_id, player_id, team_id, timeOnIce, assists, goals, pim, shots, saves, powerPlaySaves, shortHandedSaves, evenSaves, shortHandedShotsAgainst, evenShotsAgainst, powerPlayShotsAgainst, decision, savePercentage, powerPlaySavePercentage, evenStrengthSavePercentage) FROM 'game_goalie_stats.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

*game_shifts*

```sql
COPY game_shifts (game_id, player_id, period, shift_start, shift_end) FROM 'game_shitfts.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

*game_teams_stats*

```sql
COPY game_teams_stats (game_id, team_id, HoA, won, settled_in, head_coach, goals, shots, hits, pim, powerPlayOpportunities, powerPlayGoals, faceOffWinPercentage, giveaways, takeaways) FROM 'game_teams_stats.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

*game*

```sql
COPY game (game_id, season, type, date_time, date_time_GMT, away_team_id, home_team_id, away_goals, home_goals, outcome, home_rink_side_start, venue, venue_link, venue_time_zone_id, venue_time_zone_offset, venue_time_zone_tz) FROM 'game.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

*game_skater_stats*

```sql
COPY game_skater_stats (game_id, player_id, team_id, timeOnIce, assists, goals, shots, hits, powerPlayGoals, powerPlayAssists, penaltyMinutes, faceOffWins, faceoffTaken, takeaways, giveaways, shortHandedGoals, shortHandedAssists, blocked, plusMinus, evenTimeOnIce, shortHandedTimeOnIce, powerPlayTimeOnIce) FROM 'game_skater_stats.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

*game_plays_players*

```sql
COPY game_plays_players (play_id, game_id, play_num, player_id, playerType) FROM 'game_plays_players.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

*player_info*

```sql
COPY player_info (player_id, firstName, lastName, nationality, birthCity, primaryPosition, birthDate, link) FROM 'player_info.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```



**Suchfunktionalität ermöglichen**

Cassandra bietet nicht direkt ab Werk eine Suchfunktion an. Deshalb müssen folgende Befehle zusätzlich ausgeführt werden

```sql
CREATE CUSTOM INDEX fn_prefix ON player_info (firstName) USING 'org.apache.cassandra.index.sasi.SASIIndex';
```

```sql
CREATE CUSTOM INDEX ln_prefix ON player_info (lastName) USING 'org.apache.cassandra.index.sasi.SASIIndex';
```



## GitHub-Repo zur Darstellung der Daten laden

Unser Repo lässt sich unter folgendem Link finden: [https://github.com/TimoScheuermann/Advanced-DB-Cassandra](https://github.com/TimoScheuermann/Advanced-DB-Cassandra)



Ansonsten einfach clonen

```git
git clone git@github.com:TimoScheuermann/Advanced-DB-Cassandra.git
```

Im Ordner befindet sich einmal das Backend und das Frontend



> Um das Backend und Frontend zu starten wird NPM.js benötigt



**Backend starten**

Navigiere hierzu in den Ordner `/backend` und führe folgende Befehle aus

```shell
npm i
```

```shell
npm run start
```



**Frontend starten**

Navigiere hierzu in den Ordner `/frontend` und führe folgende Befehle aus

```shell
npm i
```

```shell
npm run serve
```



## Wrapping up

Nachdem die Datenbank, das Backend und das Frontend gestarten wurden, können die NHL Statistiken unter `http://localhost:8080` eingesehen werden. Das Backend ist unter `http://localhost:3000` erreichbar. Hier befinden sich auch Beispiele für einen möglichen GET-Request.



### Implementierte GET-Requests (42)

> **Informationen**
> 
> * `P` & `R` stehen jeweils für Playoffs / Regular-Season
> 
> * Ein Beispiel für eine Season wäre `20172018`
> 
> * `player` & `team` sind jeweils die Team-IDs
> 
> * `playername` kann entweder der Vor-/ bzw. Nachname eines Spieler sein



**Generell**

- _Alle Teams auslesen_
   - **localhost:3000/get/teams**
- _Alle Seasons auslesen_ 
   - **localhost:3000/get/seasons**
- _Alle Spieler auslesen_ 
   - **localhost:3000/get/players**
- _Alle Destinations auslesen_
   - **localhost:3000/get/destinations**
- _Einen Spieler finden_ 
   - **localhost:3000/find/player/`playername`**
- _Alle Gametypes auslesen_ 
   - **localhost:3000/get/gametypes**

**All**

- _Alle Tore auslesen_ 
  
   - **localhost:3000/get/goals/total**

- _Missing description_ 
  
   - **localhost:3000/get/goals/home**

- _Missing description_ 
  
   - **localhost:3000/get/goals/away**

- _Missing description_ 
  
   - **localhost:3000/get/goals/total/`P|R`**

- _Missing description_ 
  
   - **localhost:3000/get/goals/home/`P|R`**

- _Missing description_ 
  
   - **localhost:3000/get/goals/away/`P|R`**

- _Alle Tore einer Saison auslesen_ 
  
   - **localhost:3000/get/goals/season/`season`**

- _Missing description_ 
  
   - **localhost:3000/get/goals/season/`season`/home**

- _Missing description_ 
  
   - **localhost:3000/get/goals/season/`season`/away**

- _Missing description_ 
  
   - **localhost:3000/get/goals/season/`season`/total/`P|R`**

- _Missing description_ 
  
   - **localhost:3000/get/goals/season/`season`/home/`P|R`**

- _Missing description_ 
  
   - **localhost:3000/get/goals/season/`season`/away/`P|R`**

**Team**

- _Alle Tore eins Teams auslesen_ 
  
   - **localhost:3000/get/goals/team/`team`/total**

- _Alle Heim-Tore eines Teams auslesen_ 
  
   - **localhost:3000/get/goals/team/`team`/home**

- _Alle Auswärts-Tore eines Teams auslesen_ 
  
   - **localhost:3000/get/goals/team/`team`/away**

- _Alle Tore eines Teams während der PlayOffs/Regular-Season auslesen_ 
  
   - **localhost:3000/get/goals/team/`team`/total/`P|R`**

- _Alle Heim-Tore eines Teams während der PlayOffs/Regular-Season auslesen_ 
  
   - **localhost:3000/get/goals/team/`team`/home/`P|R`**

- _Alle Auswärts-Tore eines Teams während der PlayOffs/Regular-Season auslesen_ 
  
   - **localhost:3000/get/goals/team/`team`/away/`P|R`**

- _Alle Tore eines Teams während während einer Saison_ 
  
   - **localhost:3000/get/goals/team/`team`/season/`season`/total**

- _Alle Heim-Tore eines Teams während während einer Saison_ 
  
   - **localhost:3000/get/goals/team/`team`/season/`season`/home**

- _Alle Auswärts-Tore eines Teams während während einer Saison_ 
  
   - **localhost:3000/get/goals/team/`team`/season/`season`/away**

- _Alle Tore eines Teams während während einer Saison während der PlayOffs/Regular-Saison_ 
  
   - **localhost:3000/get/goals/team/`team`/season/`season`/total/`P|R`**

- _Alle Heim-Tore eines Teams während während einer Saison während der PlayOffs/Regular-Saison_ 
  
   - **localhost:3000/get/goals/team/`team`/season/`season`/home/`P|R`**

- _Alle Auswärts-Tore eines Teams während während einer Saison während der PlayOffs/Regular-Saison_ 
  
   - **localhost:3000/get/goals/team/`team`/season/`season`/away/`P|R`**

**Player**

- _Alle Tore eines Spielers auslesen_ 
  
   - **localhost:3000/get/goals/player/`player`/total**

- _Alle Heim-Tore eines Spielers auslesen_ 
  
   - **localhost:3000/get/goals/player/`player`/home**

- _Alle Auswärts-Tore eines Spielers auslesen_ 
  
   - **localhost:3000/get/goals/player/`player`/away**

- _Alle Tore eines Spielers während der PlayOffs/Regular-Season_ 
  
   - **localhost:3000/get/goals/player/`player`/total/`P|R`**

- _Alle Heim-Tore eines Spielers während der PlayOffs/Regular-Season_ 
  
   - **localhost:3000/get/goals/player/`player`/home/`P|R`**

- _Alle Auswärts-Tore eines Spielers während der PlayOffs/Regular-Season_ 
  
   - **localhost:3000/get/goals/player/`player`/away/`P|R`**

- _Alle Tore eines Spielers während einer Saison_ 
  
   - **localhost:3000/get/goals/player/`player`/season/`season`/total**

- _Alle Heim-Tore eines Spielers während einer Saison_ 
  
   - **localhost:3000/get/goals/player/`player`/season/`season`/home**

- _Alle Auswärts-Tore eines Spielers während einer Saison_ 
  
   - **localhost:3000/get/goals/player/`player`/season/`season`/away**

- _Alle Tore eines Spielers während einer Saison während der PlayOffs/Regular-Season_ 
  
   - **localhost:3000/get/goals/player/`player`/season/`season`/total/`P|R`**

- _Alle Heim-Tore eines Spielers während einer Saison während der PlayOffs/Regular-Season_ 
  
   - **localhost:3000/get/goals/player/`player`/season/`season`/home/`P|R`**

- _Alle Auswärts-Tore eines Spielers während einer Saison während der PlayOffs/Regular-Season_ 
  
   - **localhost:3000/get/goals/player/`player`/season/`season`/away/`P|R`**



# Apache Cassandra Datenbank

## Allgemeines

* NoSQL-Datenbank
* Spaltenorientierte Datenbank (wide-columns-store data base)
* Cassandra Query Language (CQL)

## Geschichte

Apache Cassandra wurde bei Facebook entwickelt, um die Suche nach Direktnachrichten in der Inbox des Benutzers zu ermöglichen. Damit war von Anfang an ein Klientel für die Datenbank schon festgelegt - Soziale Netzwerke. Nachdem die Datenbank dann ein Apache Incubator Projekt wurde haben auch andere große Unternehmen, unter anderem Twitter oder IBM, daran beteiligt. Apache Incubator hilft Projekten auf ihrem Weg, ein Projekt der Apache Software Foundation zu werden. Dort existiert es jetzt immer noch als Open-Source-Projekt, wird aber auch von DataStax als Lösung an Unternehmen verkauft.

## Betrieb

Der Betrieb einer Cassandra Datenbank findet in einem Cluster statt. Das heißt, dass viele einzelne Knoten (Nodes) ringförmig zusammengeschlossen werden. Dieser Ring hat keinen überlegenen Knoten - alle Knoten sind auf einem Niveau und haben alle die gleichen Rechte und Fähigkeiten. Folglich gibt es auch keinen "Single Point of Failure". Das heißt, dass der Ausfall eines Knotens nicht den Ausfall der gesamten Datenbank bedeutet. Dies ist zugleich einer der größten Vorteile der Cassandra Datenbank. Damit beim Ausfall eines Knotens trotzdem auf die Daten zugegriffen werden können, werden die Daten als Replikationen auf mehreren Knoten gespeichert.

## Vorteile

* Kein "Single Point of Failure" -> hohe Ausfallsicherheit
* Verteilte Datenbank aufgrund der "gleichwertigen" Knoten
* Hohe Skalierbarkeit -> jeder neue Knoten bedeutet linear mehr Kapazität

---

# OLAP Cube

## Allgemeines

OLAP-Würfel, auch Datenwürfel oder Cube-Operator genannt, werden für die logische Darstellung von großen Datenmengen und deren Analyse verwendet. Hierbei werden die Daten als Elemente eines mehrdimensionalen „Würfel“ (auch Hypercube genannt) dargestellt, sodass die einzelnen Daten die verschiedenen Dimensionen beschreiben, welche über die verschiedenen Achsen ausgewählt werden können. OLAP-Würfel werden häufig für Data Warehousing oder Online-Analytical-Processing- Applikationen verwendet. Im Allgemeinen jedoch werden diese eher bei Auswertungen von zahlenorientierten, als bei textorientierten Daten angewandt. Auswertungen und Reports können erstellt werden, welche die gegebenen Kriterien in fast jeder beliebigen Kombination darstellen.

## Aufbau

Zusammengesetzt ist der OLAP-Würfel aus multidimensionalen Datenarrays. Jede Achse des Würfels besteht aus abgegrenzten Werten, die die multidimensionale Struktur und die Ausbreitungsrichtung des Würfels darstellen. Die Knotenpunkte des Würfels stellen hierbei die möglichen Kombinationsmöglichkeiten der Dimensionen dar. Alle bekannten Kennzahlen werden in den einzelnen Zellen der Schnittpunkte der Koordinaten hinterlegt. In rationalen Systemen wird der Würfel in einem „Sternschema“ dargestellt, sodass eine Faktentabelle zu mehreren Dimensionstabellen führt, welche die einzelnen Kennzahlen enthalten.

## Operationen

* Slicing: Ausschneiden von „Datenscheiben“ aus Würfel
* Dicing: Erzeugen eines kleineren (mehrdimensionalen) Würfels mit einem Teilvolumen der gesamten Daten
* Pivoting/Rotation: Drehen des Würfels um die eigene Achse → unterschiedliche Sichten auf die Daten
* Drill-Down: Hereinzoomen in den Würfel → höherer Detailgrad
* Drill-Up/Roll-Up: Herauszoomen aus Würfel → Verdichtung der Daten
* Drill-Across: Betrachten von benachbarten Dimensionselementen
* Drill-Through: Auswerten weiterer OLAP-Würfel auf horizontaler Ebene
* Split: Aufteilen eines Wertes auf mehrere Dimensionen → weitere Details
* Merge/Drill-In: Entfernen zusätzlicher Dimensionen → Granularität verringern

## Vorteile

* Kompakte Anordnung der Daten
* Hohe Abfragegeschwindigkeit
* Durch die Rotation-Operation Erzeugen von neuen Sichten auf die Daten, ohne die Struktur der Ablage zu ändern
* Kriterien selektieren und kombinieren
* Beliebig viele Dimensionen der Daten in die Analyse einbeziehen
* Einfaches Aufaddieren der Daten
* Möglichkeit des intuitiven Navigierens und Betrachten der Datenbestände
* Konsistenz der Informationen und Berechnungen
* „Was wäre wenn“-Szenarios möglich
* Zeitserien lassen sich schnell analysieren
* Muster und „Ausreißer“ lassen sich schnell finden
* Komplexe Analyseabfragen mit hoher Geschwindigkeit und unabhänging von Datenquellen möglich

## Nachteile

* Organisation der Daten schwer zu implementieren und pflegen
* Transaktionale Daten können nicht erreicht werden
* Kleine Änderungen am Würfel ziehen eine Anpassung des gesamten Würfels mit sich
* Zeitaufwändige Pflege

---

# Anwendungsbeispiele Cassandra DB

Ein Beispiel für eine Cassandra Datenbank: Sind beispielsweise in einer Adressensammlung mehrere Telefonnummern angegeben, so legt man zunächst jede Nummer samt dazugehörigen Namen innerhalb einer Column ab, zum Beispiel Mobil: 0171 23456789 und Festnetzt: 06201 123456. Über diese Columns kann dann eine Super Column mit dem Namen Telefonnummern definiert werden, so können dann alle enthaltenen Informationen abgefragt werden. Eine Sogenannte Column Family fasst Columns oder Super Columns zusammen. Zugriff auf diese Columns Familys erhält man mittels einem Key.

Wenn neue Daten in einer Cassandra Datenbank gespeichert werden sollen, so landen diese erst einmal im Hauptspeicher und werden von dort später auf die zugehörigen Knoten im Cassandra-Custer verteilt.

Als Folge dieses schnellen Hauptspeicher-Eintrages und der Tatsache, dass bei Lesezugriffen auf den Hauptspeicher und die Platten zugegriffen werden muss (da das System ja nicht davon ausgehen kann, dass alle Schreiboperationen aus dem Hauptspeicher auf die Festplatten bereits abgeschlossen sind), ergibt sich die Situation, dass Schreiboperationen in Cassandra-Systemen meist wesentlich schneller als Leseoperationen von statten gehen.

Um das ganze nochmals anhand von Zahlen zu verdeutlichen, ist die Präsentation der Cassandra-Entwickler Lakshman und Malik sehr hilfreich. In einem großen System (mehr als 50 Gigabyte Daten) ergab sich durch den Wechsel von MySQL zu Cassandra eine Verbesserung des Schreibzugriffs von 300 Millisekunden auf 0,12 Millisekunden und beim Lesezugriff von 350 Millisekunden auf 15 Millisekunden.

# Row Store vs. Column  Store

Row Store als auch Column Store Datenbanken bieten verschiedene Vor- als auch Nachteile. Diese werden im Folgenden aufgeführt und im gleichen Zug erläutert.

Ein Vorteil einer Column Store Datenbank gegenüber einer Row Store Datenbank ist, dass man bei einer Column Store Datenbank die Tabellenstruktur einfacher verändern kann. Bei einer Row Store Datenbank ist dies nicht ganz möglich da dort die einzelnen Tupel verschoben werden müssen und dann die gesamte Tabelle erneuert werden muss. Dies ist je nach Datenmenge ein großer Aufwand.

Ein weiterer Vorteil von Column Store Datenbanken im Vergleich zu Row Store Datenbanken ist das Aktualisieren von Spalten. Bei Column Store Datenbanken muss nur eine Datei aktualisiert werden. Bei einer Row Store Datenbank ist dies etwas komplexer. Hier in jedem Tupel zunächst nach der gewünschten spalte gesucht und diese dann geändert werden.

Ein weiterer bedeutender Vorteil einer Column Store Datenbank, ist das Auslesen vieler Datensätze (unter Verwendung weniger Spalten). Hier müssen nur die Dateien gelesen werden, welche für die Spalten wichtig sind. Bei einer Row Store Datenbank ist dies im Vergleich viel aufwendiger, hier muss nämlich die gesamte Tabelle gelesen werden.

Ein Nachteil von Column Store Datenbanken im Vergleich zu Row Store Datenbanken, ist dass einfügen von neuen Datensätzen. Bei Row Store Datenbanken wird der neue Datensatz einfach am Ende der Tabelle angehangen und falls vorhanden wird der Index aktualisiert. Bei einer Column Store Datenbank ist das etwas aufwendiger, hier müssen alle Dateien geöffnet und neu geschrieben werden.

Ein weiterer Nachteil einer Column Store Datenbank gegenüber einer Row Store Datenbank, ist das Auslesen einzelner komplexer Datensätze. Bei Column Store Datenbanken, muss aufwendig in jeder einzelnen Datei gesucht werden. Bei Row Store Datenbanken ist dies etwas einfacher, hier muss nur der gesamte Tupel ausgelesen werden.

Abschließend kann man also sagen, dass sowohl Column als auch Row Store Datenbanken verschiedene Vorteile haben. Man sollte sich jedoch bevor man sich für eine der zwei Varianten entscheidet gut überlegen wofür man die Datenbank einsetzen möchte. Für unser Beispeil ist in diesem Fall eine Column Store Datenbank die bessere Wahl.

# Wie funktioniert's

Im Folgenden wird erläutert wie die Verarbeitung der Daten und die schlussendliche Ausgabe überhaupt funktioniert.

Das Projekt besteht aus drei Teilen. Dem Frontend, dem Backend und der Cassandra Datenbank.

Was macht was?

In dem Frontend wurden alle sichtbaren Teile gebaut, dies können die Filter sein, die man auswählen kann oder auch das Design der Seiten. Im Backend ist dann aber die Hauptarbeit erledigt worden. Hier wurden für alle verschiedenen Ausgaben Methoden gebaut, die dann die benötigten Werte aus der Datenbank holen und verarbeiten.

Um dies nochmals zu verdeutlichen hier ein Beispiel. Die Methode getGoalsHome, holt zunächst über den Befehl SELECT SUM(home_Goals) AS goals FROM game, alle Tore einer Mannschaft, die zu Beginn über einen Filter ausgewählt wurde und gibt das verarbeitete Ergebnis dann wieder an das Frontend weiter.

Die Cassandra Datenbank enthält alle Daten über Mannschaften, Tore, Spieler etc. um daraus dann ein spezifisches Ergebnis bekommen zu können, haben wir ein Backend mit Methoden, welches auf die Datenbank zu greift und dann die benötigten Daten heraus selektiert. Ein Beispiel hierfür wurde bereits oben kurz erläutert.

---

# Quellen

* https://cassandra.apache.org/
* https://www.guru99.com/cassandra-tutorial.html
* https://www.rapidvaluesolutions.com/tech_blog/cassandra-the-right-data-store-for-scalability-performance-availability-and-maintainability/
* https://entwickler.de/leseproben/nosql-apache-cassandra-242276.html
* http://www.datenbanken-verstehen.de/lexikon/apache-cassandra/
* https://www.guru99.com/online-analytical-processing.html
* https://www.computerweekly.com/de/definition/OLAP-Wuerfel
* https://data-science-blog.com/blog/2019/02/16/olap-wuerfel/
* https://www.bigdata-insider.de/was-ist-ein-olap-cube-a-654603/
* https://de.wikipedia.org/wiki/OLAP-W%C3%BCrfel


