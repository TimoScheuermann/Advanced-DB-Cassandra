<template>
  <div class="filteritem" :active="active" @click="$emit('click', $event)">{{ title }}</div>
</template>

<script>
export default {
  name: "olap-filter",
  props: {
    active: Boolean,
    title: String
  }
};
</script>