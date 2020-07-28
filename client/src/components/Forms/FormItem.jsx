import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import apiHandler from "../../api/apiHandler.js";

class ItemForm extends Component {

  state = {
    name: '',
    
}

  handleChange = (event) => {
    let key = event.target.name;
    let value;
    // if (event.target.type === 'radio') {
    //   value = event.target.value === 'yes' ? true : false;
    //   console.log("value is", value)
    // } else {
      value = event.target.value;
    // }
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
        // for(let key in this.state){
    //   fd.append(key,this.state[key])
    // }
    var objectFormData = new FormData();
    objectFormData.append("name", this.state.name);
    objectFormData.append("description", this.state.description);
    objectFormData.append("image", this.state.image);
    objectFormData.append("category", this.state.category);
    objectFormData.append("quantity", this.state.quantity);
    objectFormData.append("address", this.state.address);
    objectFormData.append("location", this.state.location);

    
    objectFormData.append("createdAt", Date.now());

    console.log(objectFormData);

    apiHandler
      .createItem(objectFormData)
      .then((apiRes) => {
        console.log("creation success", apiRes.data)
        this.setState({ success: true });
        // this.props.history.push("/plants");
      })
      .catch((error) => {
        console.log(error);
      });

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  };

  handlePlace = (place) => {
    var locationObject = {
      type: place.geometry.type,
      coordinates: place.geometry.coordinates,
      formattedAddress: place.place_name,
    };

    console.log("in form place : ", locationObject);
    this.setState({ location: locationObject });
  };
  // This handle is passed as a callback to the autocomplete component.
  // Take a look at the data and see what you can get from it.
  // Look at the item model to know what you should retrieve and set as state.

  render() {
    return (
      <div className="ItemForm-container">
        <form
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="input"
              type="text"
              placeholder="What are you giving away ?"
              defaultValue={this.state.name}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select id="category" name="category"  defaultValue="-1">
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="input"
              name="quantity"
              id="quantity"
              type="number"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="text-area"
              placeholder="Tell us something about this item"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input className="input" name="image" id="image" type="file" />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input name="contact" value="email" type="radio" />
              user email
            </div>
            <input name="contact" value="phone" type="radio" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
