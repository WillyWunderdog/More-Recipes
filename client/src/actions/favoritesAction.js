import axios from 'axios';
import store from '../store';

// Recipes list
export const FETCH_FAVORITE_RECIPES = 'FETCH_FAVORITE_RECIPES';
export const FETCH_FAV_RECIPES_SUCCESS = 'FETCH_FAV_RECIPES_SUCCESS';
export const FETCH_FAV_RECIPES_FAILURE = 'FETCH_FAV_RECIPES_FAILURE';

// add to favorites
export const ADD_FAVORITE_RECIPE = 'ADD_FAVORITE_RECIPE';
export const ADD_FAVORITE_SUCCESS = 'ADD_FAVORITE_SUCCESS';
export const ADD_FAVORITE_FAILURE = 'ADD_FAVORITE_FAILURE';

// delete from list of favorites
export const REMOVE_FAVORITE_RECIPE = 'REMOVE_FAVORITE_RECIPE';
export const REMOVE_FAVORITE_RECIPE_SUCCESS = 'REMOVE_FAVORITE_RECIPE_SUCCESS';
export const REMOVE_FAVORITE_RECIPE_FAILURE = 'REMOVE_FAVORITE_RECIPE_FAILURE';


export const fetchFavoriteRecipes = () => {
  const request = axios({
    method: 'get',
    url: '/api/v1/users/favorites'
  });
  return {
    type: FETCH_FAVORITE_RECIPES,
    payload: request
  };
};

export const fetchFavRecipesSuccess = favorites => ({
  type: FETCH_FAV_RECIPES_SUCCESS,
  favorites
});

export const fetchFavRecipesFailure = payload => ({
  type: FETCH_FAV_RECIPES_FAILURE,
  payload
});

export const addFavoriteSuccess = (favorite) => {
  const currentState = store.getState();
  const recipe = currentState.recipes.find(item => item.id === favorite.recipeId);
  favorite.Recipe = recipe;
  return {
    type: ADD_FAVORITE_SUCCESS,
    favorite
  };
};

export const addFavoriteFailure = error => ({
  type: ADD_FAVORITE_FAILURE,
  payload: error
});

export const addFavoriteRecipe = (recipeId) => {
  const request = axios({
    method: 'post',
    url: `/api/v1/users/${recipeId}/favorites`
  });
  return (dispatch) => {
    request.then((res) => {
      dispatch(addFavoriteSuccess(res.data.recipe));
    }).catch((error) => {
      dispatch(addFavoriteFailure(error));
    });
  };
};

export const removeFavoriteRecipeSuccess = (index, recipeId) => ({
  type: REMOVE_FAVORITE_RECIPE_SUCCESS,
  index,
  recipeId
});

export const removeFavoriteRecipeFailure = message => ({
  type: REMOVE_FAVORITE_RECIPE_FAILURE,
  message
});

export const removeFavoriteRecipe = (recipeId, index) => {
  const request = axios({
    method: 'delete',
    url: `/api/v1/users/${recipeId}/favorites`
  });
  return (dispatch) => {
    request.then(() => {
      dispatch(removeFavoriteRecipeSuccess(index, recipeId));
    }).catch((error) => {
      dispatch(removeFavoriteRecipeFailure(error));
    });
  };
};
