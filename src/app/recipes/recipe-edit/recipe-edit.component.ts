import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../models/recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {RouteProtectionService} from "../../shared/route-protection.service";
import {FormControl, FormGroup} from "@angular/forms";

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

  private initForm() {
    let recipeId = null;
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeId = recipe.id;
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
    this.recipeForm = new FormGroup({
      'id': new FormControl(recipeId),
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
    });
  }

}
