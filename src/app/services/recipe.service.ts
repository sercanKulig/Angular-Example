import {Recipe} from "../models/recipe.model";
import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';
import {Ingredient} from "app/models/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    /*new Recipe(
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
      ])*/
  ];

  constructor(private http: Http, private sls: ShoppingListService) {
  }

  /*
    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }
  */

  getRecipes() {
    this.getData();
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
    this.putData().subscribe(
      (response: Response) => {
        this.getRecipes();
      }
    );
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index - 1] = newRecipe;
    this.putData().subscribe(
      (response: Response) => {
        this.getRecipes();
      }
    );
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index - 1, 1);
    this.putData().subscribe(
      (response: Response) => {
        this.getRecipes();
      }
    )
  }

  getData() {
    this.http.get('https://angular-http-b118b.firebaseio.com/recipes.json')
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
        }
      );
  }

  putData() {
    return this.http.put('https://angular-http-b118b.firebaseio.com/recipes.json', this.getRecipes());
  }
}
