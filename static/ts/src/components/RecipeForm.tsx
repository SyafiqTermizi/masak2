import * as React from "react";

export const RecipeForm = () => (
  <form>
    <div className="mb-3">
      <input
        placeholder="Recipe Name"
        type="text"
        name="recipe-name"
        className="form-control"
        required
      />
    </div>
    <div className="mb-3">
      <input
        type="number"
        name="recipe-difficulty"
        placeholder="Difficulty"
        className="form-control"
      />
    </div>
    <div className="form-file mb-3">
      <input
        type="file"
        name="recipe-image"
        className="form-file-input"
        id="recipe-image"
      />
      <label className="form-file-label" htmlFor="recipe-image">
        <span className="form-file-text">Choose file...</span>
        <span className="form-file-button">Browse</span>
      </label>
    </div>
    <div className="mb-3">
      <label htmlFor="recipe-description">Description</label>
      <textarea
        name="recipe-description"
        id="recipe-description"
        className="form-control"
      />
    </div>
    <div className="mb-3">
      <label htmlFor="recipe-description">Ingredients</label>
      <textarea
        name="ingredients"
        id="ingredients"
        className="form-control"
        placeholder="Put each ingredient on each own line"
      ></textarea>
    </div>
    <div className="mb-3">
      <label htmlFor="directions">Directions</label>
      <textarea
        name="directions"
        id="directions"
        className="form-control"
        placeholder="Put each step on its own line"
      />
    </div>
  </form>
);
