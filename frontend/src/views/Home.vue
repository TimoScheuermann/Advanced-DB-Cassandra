<template>
  <div>
    <div class="landing">
      <h1>Advanced Databases</h1>
      <h2>Cassandra</h2>
    </div>
    <div class="paragraph">
      <h1>Erklärung</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione suscipit animi expedita aliquam incidunt veniam, soluta quibusdam dolor
        <a
          href="#"
        >Hallo klick mich an</a> dignissimos quisquam, ex quo provident vero at commodi? Perferendis velit ducimus maxime! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil porro ipsum commodi provident deleniti eaque quasi iusto adipisci, molestias et delectus laborum quidem eius sunt molestiae autem harum impedit nemo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut vel cum dolorum porro, esse labore possimus? Reiciendis sit, quae explicabo repudiandae expedita maiores, accusamus, velit autem quas facilis illo?
      </p>
    </div>
    <olap-filter title="Test" :active="true" />
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