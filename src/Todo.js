import { Button } from 'bootstrap';
import React, { Component } from 'react'

export default class Todo extends Component {
  state = {
    element: '',
    items: [],
  };

  // pour récupérer ce qui est saisi dans l'input
  onChange = (e) => {
    // e correspond à l'évènement, ce qu'on écrit dedans
    this.setState({
      // pour changer le state
      [e.target.name] : e.target.value
    });
    //console.log(this.state.element);
  };

  // enregistrer la value saisie quand on clique sur le button
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      element: '', // on remet element à 0
      items: [...this.state.items, { element: this.state.element }], // on écrit dans le tab items ce qu'on a saisi
    });
  };

  deleteItem = (index) => { // on supprime l'élément que l'on veut du tableau grâce à l'index
        const arr = this.state.items; // on prend le tableau que l'on met dans une constante
        arr.splice(index, 1); // à partir de index, on enlève un élément du tableau (.splice le permet)
        this.setState({ // on remplace le tableau avec le tableau avec la valeur en moins
            items: arr
        })
  }

  // pour afficher les éléments de la todo list
  renderTodo = () => {
    return this.state.items.map((item, index) => {
      return (
          
        // pour chaque élément à retourner, nous créons le jsx associé
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h4> {item.element}
            <i className="fas fa-times" // croix pour supprimer
                style={{ cursor: "pointer", float: "right", color: "red" }}
                // on fait une fonction anonyme car on va vouloir passer en paramètre à chaque fois l'index de l'élément sur lequel on a cliqué 
                onClick={() => this.deleteItem(index)} // Si pas besoin de paramètres, appeler la méthode normalement (sans fonction anonyme)
              ></i> 
            </h4>
          </div>
        </div>
      )
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="card my-3">
          <div className="card-header">To-Do List</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="element">Chose à faire</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="element"
                  onChange={this.onChange} // on est à l'écoute de tout ce qu'on créé dans notre input
                  value={this.state.element}
                />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block mt-3"
              >
                Ajouter une chose à faire !
              </button>
            </form>
          </div>
        </div>
        {this.renderTodo()}
      </React.Fragment> // au dessus, on appelle la méthode renderTodo()
    );
  }
}
