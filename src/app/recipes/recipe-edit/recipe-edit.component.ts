import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../models/recipe.model';
import {RecipeService} from '../../services/recipe.service';
import {RouteProtectionService} from '../../shared/route-protection.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

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
          if (this.id != null && this.recipe == null) {
            this.routeGuard.onRootProtectionRecipe(this.recipe);
          }
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'id': new FormControl(this.recipeService.getRecipeLastId() + 1),
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  private initForm() {
    let recipeId = this.recipeService.getRecipeLastId() + 1;
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);
    const recipe = this.recipeService.getRecipe(this.id);
    recipe ? this.editMode = true : this.editMode = false;

    if (this.editMode) {
      recipeId = recipe ? recipe.id : this.recipeService.getRecipeLastId();
      recipeName = recipe ? recipe.name : '';
      recipeImagePath = recipe ? recipe.imagePath : '';
      recipeDescription = recipe ? recipe.description : '';
      if (recipe && recipe['ingredients']) {
        for (let ingredients of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'id': new FormControl(ingredients.id),
              'name': new FormControl(recipe ? ingredients.name : '', Validators.required),
              'amount': new FormControl(recipe ? ingredients.amount : '', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'recipeId': new FormControl(recipeId),
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
