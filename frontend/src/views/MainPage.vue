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
          type="text"
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
          type="text"
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
          type="text"
          placeholder="e.g posts"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Aggregate Pipeline"
        label-for="input-4"
        class="my-2"
        description="It should be a valid JSON Array"
      >
        <b-form-textarea
          id="textarea"
          v-model="query"
          placeholder="[{$match:{}}]"
          rows="6"
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
        <b-button type="submit" @click.prevent="onSubmit" variant="primary"
          >Execute</b-button
        >
      </div>
    </b-form>
    <div>
      <b-alert v-model="showErrorMessage" variant="danger" dismissible>
        Error: {{ errorMessage }}
      </b-alert>
    </div>
    <div class="well well-lg">
      <vue-json-pretty :data="response"> </vue-json-pretty>
      <!-- {{ response }} -->
    </div>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

import FindQueryInput from "../components/FindQueryInput.vue";
import AggregateQueryInput from "../components/AggregateQueryInput.vue";
import APIs from "../axios";
export default {
  components: { FindQueryInput, AggregateQueryInput, VueJsonPretty },
  name: "MainPage",
  props: {},
  data() {
    return {
      form: {
        dbName: "maajikibhente",
        connectionString: "mongodb://localhost/maajikibhente",
        collection: "posts",
        mode: "aggregate",
      },
      query: "",
      response: {},
      errorMessage: null,
      showErrorMessage: false,
    };
  },
  methods: {
    showError(message) {
      if (message) {
        this.showErrorMessage = true;
        this.errorMessage = message;
      } else {
        this.showErrorMessage = false;
      }
    },
    validateJSON(input) {
      try {
        console.log("input trying ", input);
        JSON.parse(input);
        console.log("valid json");
        return true;
      } catch (e) {
        console.log(e);
        this.showError("Query JSON is invalid, Please check quotes");
        return false;
      }
    },
    cleanTheUnquotedJSON(input) {
      try {
        if (this.validateJSON(input)) {
          return input;
        } else {
          return eval("(" + input + ")");
        }
      } catch (e) {
        console.log("errrorrr", e);
        return input;
      }
    },
    prettifyJSON(input) {
      return JSON.stringify(JSON.parse(input), null, 4);
    },
    onSubmit() {
      let _this = this;
      //   let cleanQuery;
      //   cleanQuery= Object.assign({}, this.query);
      if (!this.validateJSON(this.query)) {
        //   this.errorMessage = "Input JSON is not valid"
        return;
      }
      //   cleanQuery = this.cleanTheUnquotedJSON(cleanQuery);

      this.query = this.prettifyJSON(this.query);

      //   this.query = cleanQuery;
      this.form.query = this.query;

      APIs.postAggregateQuery(this.form)
        .then((response) => {
          console.log("Response ", response);
          if (response.data.status) {
            _this.response = response.data.result;
            _this.showError(undefined);
          } else {
            _this.showError(response.data.message);
          }
        })
        .catch((error) => {
          _this.showError(error);
          console.error("Error while posting ", error);
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
