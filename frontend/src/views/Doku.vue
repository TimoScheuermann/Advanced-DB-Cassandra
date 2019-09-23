<template>
    <div>
        <div class="pdf"></div>
        
        <div class="paragraph">
            <h1>Gruppenmitglieder</h1>
            <div class="team">
                <div class="member">Nicolas Fürhaupter</div>
                <div class="member">Jeannine Bertrand</div>
                <div class="member">Tobias Essigke</div>
                <div class="member">Timo Scheuermann</div>
            </div>
        </div>

        <div class="paragraph">
            <h1>Dokumentation<div class="pdf" title="Als PDF herunterladen"></div></h1>
            <h2>Apache Cassandra Datenbank</h2>
            <h3>Allgemeines</h3>
            <p>
                <ul>
                    <li>NoSQL-Datenbank</li>
                    <li>Spaltenorientierte Datenbank (wide-columns-store data base)</li>
                    <li>Cassandra Query Language (CQL)</li>
                </ul>
            </p>
            <h3>Geschichte</h3>
            <p>Apache Cassandra wurde bei Facebook entwickelt, um die Suche nach Direktnachrichten in der Inbox des Benutzers zu ermöglichen. Damit war von Anfang an ein Klientel für die Datenbank schon festgelegt - Soziale Netzwerke. Nachdem die Datenbank dann ein Apache Incubator Projekt wurde haben auch andere große Unternehmen, unter anderem Twitter oder IBM, daran beteiligt. Apache Incubator hilft Projekten auf ihrem Weg, ein Projekt der Apache Software Foundation zu werden. Dort existiert es jetzt immer noch als Open-Source-Projekt, wird aber auch von DataStax als Lösung an Unternehmen verkauft.</p>

            <h3>Betrieb</h3>
            <p>Der Betrieb einer Cassandra Datenbank findet in einem Cluster statt. Das heißt, dass viele einzelne Knoten (Nodes) ringförmig zusammengeschlossen werden. Dieser Ring hat keinen überlegenen Knoten - alle Knoten sind auf einem Niveau und haben alle die gleichen Rechte und Fähigkeiten. Folglich gibt es auch keinen "Single Point of Failure". Das heißt, dass der Ausfall eines Knotens nicht den Ausfall der gesamten Datenbank bedeutet. Dies ist zugleich einer der größten Vorteile der Cassandra Datenbank. Damit beim Ausfall eines Knotens trotzdem auf die Daten zugegriffen werden können, werden die Daten als Replikationen auf mehreren Knoten gespeichert.</p>
        
            <h3>Vorteile</h3>
            <p>
                <ul>
                    <li>Kein "Single Point of Failure" -> hohe Ausfallsicherheit</li>
                    <li>Verteilte Datenbank aufgrund der "gleichwertigen" Knoten</li>
                    <li>Hohe Skalierbarkeit -> jeder neue Knoten bedeutet linear mehr Kapazität</li>
                </ul>
            </p>

        </div>
    </div>
</template>