import models from '../models';

export default {
  add(req, res) {
    return models.Recipes
      .create({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        directions: req.body.directions
      })
      .then(recipe => res.status(201).send({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        message: 'recipe created successfully'
      }))
      .catch(error => res.status(400).send({
        error: error.message
      }));
  },

  fetch(req, res) {
    return models.Recipes
      .all()
      .then(recipes => res.status(200).send(recipes))
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

};