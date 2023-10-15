const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('Recipes-For-You').collection('recipes').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341')
    .collection('recipes')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createRecipe = async (req, res) => {
  const recipe = {
    name: req.body.name,
    source: req.body.source,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    servings: req.body.servings,
    prepTime: req.body.prepTime,
    totalTime: req.body.totalTime
  };
  const response = await mongodb.getDb().db('Recipes-For-You').collection('recipes').insertOne(recipe);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occurred while creating the contact.');
  }
};


const updateRecipe = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  const recipe = {
    name: req.body.name,
    source: req.body.source,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    servings: req.body.servings,
    prepTime: req.body.prepTime,
    totalTime: req.body.totalTime
  };
  const response = await mongodb.getDb().db('Recipes-For-You').collection('recipes').replaceOne({_id: recipeId}, recipe);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the contact.');
  }
};

const deleteRecipe = async (req, res) => {
  const recipeId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('Recipes-For-You').collection('recipes').deleteOne({_id: recipeId}, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the contact.');
  }
}
module.exports = { 
  getAll, 
  getSingle,
  createRecipe,
  updateRecipe,
  deleteRecipe
};