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

  private async cassyHelper(
    query: string,
    vars: (string | number)[],
    hints: (string)[],
  ) {
    return new Promise((resolve: (res: types.ResultSet) => void, reject) => {
      this.client.execute(query, vars, { hints: hints }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  public async getQueryResults(
    query: string,
    vars = [],
    hints = [],
  ): Promise<Object> {
    await this.client.connect();

    try {
      const res = await this.cassyHelper(query, vars, hints);
      return res.rows;
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException('Fehler im Query');
    }
  }
}
