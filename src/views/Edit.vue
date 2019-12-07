<template>
<div>
  <h1>Edit Recipes</h1>
  <div v-for="recipe in recipes" v-bind:key="recipe._id">
    <hr>
    <form @submit.prevent="editRecipe(recipe)">
    Recipe Name:
    <br />
    <input v-model="recipe.name" placeholder="">
    <p></p>
    Category:
    <select v-model="recipe.category">
        <option disabled value="">Please select one</option>
        <option>Breakfast</option>
        <option>Dinner</option>
        <option>Dessert</option>
    </select>
    <br />
    <br />
    Ingredients:
    <br />
    <textarea v-model="recipe.ingredients" placeholder="List one ingredient per line"></textarea>
    <br />
    Directions:
    <br />
    <textarea v-model="recipe.directions"></textarea>
    <br />
    <button @click="deleteRecipe(recipe)" class="delete">Delete</button>
    <button type="submit">Save Changes</button>
  </form>
  </div>
  <div v-if="recipes.length === 0">
    There are currently no recipes to show
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
            async editRecipe(recipe) {
                console.log("in editRecipe");
                console.log(recipe._id);
                try {
                    let response = await axios.put("/api/recipes/" + recipe._id, {
                        name: recipe.name,
                        category: recipe.category,
                        ingredients: recipe.ingredients,
                        directions: recipe.directions,
                    });
                    this.getRecipes();
                    return true;
                }
                catch (error) {
                    console.log(error);
                }
            },
        }
    }
</script>