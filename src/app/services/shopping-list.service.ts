import {Ingredient} from "../models/ingredient.model";
import {EventEmitter} from "@angular/core";
import {forEach} from "@angular/router/src/utils/collection";

export class ShoppingListService {
  ingredientsChange = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  appIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsChange.emit(this.ingredients.slice());

  }
}
