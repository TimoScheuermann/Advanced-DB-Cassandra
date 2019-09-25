import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client, types } from 'cassandra-driver';

@Injectable()
export class AppService {
  public client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: ['127.0.0.1'],
      localDataCenter: 'datacenter1',
      keyspace: 'nhl_stats',
    });
  }

  private async cassyHelper(query: string, vars: any) {
    return new Promise((resolve: (res: types.ResultSet) => void, reject) => {
      this.client.execute(query, vars, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  public async getQueryResults(query, vars = []): Promise<Object> {
    await this.client.connect();

    try {
      const res = await this.cassyHelper(query, vars);
      return res.rows;
    } catch (error) {
      return error;
      return new InternalServerErrorException('Fehler im Query');
    }
  }
}

//const query = "SELECT * FROM inf";
//const query = "INSERT INTO inf (num,txt) VALUES (3,'drei')";
