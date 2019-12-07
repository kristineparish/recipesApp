const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const recipeSchema = new mongoose.Schema({
  name: String,
  category: String,
  ingredients: String,
  directions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

router.get('/', async(req, res) => {
  try {
    let recipes = await Recipe.find();
    return res.send(recipes);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async(req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    category: req.body.category,
    ingredients: req.body.ingredients,
    directions: req.body.directions
  });
  console.log("req.body:");
  console.log(req.body);
  console.log(recipe);
  try {
    await recipe.save();
    return res.send(recipe);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  console.log("made it to PUT");
  try {
    let recipe = await Recipe.findOne({_id:req.params.id});
    recipe.name = req.body.name;
    recipe.category = req.body.category;
    recipe.ingredients = req.body.ingredients;
    recipe.directions = req.body.directions;
    recipe.save();
    res.send(recipe);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async(req, res) => {
  console.log("in delete");
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    });
    return res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;