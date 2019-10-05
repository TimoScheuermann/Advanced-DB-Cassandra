<template>
  <div>
    <div class="landing">
      <h1>Demonstration</h1>
      <h2>NHL Stats</h2>
    </div>

    <div
      class="paragraph"
      v-if="!backendConnected || !cassandraRunning"
    >
      <h1>Oops!</h1>
      <div class="error" style="position: relative; left: 50%; transform: translateX(-50%);">
        <span v-if="!backendConnected">Es besteht keine Verbindung zum Backend</span>
        <span v-else>Es konnte keine Verbindung zur Datenbank aufgebaut werden!</span>
      </div>
    </div>

    <div class="paragraph" v-else>
      <h2>
        Filter
        <div
          class="add"
          title="Filter hinzufügen"
          onclick="document.getElementById('overlay').setAttribute('style','display:block');"
        ></div>
      </h2>

      <div class="filter-list">
        <active-filter
          v-for="season in seasons"
          :key="season.__id"
          category="Season"
          :title="season.name"
          :active="season.active"
          @click="setActive(season.__id, 'seasons')"
        />
        <active-filter
          v-for="team in teams"
          :key="team.__id"
          category="Team"
          :title="team.name"
          :active="team.active"
          @click="setActive(team.__id, 'teams')"
        />

        <active-filter
          v-for="destination in destinations"
          :key="destination.__id"
          category="Destination"
          :title="destination.name"
          :active="destination.active"
          @click="setActive(destination.__id, 'destinations')"
        />

        <active-filter
          v-for="gametype in gametypes"
          :key="gametype.__id"
          category="Gametype"
          :title="gametype.name"
          :active="gametype.active"
          @click="setActive(gametype.__id, 'gametypes')"
        />

        <active-filter
          v-for="player in players"
          :key="player.__id"
          category="Player"
          :title="player.name"
          :active="player.active"
          @click="setActive(player.__id, 'players')"
        />
      </div>
    </div>

    <div class="paragraph">
      <h2>
        Ergebnis
        <div style="display: block; text-align: right;">
          <div
            style="display: inline-block; color: #666; font-size: .8em;"
          >Tore der letzten {{ seasons.length }} Seasons: {{ totalGoals }}</div>
        </div>
      </h2>
      <div v-if="combinations.toString().length !== 0" style="width: 100%; overflow-x: auto;">
        <table>
          <tr>
            <th v-if="getActiveElements(this.seasons).length > 0">
              <span class="n">{{ getActiveElements(this.seasons).length }}</span>Season
            </th>
            <th
              v-if="getActiveElements(this.teams).length > 0 || getActiveElements(this.players).length > 0"
            >
              <span class="n">{{ getActiveElements(this.teams).length }}</span>Team /
              <span class="n">{{ getActiveElements(this.players).length }}</span>Player
            </th>
            <th v-if="getActiveElements(this.destinations).length > 0">
              <span class="n">{{ getActiveElements(this.destinations).length }}</span>Destination
            </th>
            <th v-if="getActiveElements(this.gametypes).length > 0">
              <span class="n">{{ getActiveElements(this.gametypes).length }}</span>Gametype
            </th>
            <th>Tore</th>
          </tr>
          <tr v-for="combo in combinations" :key="combo.x">
            <td v-for="name in combo" :key="name.x">{{ name.name }}</td>
          </tr>
        </table>
      </div>
      <h3 v-if="combinations.toString().length !== 0">Tore gesamt: {{ filteredGoals }}</h3>
    </div>

    <div class="overlay" id="overlay">
      <div class="head">
        <div
          class="close"
          onclick="document.getElementById('overlay').setAttribute('style','display:none');"
        ></div>
        <h1>Filter hinzufügen</h1>
      </div>

      <div class="content">
        <div class="paragraph">
          <div class="filters">
            <h3>Season</h3>
            <olap-filter
              v-for="season in seasons"
              :key="season.__id"
              :title="season.name"
              :active="season.active"
              @click="setActive(season.__id, 'seasons')"
            />
          </div>

          <div class="filters">
            <h3>Team</h3>
            <olap-filter
              v-for="team in teams"
              :key="team.__id"
              :title="team.name"
              :active="team.active"
              @click="setActive(team.__id, 'teams')"
            />
          </div>

          <div class="filters" style="width: 49%; display: inline-block; margin-right: 2%">
            <h3>Destination</h3>
            <olap-filter
              v-for="destination in destinations"
              :key="destination.__id"
              :title="destination.name"
              :active="destination.active"
              @click="setActive(destination.__id, 'destinations')"
            />
          </div>

          <div class="filters" style="width: 49%; display: inline-block;">
            <h3>Gametype</h3>
            <olap-filter
              v-for="gametype in gametypes"
              :key="gametype.__id"
              :title="gametype.name"
              :active="gametype.active"
              @click="setActive(gametype.__id, 'gametypes')"
            />
          </div>

          <div class="filters">
            <h3>Spieler</h3>

            <h4>Verfügbare Spieler</h4>
            <olap-filter
              v-for="player in players"
              :key="player.__id"
              :title="player.name"
              :active="player.active"
              @click="setActive(player.__id, 'players')"
            />

            <h4>Spieler finden</h4>
            <form @submit.prevent="findPlayer">
              <input
                v-model="playerQuery"
                type="text"
                pattern="^[a-zA-Z]{1,20}$"
                placeholder="z.B.: Plachta, Goc, Hecht"
                name
                id
              />
              <input type="submit" value="Suchen" />
            </form>

            <div
              v-if="nothingFound"
              class="error"
              style="margin-top: 10px;"
            >Es konnte kein Spieler mit dem Namen "{{ playerQuery }}" gefunden werden</div>
            <div
              v-else-if="showQueryInfo"
              class="info"
              style="margin-top: 10px;"
            >Bitte gib mindestens zwei Zeichen ein</div>
            <div
              v-else-if="playerResults > maxAllowedPlayerResults"
              class="info"
              style="margin-top: 10px;"
            >Es wurden zu viele Spieler gefunden ({{ playerResults }}). Bitte genauer Suchen</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OlapFilter from "../components/Filter.vue";
import ActiveFilter from "../components/ActiveFilter.vue";
require("../helper.js");

export default {
  components: {
    "olap-filter": OlapFilter,
    "active-filter": ActiveFilter
  },
  data() {
    return {
      nothingFound: false,
      showQueryInfo: false,
      playerResults: 0,
      maxAllowedPlayerResults: 10,
      backendConnected: true,
      cassandraRunning: true,
      totalGoals: null,
      filteredGoals: 0,
      playerQuery: "",
      combinations: [],
      teams: [],
      seasons: [],
      destinations: [],
      gametypes: [],
      players: []
    };
  },
  methods: {
    getActiveElements(array) {
      if (array == null || array.length == 0) return [];
      return array.filter(x => x.active);
    },

    async updateCombos() {
      const parts = [
        this.getActiveElements(this.seasons),
        this.getActiveElements(this.teams).concat(
          this.getActiveElements(this.players)
        ),
        this.getActiveElements(this.destinations),
        this.getActiveElements(this.gametypes)
      ].filter(x => x.length > 0);

      let combos;
      if (parts.length < 2) {
        combos = parts.map(x => x.map(y => [y])).flat();
      } else {
        combos = parts.reduce((a, b) =>
          a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), [])
        );
      }

      let localFilteredGoals = 0;
      this.combinations = await Promise.all(
        combos.map(async x => {
          const {
            data: { goals }
          } = await this.$axios.get(
            (
              `/get/goals` +
              x
                .filter(y => y.__id.startsWith("team_"))
                .map(y => `/team/${y.team_id}`) +
              x
                .filter(y => y.__id.startsWith("player_"))
                .map(y => `/player/${y.player_id}`) +
              x
                .filter(y => y.__id.startsWith("season_"))
                .map(y => `/season/${y.season_id}`) +
              "/total" +
              x
                .filter(y => y.__id.startsWith("destination_"))
                .map(y => `/${y.name.toLowerCase()}`) +
              x
                .filter(y => y.__id.startsWith("type_"))
                .map(y => `/${y.name[0]}`)
            )
              .replace("total/home", "home")
              .replace("total/away", "away")
          );
          localFilteredGoals += goals;
          return [...x, { name: goals }];
        })
      );
      this.filteredGoals = localFilteredGoals;
    },

    setActive(id, property) {
      this[property] = this[property].map(x => {
        if (x.__id === id) {
          x.active = !x.active;
        }
        return x;
      });
      this.updateCombos();
    },

    async findPlayer() {
      this.nothingFound = false;
      this.showQueryInfo = false;
      this.playerResults = 0;

      if (this.playerQuery.length < 2) {
        this.showQueryInfo = true;
        return;
      }

      const response = await this.$axios.get(
        `/find/player/${this.playerQuery}`
      );

      this.playerResults = response.data.length;
      if (this.playerResults > this.maxAllowedPlayerResults) return;

      if (this.playerResults === 0) {
        this.nothingFound = true;
        this.showQueryInfo = false;
        return;
      }

      response.data.forEach(x => {
        if (this.players.findIndex(p => p.player_id === x.player_id) === -1) {
          this.players.push({
            ...x,
            active: false,
            name: `${x.firstname} ${x.lastname}`,
            __id: `player_${x.player_id}`
          });
        }
      });
    }
  },

  async created() {
    try {
      this.totalGoals = (await this.$axios.get("/get/goals/total"))[
        "data"
      ].goals;

      const teamResults = await this.$axios.get("/get/teams");
      const gametypeResults = await this.$axios.get("/get/gametypes");
      const destinationResults = await this.$axios.get("/get/destinations");
      const seasonResults = await this.$axios.get("/get/seasons");

      this.teams = teamResults.data.map(x => ({
        ...x,
        active: false,
        name: `${x.shortname} ${x.teamname}`,
        __id: `team_${x.team_id}`
      }));

      this.gametypes = gametypeResults.data.map(x => ({
        ...x,
        active: false,
        __id: `type_${x.type_id}`
      }));

      this.destinations = destinationResults.data.map(x => ({
        ...x,
        active: false,
        __id: `destination_${x.destination_id}`
      }));

      this.seasons = seasonResults.data.map(x => ({
        ...x,
        active: false,
        name: `${x.season_id}`.insert(4, "/"),
        __id: `season_${x.season_id}`
      }));
    } catch (error) {
      this.backendConnected = false;
    } finally {
      this.updateCombos();
    }
  }
};
</script>