import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../../models/recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Test' ,'http://images.media-allrecipes.com/userphotos/250x250/2160152.jpg'),
    new Recipe('Another Test Recipe', 'Test' ,'http://images.media-allrecipes.com/userphotos/250x250/2160152.jpg'),
    new Recipe('Last Test Recipe', 'Test' ,'http://images.media-allrecipes.com/userphotos/250x250/2160152.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
