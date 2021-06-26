<template>
  <div class="hello">
    <h1>Hello World from Main Page</h1>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Aggregate Query" active><aggregate-query-input /></b-tab>
        <b-tab title="Find Query"><find-query-input /></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import FindQueryInput from '../components/FindQueryInput.vue';
import AggregateQueryInput from '../components/AggregateQueryInput.vue';
export default {
  components: { FindQueryInput,AggregateQueryInput },
  name: "MainPage",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
