import {Component, OnInit} from '@angular/core';

import {Recipe} from '../../models/recipe.model';
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (recipes: Recipe) => {
          this.id = recipes.id;
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    // this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
