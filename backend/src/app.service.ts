import { Injectable } from '@nestjs/common';
import { Client, auth } from 'cassandra-driver';

@Injectable()
export class AppService {

  getQueryResults(query, vars = []): Object {

    const client = new Client({
      contactPoints: ["127.0.0.1"],
      localDataCenter: "datacenter1",
      keyspace: "a"
    });

    client.connect(() => {
      console.log("Cassy connected!");   
      client.execute(query, vars, (err, res) => {
        return err ? { error: "Fehler im Query", query: query, variables: vars } : res.rows;
      });

    });
    
    return { error: "Konnte keine Verbindung zur Datenbank aufbauen" };
  }

}

    //const query = "SELECT * FROM inf";
    //const query = "INSERT INTO inf (num,txt) VALUES (3,'drei')";