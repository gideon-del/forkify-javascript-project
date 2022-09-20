import * as model from './model.js';
import recipeView from './view/recipeView.js';
import SearchView from './view/searchView.js';
import resultView from './view/resultView';
import bookMarksView from './view/bookMarksView';
import paginationView from './view/paginationView.js';
import addRecipeView from './view/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    //0) Update Result view to selected
    resultView.update(model.getSearchResultPage());
    //1) loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //2) Rendering recipe
    recipeView.render(recipe);

    bookMarksView.update(model.state.bookmark);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    console.log(resultView);
    //1) Get search query
    const query = SearchView.getQuery();
    if (!query) return;
    //2) Send search result
    await model.loadSearchResults(query);
    //  resultView.render(model.state.search.result);
    console.log(model.state.search);
    console.log(model.getSearchResultPage(6));
    resultView.render(model.getSearchResultPage());

    //4) Render pagination
    paginationView.render(model.state.search);
  } catch (error) {
    resultView.renderError();
  }
};
const controlPagination = function (gotoPage) {
  // console.log(gotoPage);
  //Render new result
  resultView.render(model.getSearchResultPage(gotoPage));

  //4) Render new pagination button
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  //Update the recipe view
};
const controlAddBokkmark = function () {
  //Add or remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //Update recipeview
  recipeView.update(model.state.recipe);
  //Update bookmark
  bookMarksView.render(model.state.bookmark);
};
const controlBookmarks = function () {
  bookMarksView.render(model.state.bookmark);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    //Spinner
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //Render recipe
    recipeView.render(model.state.recipe);
    //Succes Message
    addRecipeView.renderMessage();
    //  Render bookmark view
    bookMarksView.render(model.state.bookmark);
    // CHange Id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(`${err} ##`);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookMarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBokkmark);
  addRecipeView._addHnadlerUpload(controlAddRecipe);
};
init();
