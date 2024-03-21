import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controllRecipes = async function () {
  try {
    //0 update resultsView to mark selected seach result
    resultsView.update(model.getSearchResultsPerPage());
    //1. Loading Recipe
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //2)Loading Recipe
    await model.loadRecipe(id);

    //3)Update BokkMarks View
    bookmarksView.update(model.state.bookmarks);

    //4). Rendring recipe
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};
//Searching
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load Search Results
    await model.loadSearchResult(query);

    //3) Render Results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPerPage());

    //4)Render Pagination model.state.search
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
    // console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //3) Render NEW Results
  resultsView.render(model.getSearchResultsPerPage(goToPage));

  //4)Render NEW Pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //1)Update the recepie servings (in state)
  model.updateServings(newServings);

  //2)Update the recepie view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookMark = function () {
  //1)Add/Remove BookMarks
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  //Update recipe view
  recipeView.update(model.state.recipe);

  //3)Render BookMarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookMarksHandler = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Render Spinner
    addRecipeView.renderSpinner();
    //Upload Recipe
    await model.uploadRecipe(newRecipe);

    //Render Recipe
    recipeView.render(model.state.recipe);

    //success Message
    addRecipeView.renderSuccess();

    //Render BookMArk
    bookmarksView.render(model.state.bookmarks);

    //Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close Modal Window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 500);
  } catch (err) {
    addRecipeView.renderError(err);
    console.error(err);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookMarksHandler);
  recipeView.addHandlerRender(controllRecipes);
  recipeView.addHandlerToUpdateServings(controlServings);
  recipeView.addbookmarkHandler(controlBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
