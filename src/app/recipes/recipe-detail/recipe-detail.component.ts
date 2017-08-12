import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../models/recipe.model';
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute} from "@angular/router";
import {isNumber} from "util";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (recipes: Recipe) => {
          this.recipe = this.recipeService.getRecipe(recipes.id);
        }
      );
  }

  onAddShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
