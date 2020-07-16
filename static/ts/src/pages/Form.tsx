import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import { retrieveRecipe } from "@syafiqtermizi/masak2-store/lib/recipes";

import { textToIngredient, textToStep } from "../utils";

interface Props {
  retrieveRecipe: () => any;
}

const RecipeForm: React.FC<Props> = ({ retrieveRecipe }) => {
  const [imageURL, setImageURL] = useState("");
  const [imageName, setImageName] = useState("");
  const token = Cookie.get("csrftoken");
  const history = useHistory();
  const initialValues = {
    name: "",
    difficulty: "",
    media: "",
    description: "",
    ingredients: "",
    directions: "",
  };

  const onSubmit = (values: any) => {
    const form = new FormData();
    const req = {
      ...values,
      ingredients: textToIngredient(values["ingredients"]),
      directions: textToStep(values["directions"]),
    };
    Object.keys(req).forEach((key) => form.append(key, req[key]));

    axios
      .post("http://localhost:8000/api/recipes/", form, {
        headers: {
          "X-CSRFToken": token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        retrieveRecipe();
        res.data.id
          ? history.push(`/detail/${res.data.id}`)
          : history.push("/");
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleFileUpload = (file: any, setValue: any) => {
    setValue("media", file);
    setImageURL(URL.createObjectURL(file));
    setImageName(file.name);
  };

  return (
    <div className="row mt-5">
      <div className="col-12">
        <Formik
          onSubmit={(values) => onSubmit(values)}
          initialValues={initialValues}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <Field
                  placeholder="Recipe Name"
                  type="text"
                  name="name"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <Field
                  type="number"
                  name="difficulty"
                  placeholder="Difficulty"
                  className="form-control"
                  required
                />
              </div>
              {imageURL && (
                <div className="mb-3">
                  <img src={imageURL} alt="" width="100px" />
                </div>
              )}
              <div className="form-file mb-3">
                <input
                  onChange={(event) => {
                    const file = event.currentTarget.files
                      ? event.currentTarget.files[0]
                      : "";
                    handleFileUpload(file, setFieldValue);
                  }}
                  type="file"
                  name="media"
                  className="form-file-input"
                  id="recipe-image"
                  required
                />
                <label className="form-file-label" htmlFor="recipe-image">
                  <span className="form-file-text">
                    {imageName ? imageName : "Choose file.."}
                  </span>
                  <span className="form-file-button">Browse</span>
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="recipe-description">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  id="recipe-description"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="recipe-description">Ingredients</label>
                <Field
                  as="textarea"
                  name="ingredients"
                  id="ingredients"
                  className="form-control"
                  placeholder="Put each ingredient on each own line"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="directions">Directions</label>
                <Field
                  as="textarea"
                  name="directions"
                  id="directions"
                  className="form-control"
                  placeholder="Put each step on its own line"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const mapDispatchToProps = { retrieveRecipe };
export default connect(null, mapDispatchToProps)(RecipeForm);
