import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../models/recipe.model";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (recipes: Recipe) => {
          this.id = recipes.id;
          this.recipe = this.recipeService.getRecipe(this.id);
          this.editMode = this.recipe !== null ? true : false;
          console.log(this.editMode);
        }
      );
  }

}
