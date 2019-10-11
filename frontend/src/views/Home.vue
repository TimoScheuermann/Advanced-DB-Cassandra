<template>
  <div>
    <div class="landing">
      <h1>Advanced Databases</h1>
      <h2>Cassandra</h2>
    </div>
    <div class="paragraph">

<h2>NHL Statistics via Apache Cassandra</h2>
		<p>	Im Rahmen des Wahlfaches "Other Database Systems" bei Prof. Dr. Julian Reichwald galt es, verschiedene Datenbanksysteme in einem Anwendungsfall vorzustellen und zu bewerten.
			Diese Demoseite beschäftigt sich mit der In-memory columnstore Datenbank Cassandra von Apache.
			Da sich für eine solche Datenbank ein Anwendungsfall mit vielen Datensätzen und Abhängigkeiten anbietet, enschieden wir uns für die Darstellung von NHL Statistiken mit Hilfe eines OLAP-Cubes.
			Auf den folgenden Seiten lässt sich eine Demo ausführen, die die erziehlten Tore verschieder Spieler und Mannschaften, unter unterschiedlichen Gesichtspunkten auslesen lässt. Außerdem wird die Datenbank Cassandra, die OLAP-Operationen und der Programmcode vorgestellt.</p>

	<h3>Wie die Demo funktioniert</h3>
		<p>	Unter dem Reiter "Demo" gelangt man zu der Anzahl der gesamten erzielten Tore der NHL Saisons seit 2010. 
			Nun gibt es die Möglichkeit verschiedene Filter auszuwählen, wie beispielsweise die Mannschaft, Spieler oder die Saison. 
			Wählt man nun einen oder mehrere Filter aus, werden die Anzahl der Tore der Mannschaften oder Spieler in einer Tabelle angezeigt und die Gesamtzahl angepasst.</p>

  </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.getElementById("nav").style.background =
      "rgba(0, 0, 0, 0.25) !important";
  }
};
</script>