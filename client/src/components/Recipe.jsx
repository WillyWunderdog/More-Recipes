import React, { Component } from 'react';
import { Link } from 'react-router';
import FavoriteButtonContainer from '../containers/FavoriteButtonContainer';
import UpvoteButtonContainer from '../containers/UpvoteButtonContainer';
import DownvoteButtonContainer from '../containers/DownvoteButtonContainer';
import DeleteButtonContainer from '../containers/DeleteButtonContainer';
import EditButton from './EditButton';
import UpdateRecipeForm from '../components/UpdateRecipeForm';


class Recipe extends Component {
  constructor(props){
    super(props)
    this.state={
      recipeIndex: 0,
      recipe: {},
      editClicked:false,
      recipes:[]
    }
  }

  componentWillMount(){
    $(document).ready(function(){
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  }

  componentDidMount(){
    $(document).ready(function(){
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();

    });
  }

  handleEdit = (props) => {
    const { index, recipe, recipes }= this.props
    this.setState({
      recipeIndex: index,
      recipe,
      recipes,
    })
    $('#'+this.props.index).modal('open');
  }
  render() {
    return (
      <div>
        <div className="col xs12 s12 m6 l4">
          <div className="card medium">
            <div className="card-image">
              <Link to={`recipes/${this.props.recipe.id}`}>
                <img
                  name={this.props.recipe.id}
                  src={this.props.recipe.image_url}
                  alt="recipe image"/>
              </Link>
            </div>
            <div className="card-content">
              <div className="row">
                <div className="col m10 s10 l10">
                  <Link to={`recipes/${this.props.recipe.id}`}>
                  <b>{this.props.recipe.title}</b></Link>
                  <p>{this.props.recipe.description}</p>
                </div>
                <div className="col m2 s2 l2">
                  <FavoriteButtonContainer
                  index={this.props.index}
                  recipe={ this.props.recipe } 
                  />
                </div>
                <div className="col s12 m12">
                  <div className="chip">
                  <img src={ this.props.recipe.User.image_url} 
                  alt="Contact Person" />
                  {this.props.recipe.User.username}
                  </div>
                </div>
                <div className="col xs12 s12 m12">
                  {
                    this.props.upvoteRecipe &&
                <UpvoteButtonContainer
                  recipe={this.props.recipe}
                  index={ this.props.index}
                />
                  }
                  {
                    this.props.downvoteRecipe &&
                <DownvoteButtonContainer
                  recipe={this.props.recipe}
                  index={ this.props.index}
                />
                  }
                  {
                    this.props.deleteSingleRecipe &&
                <DeleteButtonContainer
                  recipe={this.props.recipe}
                  index={this.props.index}
                />
                  }
                  {
                    this.props.editRecipe &&
                <EditButton
                  handleEdit={this.handleEdit}
                  recipe={this.props.recipe}
                  index={this.props.index}
                />
                  }

                  <a 
                  className="waves-effect waves-light tooltipped" 
                  data-position="bottom" 
                  data-delay="100 " 
                  data-tooltip="views">
                  <i className="material-icons left">visibility</i>
                  {this.props.recipe.views}</a>
                  <a 
                  className="waves-effect waves-light tooltipped" 
                  data-position="bottom" 
                  data-delay="100 " 
                  data-tooltip="reviews">
                  <i className="material-icons left">chat</i>
                  {this.props.recipe.reviews.length}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
       <div id={this.props.index} className="modal">
          <div className="modal-content">
            <h4>Edit Recipe</h4>
            <div className="row">
              <UpdateRecipeForm 
              recipes={this.state.recipes}
              recipe={ this.state.recipe }
              index={ this.state.recipeIndex }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
