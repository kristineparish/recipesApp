<template>
<div>
  <h1>Breakfast</h1>
  <div v-for="recipe in breakfast" v-bind:key="recipe._id">
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
    name: 'breakfast',
    data() {
      return {
        recipes: [],
      }
    },
    created() {
      this.getRecipes();
    },
    computed: {
      breakfast: function() {
        return this.recipes.filter(function(recipe) {
          return recipe.category == "Breakfast";
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