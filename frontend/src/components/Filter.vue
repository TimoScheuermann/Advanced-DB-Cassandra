<template>
    <div class="filteritem" :active='active'>{{ title }}</div>
</template>

<script>
export default {
    name: "olap-filter",
    props: {
        active: Boolean,
        title: String
    }
}
</script>