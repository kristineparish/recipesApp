<template>
<div>
  <h1>All Recipes</h1>
  <div v-for="recipe in recipes" v-bind:key="recipe._id">
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
    name: 'home',
    data() {
      return {
        recipes: []
      }
    },
    created() {
      this.getRecipes();
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
      async deleteRecipe(recipe) {
        try {
          const response = await axios.delete("/api/recipes/" + recipe._id);
          this.getRecipes();
        }
        catch (error) {
          console.log(error);
        }
      },
    }
  }
</script>