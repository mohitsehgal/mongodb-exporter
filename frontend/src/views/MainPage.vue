<template>
  <div class="m-3 b-3">
    <!-- <h1>MongoDB Exporter</h1> -->
    <b-form class="py-2" @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="MongoDB Connection URL"
        label-for="input-1"
        class="my-2"
        description="Complete MongoDB Connection URL where you want to execute query."
      >
        <b-form-input
          id="input-1"
          v-model="form.connectionString"
          type="connectionString"
          placeholder="e.g mongodb://localhost/"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="DB Name"
        label-for="input-2"
        description=""
        class="my-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.dbName"
          type="dbName"
          placeholder="DB Name  e.g mydb"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Collection Name"
        label-cols-sm="4"
        class="my-2"
        label-for="input-3"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.collection"
          type="collection"
          placeholder="e.g posts"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Aggregate Pipeline"
        label-for="input-4"
        class="my-2"
        description=""
      >
        <b-form-textarea
          id="textarea"
          v-model="form.query"
          placeholder="[{$match:{}}]"
          rows="3"
        ></b-form-textarea>
      </b-form-group>

      <div v-if="false">
        <b-tabs content-class="mt-3">
          <b-tab title="Aggregate Query" active
            ><aggregate-query-input
          /></b-tab>
          <b-tab title="Find Query"><find-query-input /></b-tab>
        </b-tabs>
      </div>
      <div class="text-center">
        <b-button type="submit" @click.prevent="onSubmit" variant="primary">Execute</b-button>
      </div>
    </b-form>
    <div class="well well-lg">
        {{response}}
    </div>
  </div>
</template>

<script>
import FindQueryInput from "../components/FindQueryInput.vue";
import AggregateQueryInput from "../components/AggregateQueryInput.vue";
import APIs from "../axios";
export default {
  components: { FindQueryInput, AggregateQueryInput },
  name: "MainPage",
  props: {},
  data() {
    return {
      form: {
          mode:'aggregate'
      },
      response:{

      }
    };
  },
  methods: {
    onSubmit() {
        let _this = this;
      APIs.postAggregateQuery(this.form)
        .then((response) => {
            console.log('Response ',response)
            _this.response = response.data
        })
        .catch((error) => {
            console.error('Error while posting ',error);
        });
    },
  },
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
