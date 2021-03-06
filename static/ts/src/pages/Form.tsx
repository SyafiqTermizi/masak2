import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import { retrieveRecipe } from "@syafiqtermizi/masak2-store/lib/recipes";
import { Tag } from "@syafiqtermizi/masak2-store/lib/tags";

import axios from "../axiosConfig";
import { textToIngredient, textToStep } from "../utils";
import { TagsInput } from "../components/TagsInput";

interface Props {
  retrieveRecipe: (id: number) => any;
}

const RecipeForm: React.FC<Props> = ({ retrieveRecipe }) => {
  const [imageURL, setImageURL] = useState("");
  const [imageName, setImageName] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const history = useHistory();

  const onSubmit = (values: any, actions: any) => {
    const req = {
      ...values,
      groups: textToIngredient(values["ingredients"]),
      steps: textToStep(values["steps"]),
      tags,
    };

    const form = new FormData();
    form.append("medias", values["medias"]);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/recipes/", req)
      .then((res) => axios.post(`/medias/?recipe=${res.data.id}`, form, config))
      .then((res) =>
        retrieveRecipe(res.data.recipe).then(() =>
          history.push(`/detail/${res.data.recipe}`)
        )
      )
      .catch((err) => {
        actions.setErrors(err.response.data);
        console.log(err.response.data);
      });
  };

  const handleFileUpload = (file: any, setValue: any) => {
    setValue("medias", file);
    setImageURL(URL.createObjectURL(file));
    setImageName(file.name);
  };

  return (
    <div className="row mt-5">
      <div className="col-12">
        <Formik
          onSubmit={(values, actions) => onSubmit(values, actions)}
          initialValues={{
            name: "",
            difficulty: "",
            medias: "",
            description: "",
            ingredients: "",
            steps: "",
          }}
        >
          {({ setFieldValue, errors }) => (
            <Form>
              <div className="mb-3">
                <Field
                  placeholder="Recipe Name"
                  type="text"
                  name="name"
                  className={
                    errors.name ? "form-control is-invalid" : "form-control"
                  }
                  required={true}
                />
              </div>
              <div className="mb-3">
                <Field
                  type="number"
                  name="difficulty"
                  placeholder="Difficulty"
                  min="1"
                  max="3"
                  className={
                    errors.difficulty
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  required={true}
                />
                <div className="form-text">
                  A number from 1 to 3. 1 being the easiest 3 the hardest
                </div>
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
                  name="medias  "
                  className={
                    errors.steps
                      ? "form-file-input is-invalid"
                      : "form-file-input"
                  }
                  id="recipe-image"
                  required={true}
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
                  rows="7"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="steps">Steps</label>
                <Field
                  as="textarea"
                  name="steps"
                  id="steps"
                  className={
                    errors.steps ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Put each step on its own line"
                  rows="7"
                  required={true}
                />
              </div>
              <TagsInput tags={tags} setTags={setTags} />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "hotpink", borderColor: "hotpink" }}
              >
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
