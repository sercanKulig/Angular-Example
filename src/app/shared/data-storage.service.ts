import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RecipeService} from '../services/recipe.service';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put('https://angular-http-b118b.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    /*    this.http.get('https://angular-http-b118b.firebaseio.com/recipes.json')
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
              console.log(recipes);
              this.recipeService.setRecipes(recipes);
            }
          );*/
  }

}
