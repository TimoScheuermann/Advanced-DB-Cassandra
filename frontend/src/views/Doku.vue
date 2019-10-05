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
        <a href="#olap">Column-Store DB</a>
        <a href="#columnstore">NHL Stats</a>
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
        <img right src="/assets/landing4.jpg" width="500" />Apache Cassandra wurde bei Facebook entwickelt, um die Suche nach Direktnachrichten in der Inbox des Benutzers zu ermöglichen.
        Damit war von Anfang an ein Klientel für die Datenbank schon festgelegt - Soziale Netzwerke. Nachdem die Datenbank dann ein Apache Incubator Projekt wurde haben auch andere große Unternehmen, unter anderem Twitter oder IBM, daran beteiligt. Apache Incubator hilft Projekten auf ihrem Weg, ein Projekt der Apache Software Foundation zu werden. Dort existiert es jetzt immer noch als Open-Source-Projekt, wird aber auch von DataStax als Lösung an Unternehmen verkauft.
      </p>

      <h3>Betrieb</h3>
      <p>Der Betrieb einer Cassandra Datenbank findet in einem Cluster statt. Das heißt, dass viele einzelne Knoten (Nodes) ringförmig zusammengeschlossen werden. Dieser Ring hat keinen überlegenen Knoten - alle Knoten sind auf einem Niveau und haben alle die gleichen Rechte und Fähigkeiten. Folglich gibt es auch keinen "Single Point of Failure". Das heißt, dass der Ausfall eines Knotens nicht den Ausfall der gesamten Datenbank bedeutet. Dies ist zugleich einer der größten Vorteile der Cassandra Datenbank. Damit beim Ausfall eines Knotens trotzdem auf die Daten zugegriffen werden können, werden die Daten als Replikationen auf mehreren Knoten gespeichert.</p>

      <h3>Vorteile</h3>
      <ul>
        <li>Kein "Single Point of Failure" → hohe Ausfallsicherheit</li>
        <li>Verteilte Datenbank aufgrund der "gleichwertigen" Knoten</li>
        <li>Hohe Skalierbarkeit → jeder neue Knoten bedeutet linear mehr Kapazität</li>
      </ul>

      <div class="splitter"></div>
      <div class="anchor" id="olap"></div>
      <h2>OLAP Cube</h2>
      <h3>Allgemeines</h3>
      <p>
        OLAP-Würfel, auch Datenwürfel oder Cube-Operator genannt, werden für die logische Darstellung von großen Datenmengen und deren Analyse verwendet. Hierbei werden die Daten als Elemente eines mehrdimensionalen „Würfel“ (auch Hypercube genannt) dargestellt, sodass die einzelnen Daten die verschiedenen Dimensionen beschreiben, welche über die verschiedenen Achsen ausgewählt werden können.
        OLAP-Würfel werden häufig für Data Warehousing oder Online-Analytical-Processing- Applikationen verwendet. Im Allgemeinen jedoch werden diese eher bei Auswertungen von zahlenorientierten, als bei textorientierten Daten angewandt. Auswertungen und Reports können erstellt werden, welche die gegebenen Kriterien in fast jeder beliebigen Kombination darstellen.
      </p>

      <h3>Aufbau</h3>
      <p>Zusammengesetzt ist der OLAP-Würfel aus multidimensionalen Datenarrays. Jede Achse des Würfels besteht aus abgegrenzten Werten, die die multidimensionale Struktur und die Ausbreitungsrichtung des Würfels darstellen. Die Knotenpunkte des Würfels stellen hierbei die möglichen Kombinationsmöglichkeiten der Dimensionen dar. Alle bekannten Kennzahlen werden in den einzelnen Zellen der Schnittpunkte der Koordinaten hinterlegt. In rationalen Systemen wird der Würfel in einem „Sternschema“ dargestellt, sodass eine Faktentabelle zu mehreren Dimensionstabellen führt, welche die einzelnen Kennzahlen enthalten.</p>

      <h3>Operationen</h3>
      <ul>
        <li>Slicing: Ausschneiden von „Datenscheiben“ aus Würfel</li>
        <li>Dicing: Erzeugen eines kleineren (mehrdimensionalen) Würfels mit einem Teilvolumen der gesamten Daten</li>
        <li>Pivoting/Rotation: Drehen des Würfels um die eigene Achse → unterschiedliche Sichten auf die Daten</li>
        <li>Drill-Down: Hereinzoomen in den Würfel → höherer Detailgrad</li>
        <li>Drill-Up/Roll-Up: Herauszoomen aus Würfel → Verdichtung der Daten</li>
        <li>Drill-Across: Betrachten von benachbarten Dimensionselementen</li>
        <li>Drill-Through: Auswerten weiterer OLAP-Würfel auf horizontaler Ebene</li>
        <li>Split: Aufteilen eines Wertes auf mehrere Dimensionen → weitere Details</li>
        <li>Merge/Drill-In: Entfernen zusätzlicher Dimensionen → Granularität verringern</li>
      </ul>

      <h3>Vorteile</h3>
      <ul>
        <li>Kompakte Anordnung der Daten</li>
        <li>Hohe Abfragegeschwindigkeit</li>
        <li>Durch die Rotation-Operation Erzeugen von neuen Sichten auf die Daten, ohne die Struktur der Ablage zu ändern</li>
        <li>Kriterien selektieren und kombinieren</li>
        <li>Beliebig viele Dimensionen der Daten in die Analyse einbeziehen</li>
        <li>Einfaches Aufaddieren der Daten</li>
        <li>Möglichkeit des intuitiven Navigierens und Betrachten der Datenbestände</li>
        <li>Konsistenz der Informationen und Berechnungen</li>
        <li>„Was wäre wenn“-Szenarios möglich</li>
        <li>Zeitserien lassen sich schnell analysieren</li>
        <li>Muster und „Ausreißer“ lassen sich schnell finden</li>
        <li>Komplexe Analyseabfragen mit hoher Geschwindigkeit und unabhänging von Datenquellen möglich</li>
      </ul>

      <h3>Nachteile</h3>
      <ul>
        <li>Organisation der Daten schwer zu implementieren und pflegen</li>
        <li>Transaktionale Daten können nicht erreicht werden</li>
        <li>Kleine Änderungen am Würfel ziehen eine Anpassung des gesamten Würfels mit sich</li>
        <li>Zeitaufwändige Pflege</li>
      </ul>

      <div class="splitter"></div>

      <div class="anchor" id="columnstore"></div>
      <h2>Column-Store Datenbanken</h2>
      <h3>Allgemeines</h3>
      <ul>
        <li>NoSQL-Datenbank</li>
        <li>Spaltenorientierte Datenbank (wide-columns-store data base)</li>
        <li>Cassandra Query Language (CQL)</li>
      </ul>
      <h3>Geschichte</h3>
      <p>Apache Cassandra wurde bei Facebook entwickelt, um die Suche nach Direktnachrichten in der Inbox des Benutzers zu ermöglichen. Damit war von Anfang an ein Klientel für die Datenbank schon festgelegt - Soziale Netzwerke. Nachdem die Datenbank dann ein Apache Incubator Projekt wurde haben auch andere große Unternehmen, unter anderem Twitter oder IBM, daran beteiligt. Apache Incubator hilft Projekten auf ihrem Weg, ein Projekt der Apache Software Foundation zu werden. Dort existiert es jetzt immer noch als Open-Source-Projekt, wird aber auch von DataStax als Lösung an Unternehmen verkauft.</p>

      <h3>Betrieb</h3>
      <p>Der Betrieb einer Cassandra Datenbank findet in einem Cluster statt. Das heißt, dass viele einzelne Knoten (Nodes) ringförmig zusammengeschlossen werden. Dieser Ring hat keinen überlegenen Knoten - alle Knoten sind auf einem Niveau und haben alle die gleichen Rechte und Fähigkeiten. Folglich gibt es auch keinen "Single Point of Failure". Das heißt, dass der Ausfall eines Knotens nicht den Ausfall der gesamten Datenbank bedeutet. Dies ist zugleich einer der größten Vorteile der Cassandra Datenbank. Damit beim Ausfall eines Knotens trotzdem auf die Daten zugegriffen werden können, werden die Daten als Replikationen auf mehreren Knoten gespeichert.</p>

      <h3>Vorteile</h3>
      <ul>
        <li>Kein "Single Point of Failure" → hohe Ausfallsicherheit</li>
        <li>Verteilte Datenbank aufgrund der "gleichwertigen" Knoten</li>
        <li>Hohe Skalierbarkeit → jeder neue Knoten bedeutet linear mehr Kapazität</li>
      </ul>

      <div class="splitter"></div>

      <div class="anchor" id="nhl"></div>
      <h2>NHL Stats</h2>
      <h3>Allgemeines</h3>
      <ul>
        <li>NoSQL-Datenbank</li>
        <li>Spaltenorientierte Datenbank (wide-columns-store data base)</li>
        <li>Cassandra Query Language (CQL)</li>
      </ul>
      <h3>Frontend</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae dolorum nulla provident animi vel repellat fugiat laboriosam explicabo, voluptates inventore saepe, voluptatum accusamus unde cum tempore adipisci nihil minus hic. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, veritatis quibusdam accusamus odit enim recusandae amet quaerat, animi, commodi deserunt sint repellendus assumenda quo molestiae quia! Corporis in voluptates adipisci.</p>

      <h3>Backend</h3>
      <ul>
        <li>Kein "Single Point of Failure" → hohe Ausfallsicherheit</li>
        <li>Verteilte Datenbank aufgrund der "gleichwertigen" Knoten</li>
        <li>Hohe Skalierbarkeit → jeder neue Knoten bedeutet linear mehr Kapazität</li>
      </ul>
      <code>CREATE CUSTOM INDEX fn_prefix ON cyclist_name (firstname) USING 'org.apache.cassandra.index.sasi.SASIIndex';</code>

      <div class="splitter"></div>
      <h2>Quellen</h2>
      <ul>
        <li>
          <a href="#">https://cassandra.apache.org/</a>
        </li>
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