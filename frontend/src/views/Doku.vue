<template>
  <div>
    <div class="pdf"></div>
    <div class="scrollUp" id="scrollUp" onclick="window.scrollTo(0,0);"></div>

    <div class="landing">
      <h1>Gruppenmitglieder</h1>
      <div class="team">
        <div class="member">Nicolas Fürhaupter</div>
        <div class="member">Jeannine Bertrand</div>
        <div class="member">Timo Scheuermann</div>
        <div class="member">Tobias Essigke</div>
      </div>
    </div>

    <div class="paragraph">
      <h1>Dokumentation</h1>
      <div class="pdf" title="Als PDF herunterladen"></div>

      <div class="sections">
        <a href="#cassy">Cassandra DB</a>
        <a href="#olap">OLAP Cube</a>
        <a href="#columnstore">Column-Store DB</a>
      </div>

      <div class="anchor" id="cassy"></div>
      <h2>Apache Cassandra Datenbank</h2>
      <h3>Allgemeines</h3>
      <ul>
        <li>NoSQL-Datenbank</li>
        <li>Spaltenorientierte Datenbank (wide-columns-store data base)</li>
        <li>Cassandra Query Language (CQL)</li>
      </ul>
      <h3>Geschichte</h3>
      <p>
        Damit war von Anfang an ein Klientel für die Datenbank schon festgelegt
        - Soziale Netzwerke. Nachdem die Datenbank dann ein Apache Incubator
        Projekt wurde haben auch andere große Unternehmen, unter anderem Twitter
        oder IBM, daran beteiligt. Apache Incubator hilft Projekten auf ihrem
        Weg, ein Projekt der Apache Software Foundation zu werden. Dort
        existiert es jetzt immer noch als Open-Source-Projekt, wird aber auch
        von DataStax als Lösung an Unternehmen verkauft.
      </p>

      <h3>Betrieb</h3>
      <p>
        Der Betrieb einer Cassandra Datenbank findet in einem Cluster statt. Das
        heißt, dass viele einzelne Knoten (Nodes) ringförmig zusammengeschlossen
        werden. Dieser Ring hat keinen überlegenen Knoten - alle Knoten sind auf
        einem Niveau und haben alle die gleichen Rechte und Fähigkeiten.
        Folglich gibt es auch keinen "Single Point of Failure". Das heißt, dass
        der Ausfall eines Knotens nicht den Ausfall der gesamten Datenbank
        bedeutet. Dies ist zugleich einer der größten Vorteile der Cassandra
        Datenbank. Damit beim Ausfall eines Knotens trotzdem auf die Daten
        zugegriffen werden können, werden die Daten als Replikationen auf
        mehreren Knoten gespeichert.
      </p>

      <h3>Vorteile</h3>
      <ul>
        <li>Kein "Single Point of Failure" → hohe Ausfallsicherheit</li>
        <li>Verteilte Datenbank aufgrund der "gleichwertigen" Knoten</li>
        <li>
          Hohe Skalierbarkeit → jeder neue Knoten bedeutet linear mehr Kapazität
        </li>
      </ul>

      <div class="splitter"></div>
      <div class="anchor" id="olap"></div>
      <h2>OLAP Cube</h2>
      <h3>Allgemeines</h3>
      <p>
        OLAP-Würfel, auch Datenwürfel oder Cube-Operator genannt, werden für die
        logische Darstellung von großen Datenmengen und deren Analyse verwendet.
        Hierbei werden die Daten als Elemente eines mehrdimensionalen „Würfel“
        (auch Hypercube genannt) dargestellt, sodass die einzelnen Daten die
        verschiedenen Dimensionen beschreiben, welche über die verschiedenen
        Achsen ausgewählt werden können. OLAP-Würfel werden häufig für Data
        Warehousing oder Online-Analytical-Processing- Applikationen verwendet.
        Im Allgemeinen jedoch werden diese eher bei Auswertungen von
        zahlenorientierten, als bei textorientierten Daten angewandt.
        Auswertungen und Reports können erstellt werden, welche die gegebenen
        Kriterien in fast jeder beliebigen Kombination darstellen.
      </p>

      <h3>Aufbau</h3>
      <p>
        Zusammengesetzt ist der OLAP-Würfel aus multidimensionalen Datenarrays.
        Jede Achse des Würfels besteht aus abgegrenzten Werten, die die
        multidimensionale Struktur und die Ausbreitungsrichtung des Würfels
        darstellen. Die Knotenpunkte des Würfels stellen hierbei die möglichen
        Kombinationsmöglichkeiten der Dimensionen dar. Alle bekannten Kennzahlen
        werden in den einzelnen Zellen der Schnittpunkte der Koordinaten
        hinterlegt. In rationalen Systemen wird der Würfel in einem
        „Sternschema“ dargestellt, sodass eine Faktentabelle zu mehreren
        Dimensionstabellen führt, welche die einzelnen Kennzahlen enthalten.
      </p>

      <h3>Operationen</h3>
      <ul>
        <li>Slicing: Ausschneiden von „Datenscheiben“ aus Würfel</li>
        <li>
          Dicing: Erzeugen eines kleineren (mehrdimensionalen) Würfels mit einem
          Teilvolumen der gesamten Daten
        </li>
        <li>
          Pivoting/Rotation: Drehen des Würfels um die eigene Achse →
          unterschiedliche Sichten auf die Daten
        </li>
        <li>Drill-Down: Hereinzoomen in den Würfel → höherer Detailgrad</li>
        <li>
          Drill-Up/Roll-Up: Herauszoomen aus Würfel → Verdichtung der Daten
        </li>
        <li>Drill-Across: Betrachten von benachbarten Dimensionselementen</li>
        <li>
          Drill-Through: Auswerten weiterer OLAP-Würfel auf horizontaler Ebene
        </li>
        <li>
          Split: Aufteilen eines Wertes auf mehrere Dimensionen → weitere
          Details
        </li>
        <li>
          Merge/Drill-In: Entfernen zusätzlicher Dimensionen → Granularität
          verringern
        </li>
      </ul>

      <h3>Vorteile</h3>
      <ul>
        <li>Kompakte Anordnung der Daten</li>
        <li>Hohe Abfragegeschwindigkeit</li>
        <li>
          Durch die Rotation-Operation Erzeugen von neuen Sichten auf die Daten,
          ohne die Struktur der Ablage zu ändern
        </li>
        <li>Kriterien selektieren und kombinieren</li>
        <li>Beliebig viele Dimensionen der Daten in die Analyse einbeziehen</li>
        <li>Einfaches Aufaddieren der Daten</li>
        <li>
          Möglichkeit des intuitiven Navigierens und Betrachten der
          Datenbestände
        </li>
        <li>Konsistenz der Informationen und Berechnungen</li>
        <li>„Was wäre wenn“-Szenarios möglich</li>
        <li>Zeitserien lassen sich schnell analysieren</li>
        <li>Muster und „Ausreißer“ lassen sich schnell finden</li>
        <li>
          Komplexe Analyseabfragen mit hoher Geschwindigkeit und unabhänging von
          Datenquellen möglich
        </li>
      </ul>

      <h3>Nachteile</h3>
      <ul>
        <li>Organisation der Daten schwer zu implementieren und pflegen</li>
        <li>Transaktionale Daten können nicht erreicht werden</li>
        <li>
          Kleine Änderungen am Würfel ziehen eine Anpassung des gesamten Würfels
          mit sich
        </li>
        <li>Zeitaufwändige Pflege</li>
      </ul>

      <div class="splitter"></div>

      <div class="anchor" id="columnstore"></div>
      <h2>Anwendungsbeispiele Cassandra DB</h2>
      <p>
        Ein Beispiel für eine Cassandra Datenbank: Sind beispielsweise in einer
        Adressensammlung mehrere Telefonnummern angegeben, so legt man zunächst
        jede Nummer samt dazugehörigen Namen innerhalb einer Column ab, zum
        Beispiel Mobil: 0171 23456789 und Festnetzt: 06201 123456. Über diese
        Columns kann dann eine Super Column mit dem Namen Telefonnummern
        definiert werden, so können dann alle enthaltenen Informationen
        abgefragt werden. Eine Sogenannte Column Family fasst Columns oder Super
        Columns zusammen. Zugriff auf diese Columns Familys erhält man mittels
        einem Key.
      </p>
      <p>
        Wenn neue Daten in einer Cassandra Datenbank gespeichert werden sollen,
        so landen diese erst einmal im Hauptspeicher und werden von dort später
        auf die zugehörigen Knoten im Cassandra-Custer verteilt.
      </p>
      <p>
        Als Folge dieses schnellen Hauptspeicher-Eintrages und der Tatsache,
        dass bei Lesezugriffen auf den Hauptspeicher und die Platten zugegriffen
        werden muss (da das System ja nicht davon ausgehen kann, dass alle
        Schreiboperationen aus dem Hauptspeicher auf die Festplatten bereits
        abgeschlossen sind), ergibt sich die Situation, dass Schreiboperationen
        in Cassandra-Systemen meist wesentlich schneller als Leseoperationen von
        statten gehen.
      </p>
      <p>
        Um das ganze nochmals anhand von Zahlen zu verdeutlichen, ist die
        Präsentation der Cassandra-Entwickler Lakshman und Malik sehr hilfreich.
        In einem großen System (mehr als 50 Gigabyte Daten) ergab sich durch den
        Wechsel von MySQL zu Cassandra eine Verbesserung des Schreibzugriffs von
        300 Millisekunden auf 0,12 Millisekunden und beim Lesezugriff von 350
        Millisekunden auf 15 Millisekunden.
      </p>

      <h2>Row Store vs Column Store</h2>
      <p>
        Row Store als auch Column Store Datenbanken bieten verschiedene Vor- als
        auch Nachteile. Diese werden im Folgenden aufgeführt und im gleichen Zug
        erläutert.
      </p>
      <p>
        Ein Vorteil einer Column Store Datenbank gegenüber einer Row Store
        Datenbank ist, dass man bei einer Column Store Datenbank die
        Tabellenstruktur einfacher verändern kann. Bei einer Row Store Datenbank
        ist dies nicht ganz möglich da dort die einzelnen Tupel verschoben
        werden müssen und dann die gesamte Tabelle erneuert werden muss. Dies
        ist je nach Datenmenge ein großer Aufwand.
      </p>
      <p>
        Ein weiterer Vorteil von Column Store Datenbanken im Vergleich zu Row
        Store Datenbanken ist das Aktualisieren von Spalten. Bei Column Store
        Datenbanken muss nur eine Datei aktualisiert werden. Bei einer Row Store
        Datenbank ist dies etwas komplexer. Hier in jedem Tupel zunächst nach
        der gewünschten spalte gesucht und diese dann geändert werden.
      </p>
      <p>
        Ein weiterer bedeutender Vorteil einer Column Store Datenbank, ist das
        Auslesen vieler Datensätze (unter Verwendung weniger Spalten). Hier
        müssen nur die Dateien gelesen werden, welche für die Spalten wichtig
        sind. Bei einer Row Store Datenbank ist dies im Vergleich viel
        aufwendiger, hier muss nämlich die gesamte Tabelle gelesen werden.
      </p>
      <p>
        Ein Nachteil von Column Store Datenbanken im Vergleich zu Row Store
        Datenbanken, ist dass einfügen von neuen Datensätzen. Bei Row Store
        Datenbanken wird der neue Datensatz einfach am Ende der Tabelle
        angehangen und falls vorhanden wird der Index aktualisiert. Bei einer
        Column Store Datenbank ist das etwas aufwendiger, hier müssen alle
        Dateien geöffnet und neu geschrieben werden.
      </p>
      <p>
        Ein weiterer Nachteil einer Column Store Datenbank gegenüber einer Row
        Store Datenbank, ist das Auslesen einzelner komplexer Datensätze. Bei
        Column Store Datenbanken, muss aufwendig in jeder einzelnen Datei
        gesucht werden. Bei Row Store Datenbanken ist dies etwas einfacher, hier
        muss nur der gesamte Tupel ausgelesen werden.
      </p>
      <p>
        Abschließend kann man also sagen, dass sowohl Column als auch Row Store
        Datenbanken verschiedene Vorteile haben. Man sollte sich jedoch bevor
        man sich für eine der zwei Varianten entscheidet gut überlegen wofür man
        die Datenbank einsetzen möchte. Für unser Beispeil ist in diesem Fall
        eine Column Store Datenbank die bessere Wahl.
      </p>

      <h2>Wie funktioniert‘s</h2>
      <p>
        Im Folgenden wird erläutert wie die Verarbeitung der Daten und die
        schlussendliche Ausgabe überhaupt funktioniert.
      </p>
      <p>
        Das Projekt besteht aus drei Teilen. Dem Frontend, dem Backend und der
        Cassandra Datenbank.
      </p>
      <p>
        Was macht was?
      </p>
      <p>
        In dem Frontend wurden alle sichtbaren Teile gebaut, dies können die
        Filter sein, die man auswählen kann oder auch das Design der Seiten. Im
        Backend ist dann aber die Hauptarbeit erledigt worden. Hier wurden für
        alle verschiedenen Ausgaben Methoden gebaut, die dann die benötigten
        Werte aus der Datenbank holen und verarbeiten.
      </p>
      <p>
        Um dies nochmals zu verdeutlichen hier ein Beispiel. Die Methode
        getGoalsHome, holt zunächst über den Befehl SELECT SUM(home_Goals) AS
        goals FROM game, alle Tore einer Mannschaft, die zu Beginn über einen
        Filter ausgewählt wurde und gibt das verarbeitete Ergebnis dann wieder
        an das Frontend weiter.
      </p>
      <p>
        Die Cassandra Datenbank enthält alle Daten über Mannschaften, Tore,
        Spieler etc. um daraus dann ein spezifisches Ergebnis bekommen zu
        können, haben wir ein Backend mit Methoden, welches auf die Datenbank zu
        greift und dann die benötigten Daten heraus selektiert. Ein Beispiel
        hierfür wurde bereits oben kurz erläutert.
      </p>

      <div class="splitter"></div>
      <h2>Quellen</h2>
      <ul>
        <li><a>https://cassandra.apache.org/</a></li>
        <li><a>https://www.guru99.com/cassandra-tutorial.html</a></li>
        <li>
          <a
            >https://www.rapidvaluesolutions.com/tech_blog/cassandra-the-right-data-store-for-scalability-performance-availability-and-maintainability/</a
          >
        </li>
        <li>
          <a
            >https://entwickler.de/leseproben/nosql-apache-cassandra-242276.html</a
          >
        </li>
        <li>
          <a>http://www.datenbanken-verstehen.de/lexikon/apache-cassandra/</a>
        </li>
        <li><a>https://www.guru99.com/online-analytical-processing.html</a></li>
        <li>
          <a>https://www.computerweekly.com/de/definition/OLAP-Wuerfel</a>
        </li>
        <li>
          <a>https://data-science-blog.com/blog/2019/02/16/olap-wuerfel/</a>
        </li>
        <li>
          <a>https://www.bigdata-insider.de/was-ist-ein-olap-cube-a-654603/</a>
        </li>
        <li><a>https://de.wikipedia.org/wiki/OLAP-W%C3%BCrfel</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
const prettyPrint = require("code-prettify-google");
export default {
  mounted() {
    this.$nextTick(function() {
      prettyPrint.prettyPrint();
    });

    window.onscroll = function() {
      const scrollUp = document.getElementById("scrollUp");
      const height = 40;
      if (
        document.body.scrollTop > height ||
        document.documentElement.scrollTop > height
      ) {
        scrollUp.style.display = "block";
      } else {
        scrollUp.style.display = "none";
      }
    };
  }
};
</script>
