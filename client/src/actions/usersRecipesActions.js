import axios from 'axios';

// Users Recipes list
export const FETCH_USERS_RECIPES = 'FETCH_USERS_RECIPES';
export const FETCH_USERS_RECIPES_SUCCESS = 'FETCH_USERS_RECIPES_SUCCESS';
export const FETCH_USERS_RECIPES_FAILURE = 'FETCH_USERS_RECIPES_FAILURE';

// delete a recipe
export const DELETE_SINGLE_RECIPE = 'DELETE_SINGLE_RECIPE';
export const DELETE_SINGLE_RECIPE_SUCCESS  = 'DELETE_SINGLE_RECIPE_SUCCESS';
export const DELETE_SINGLE_RECIPE_FAILURE = 'DELETE_SINGLE_RECIPE_FAILURE';

// create recipe
 
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const CREATE_RECIPE_SUCCESS = 'CREATE_RECIPE_SUCCESS';
export const CREATE_RECIPE_FAILURE = 'CREATE_RECIPE_FAILURE'

export const fetchUsersRecipes = () => {
  const request = axios({
    method: 'get',
    url: '/api/v1/recipes/users'
  });
  return {
    type: FETCH_USERS_RECIPES,
    payload: request
  };
}

export const fetchUsersRecipesSuccess = usersrecipes => {
  return {
    type: FETCH_USERS_RECIPES_SUCCESS,
    usersrecipes
  };
}

export const fetchUsersRecipesFailure = payload => {
  return {
    type: FETCH_USERS_RECIPES_FAILURE,
    payload
  };
}

export const deleteSingleRecipe = (recipeId, index) => {
  const request = axios({
    method: 'delete',
    url: `/api/v1/recipes/${recipeId}`
  });
  return dispatch => {
    return request.then(res => dispatch(deleteSingleRecipeSuccess(res.data.recipe, index)));
  };
};

export const deleteSingleRecipeSuccess = (message, index) => {
  return {
    type: DELETE_SINGLE_RECIPE_SUCCESS,
    message,
    index
  };
};

export const deleteSingleRecipeFailure = error => {
  return {
    type: DELETE_SINGLE_RECIPE_FAILURE,
    payload: error
  };
};

