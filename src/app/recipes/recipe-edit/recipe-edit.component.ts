import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../models/recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {RouteProtectionService} from "../../shared/route-protection.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private routeGuard: RouteProtectionService,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (recipes: Recipe) => {
          this.id = recipes.id;
          this.recipe = this.recipeService.getRecipe(this.id);
          this.initForm();
          this.routeGuard.onRootProtectionRecipe(this.recipe);
        }
      );
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'id': new FormControl(),
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )
  }

  private initForm() {
    let recipeId = null;
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (!this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeId = recipe.id;
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredients of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'id': new FormControl(ingredients.id),
              'name': new FormControl(ingredients.name),
              'amount': new FormControl(ingredients.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'recipeId': new FormControl(recipeId),
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }

}
