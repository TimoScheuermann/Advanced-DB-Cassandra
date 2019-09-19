import { Injectable } from '@nestjs/common';
import { Client, auth } from 'cassandra-driver';

@Injectable()
export class AppService {
  getHello(): string {

    const client = new Client({
      contactPoints: ["127.0.0.1"],
      localDataCenter: "datacenter1",
      keyspace: "a"
    });

    client.connect(() => { return "Cassy is am Start"; });

    const query = "SELECT * FROM inf";
    //const query = "INSERT INTO inf (num,txt) VALUES (3,'drei')";

    client.execute(query, [], (err, res) => {
      return ((err ? "FEHLER" : res));
    });

    return "spmething went wrong";

  }

}
