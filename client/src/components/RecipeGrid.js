import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import CreateRecipeForm from './CreateRecipeForm';
import { getRecipes } from '../actions/recipeActions';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class RecipeGrid extends Component {
  componentWillMount() {
    this.props.dispatch(getRecipes());
  }

  renderRecipes(recipes) {
    if (!recipes)return;
    return recipes.map((recipe, i) => {
      return (
        <div className="col s12 m6 l4" key={i}>
        <div className="card">
          <div className="card-image">
            <Link to={`/recipes/${recipe.id}`}>
              <img src="./images/bg2.jpg" alt="recipe-img"/>
              <span className="card-title">
                <b><Link to={`/recipes/${recipe.id}`} className="white-text">{recipe.title}</Link></b>
              </span>
              </Link>
              <a className="btn-floating halfway-fab waves-effect waves-light white "><i className="material-icons red-text">favorite_border</i></a>
          </div>
          <div className="card-content">
            <p>{recipe.description}</p>
          </div>
          <div className="card-action">
            <div className="row">
              <div className="col s12 m12">
                <div className="chip"><img src="./images/avi.jpg" alt="Contact Person"/>Jane Doe</div>
              </div>
              <div className="col s12 m12">
                <a href=""><i className="material-icons left">thumb_up</i>{recipe.upvotes}</a>
                <a className="waves-effect waves-light tooltipped" data-position="bottom" data-delay="100" data-tooltip="downvote"><i className="material-icons left">thumb_down</i>{recipe.downvotes}</a>
                <a href="recipe details.html" className="waves-effect waves-light tooltipped" data-position="bottom" data-delay="100 "data-tooltip="views"><i className="material-icons left">visibility</i>{recipe.views}</a>
                <a href="recipe details.html" className="waves-effect waves-light tooltipped" data-position="bottom" data-delay="100 "data-tooltip="views"><i className="material-icons left">chat</i>{recipe.reviews.length}</a>
              </div>
            </div>
        </div>
      </div>
    </div>
      )
    })
  }
  render() {
    return (
      <div>
        <Header/>
        <div className='row'>
          {this.renderRecipes(this.props.recipes)}
        </div>
        <Footer/>
        <div id="create" className="modal">
            <div className="modal-content">
              <h4>Create Recipe</h4>
              <div className="row">
                <CreateRecipeForm />
              </div>
            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {recipes: state.recipes.recipes};
}

export default connect(mapStateToProps, { getRecipes })(RecipeGrid);
