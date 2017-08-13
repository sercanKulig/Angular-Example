import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs/Subject";

export class ShoppingListService {
  ingredientsChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient(1, 'Apples', 5),
    new Ingredient(2, 'Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients[Number(id)];
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  updateIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients[id - 1] = newIngredient;
    this.ingredientsChange.next(this.ingredients.slice());
  }

}
