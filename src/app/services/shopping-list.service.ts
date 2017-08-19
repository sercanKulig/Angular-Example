import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";
import {RouteProtectionService} from "../shared/route-protection.service";

@Injectable()
export class ShoppingListService {
  ingredientsChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    /*new Ingredient(1, 'Apples', 5),
    new Ingredient(2, 'Tomatoes', 10),*/
  ];

  constructor(private http: Http, private authService: AuthService, private routeProtectionService: RouteProtectionService) {
  }

  getIngredients() {
    this.getData();
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients[Number(id)];
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.putData().subscribe(
      (response: Response) => {
        this.getIngredients();
      }
    );
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.putData().subscribe(
      (response: Response) => {
        this.getIngredients();
      }
    );
  }

  updateIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients[id - 1] = newIngredient;
    this.putData().subscribe(
      (response: Response) => {
        this.getIngredients();
      }
    );
  }

  deleteIngredient(id: number) {
    this.ingredients.splice((id - 1), 1);
    this.putData().subscribe(
      (response: Response) => {
        this.getIngredients();
      }
    );
  }

  getIngredientsLastId() {
    const ingredientList = this.ingredients.slice();
    return ingredientList.length > 0 ? ingredientList[ingredientList.length - 1].id : 1;
  }

  getData() {
    const token = this.authService.getToken();
    this.http.get('https://angular-http-b118b.firebaseio.com/ingredients.json?auth=' + token)
      .map(
        (response: Response) => {
          const ingredients: Ingredient[] = response.json();
          this.ingredients = ingredients;
          return ingredients;
        }
      )
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredientsChange.next(this.ingredients.slice());
        }
      );

  }

  putData() {
    const token = this.authService.getToken();
    return this.http.put('https://angular-http-b118b.firebaseio.com/ingredients.json?auth=' + token, this.getIngredients());
  }

}
