<template>
<div>
  <h1>Dinner</h1>
  <div v-for="recipe in dinner" v-bind:key="recipe._id">
    <hr>
    <div class="recipe">
      <div class="ingredients">
        <h3>{{recipe.name}}</h3>
        <h6>Ingredients:</h6>
        <p>{{recipe.ingredients}}</p>
        <h6>Directions:</h6>
        <p>{{recipe.directions}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'dinner',
    data() {
      return {
        recipes: []
      }
    },
    created() {
      this.getRecipes();
    },
    computed: {
      dinner: function() {
        return this.recipes.filter(function(recipe) {
          return recipe.category == "Dinner";
        })
      }
    },
    methods: {
      async getRecipes() {
        try {
          let response = await axios.get("/api/recipes");
          this.recipes = response.data;
        }
        catch (error) {
          console.log(error);
        }
      },
    }
  }
</script>