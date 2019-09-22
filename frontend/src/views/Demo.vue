<template>
  <div>
    <div class="paragraph">
      <h1>Wie es funktioniert</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione voluptatem libero quas sint aliquid incidunt odit. Doloribus, eveniet. Nobis voluptatem tempore doloribus saepe qui perspiciatis natus illo nam? Consequuntur, magni.</p>
    </div>

    <div
      class="paragraph"
      style="background: transparent;"
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
          v-for="(season, index) in seasons"
          :key="index"
          category="Season"
          :title="season.name"
          :active="season.active"
        />
        <active-filter
          v-for="(team, index) in teams"
          :key="index"
          category="Team"
          :title="team.name"
          :active="team.active"
        />
        <active-filter
          v-for="(desintation, index) in desintations"
          :key="index"
          category="Destination"
          :title="desintation.name"
          :active="desintation.active"
        />
        <active-filter
          v-for="(player, index) in players"
          :key="index"
          category="Player"
          :title="player.name"
          :active="player.active"
        />
      </div>
    </div>

    <div class="paragraph">
      <h2>Ergebnis</h2>

      <table>
        <tr>
          <th>A</th>
          <th>B</th>
          <th>. . . ?</th>
        </tr>
        <tr>
          <td>C</td>
          <td>D</td>
          <td>E</td>
        </tr>
        <tr>
          <td>C</td>
          <td>D</td>
          <td>E</td>
        </tr>
        <tr>
          <td>C</td>
          <td>D</td>
          <td>E</td>
        </tr>
      </table>
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
        <div class="paragraph" style="margin-top: 0;">
          <div class="filters">
            <h3>Season</h3>
            <olap-filter
              v-for="(season, index) in seasons"
              :key="index"
              :title="season.name"
              :active="season.active"
            />
          </div>

          <div class="filters">
            <h3>Team</h3>
            <olap-filter
              v-for="(team, index) in teams"
              :key="index"
              :title="team.name"
              :active="team.active"
            />
          </div>

          <div class="filters">
            <h3>Destination</h3>
            <olap-filter
              v-for="(desintation, index) in desintations"
              :key="index"
              :title="desintation.name"
              :active="desintation.active"
            />
          </div>

          <div class="filters">
            <h3>Spieler</h3>

            <h4>Aktive Spieler</h4>
            <olap-filter
              v-for="(player, index) in players"
              :key="index"
              :title="player.name"
              :active="player.active"
            />

            <h4>Spieler finden</h4>
            <form>
              <input type="text" placeholder="Plachta" name id />
              <input type="submit" value="Suchen" />
            </form>

            <h4>Ergebnisse</h4>

            <div
              v-if="nothingFound"
              class="error"
            >Es konnte kein Spieler mit diesem Namen gefunden werden</div>
            <div v-else>
              <olap-filter
                v-for="(player, index) in players"
                :key="index"
                :title="player.name"
                :active="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OlapFilter from "../components/Filter.vue";
import ActiveFilter from "../components/ActiveFilter.vue";

export default {
  components: {
    "olap-filter": OlapFilter,
    "active-filter": ActiveFilter
  },
  methods: {},
  data() {
    return {
      nothingFound: true,
      backendConnected: true,
      cassandraRunning: true,
      teams: [
        {
          name: "Adler Mannheim",
          active: true
        },
        {
          name: "Redbull München",
          active: false
        },
        {
          name: "Eisbären Berlin",
          active: false
        },
        {
          name: "Schwenninger Wildwings",
          active: false
        },
        {
          name: "Huskies Kassel",
          active: false
        },
        {
          name: "Kölner Haie",
          active: false
        }
      ],
      seasons: [
        {
          name: "2018/19",
          active: true
        },
        {
          name: "2019/20",
          active: false
        },
        {
          name: "2020/21",
          active: false
        },
        {
          name: "2021/22",
          active: false
        }
      ],
      desintations: [
        {
          name: "Home",
          active: true
        },
        {
          name: "Away",
          active: false
        }
      ],
      players: [
        {
          name: "Moritz Müller",
          active: false,
          team: "Kölner Haie"
        },
        {
          name: "Dennis Endras",
          active: false,
          team: "Adler Mannheim"
        },
        {
          name: "David Wolf",
          active: false,
          team: "Adler Mannheim"
        },
        {
          name: "Tim Stützle",
          active: true,
          team: "Adler Mannheim"
        },
        {
          name: "Marcel Goc",
          active: true,
          team: "Adler Mannheim"
        }
      ]
    };
  }
};
</script>