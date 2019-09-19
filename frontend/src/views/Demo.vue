<template>

    <div>
        <div class="paragraph">
            <h1>Wie es funktioniert</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione voluptatem libero quas sint aliquid incidunt odit. Doloribus, eveniet. Nobis voluptatem tempore doloribus saepe qui perspiciatis natus illo nam? Consequuntur, magni.</p>
        </div>

        <div class="paragraph">
            <h2>Filter<div class="add" title="Filter hinzufügen" onclick="document.getElementById('overlay').setAttribute('style','display:block');"></div></h2>
            <div class="filter-list">
                <div class="filter">
                    <div class="name" season><br>2018/19</div>
                    <div class="remove"></div>
                </div>
                <div class="filter">
                    <div class="name" team><br>Adler Mannheim</div>
                    <div class="remove"></div>
                </div>
                <div class="filter">
                    <div class="name" player><br>Tim Stützle</div>
                    <div class="remove"></div>
                </div>
                <div class="filter">
                    <div class="name" destination><br>Away</div>
                    <div class="remove"></div>
                </div>
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
                <div class="close" onclick="document.getElementById('overlay').setAttribute('style','display:none');"></div>
                <h1>Filter hinzufügen</h1>
            </div>

            <div class="content">

                <div class="paragraph" style="margin-top: 0;">
                    
                    <div class="filters">
                        <h3>Season</h3>
                        <div class="filteritem" active="true">2018/19</div>
                        <div class="filteritem">2019/20</div>
                        <div class="filteritem">2020/21</div>
                        <div class="filteritem">2021/22</div>
                    </div>

                    
                    <div class="filters">
                        <h3>Team</h3>
                        <olap-filter v-for="team in teams" :title="team" active="false"/>

                        <div class="filteritem" active="true">Adler Mannheim</div>
                        <div class="filteritem">Redbull München</div>
                        <div class="filteritem">Eisbären Berlin</div>
                        <div class="filteritem">Kölner Haie</div>
                        <div class="filteritem">Schwenninger Wildwings</div>
                        <div class="filteritem">Huskies Kassel</div>
                    </div>
                    
                    <div class="filters">
                        <h3>Spieler</h3>
                        <div class="filteritem">Dennis Endras</div>
                        <div class="filteritem">David Wolf</div>
                        <div class="filteritem" active="true">Tim Stützle</div>
                        <div class="filteritem">Marcel Goc</div>
                        <div class="filteritem">Glen Metropolit</div>
                        <div class="filteritem">Hans Zach</div>
                    </div>
                    
                    <div class="filters">
                        <h3>Destination</h3>
                        <div class="filteritem">Home</div>
                        <div class="filteritem" active="true">Away</div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OlapFilter from "../components/Filter.vue";
export default {
  components: {
    "olap-filter": OlapFilter
  }
};
</script>