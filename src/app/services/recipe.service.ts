import {Recipe} from "../models/recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "app/models/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'A Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient(10, 'Meat', 1),
        new Ingredient(11, 'French Fries', 20)
      ]),
    new Recipe(
      2,
      'Another Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient(12, 'Buns', 2),
        new Ingredient(13, 'Meat', 1)
      ])
  ];

  constructor(private sls: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    const status = this.recipes.find(x => x.id === Number(id));
    return status;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.sls.addIngredients(ingredients);
  }

  getRecipeLastId() {
    const recipeList = this.recipes.slice();
    return recipeList.length > 0 ? recipeList[recipeList.length - 1].id : 1;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index - 1] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
