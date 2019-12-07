<template>
<div>
  <h1>Add a Recipe</h1>
  <form v-if="creating" @submit.prevent="addRecipe">
    Recipe Name:
    <br />
    <input v-model="addedName" placeholder="">
    <p></p>
    Category:
    <select v-model="addedCategory">
        <option disabled value="">Please select one</option>
        <option>Breakfast</option>
        <option>Dinner</option>
        <option>Dessert</option>
    </select>
    <br />
    <br />
    Ingredients:
    <br />
    <textarea v-model="addedIngredients" placeholder="List one ingredient per line"></textarea>
    <br />
    Directions:
    <br />
    <textarea v-model="addedDirections"></textarea>
    <br />
    <button type="submit">Submit</button>
  </form>
  <div v-else>
    <p>Thank you for submitting a recipe!</p>
    <p><a @click="toggleForm" href="#">Submit another recipe</a></p>
  </div>
</div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'create',
        data() {
            return {
                creating: true,
                addedName: '',
                addedCategory: '',
                addedIngredients: '',
                addedDirections: '',
            }
        },
        methods: {
            toggleForm() {
                this.creating = !this.creating;
            },
            async addRecipe() {
                try {
                    await axios.post("/api/recipes", {
                        name: this.addedName,
                        category: this.addedCategory,
                        ingredients: this.addedIngredients,
                        directions: this.addedDirections,
                    });
                    this.addedName = "";
                    this.addedCategory = "";
                    this.addedIngredients = "";
                    this.addedDirections = "";
                    this.creating = false;
                }
                catch (error) {
                    console.log(error);
                }
            },
        }
    }
</script>

<style scoped>
    input {
        font-size: 1.2em;
        height: 30px;
        width: 200px;
    }

    textarea {
        font-size: 1.2em;
        width: 100%;
        max-width: 500px;
        height: 100px;
    }

    button {
        margin-top: 20px;
        font-size: 1.2em;
    }
</style>