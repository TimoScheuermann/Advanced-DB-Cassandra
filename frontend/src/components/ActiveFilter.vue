<template>
    <div class="filter" v-if="active">
        <div class="name" :category='category'><br />{{ title }}</div>
        <div class="remove"></div>
    </div>
</template>

<script>
export default {
    name: "active-filter",
    props: {
        category: String,
        active: Boolean,
        title: String
    }
}
</script>