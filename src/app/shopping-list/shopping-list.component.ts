import {Component, OnInit} from '@angular/core';

import {Ingredient} from '../models/ingredient.model';
import {ShoppingListService} from "../services/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private sls: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.sls.getIngredients();
    this.sls.ingredientsChange
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }
}
