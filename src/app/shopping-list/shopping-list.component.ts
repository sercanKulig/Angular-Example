import {Component, OnDestroy, OnInit} from '@angular/core';

import {Ingredient} from '../models/ingredient.model';
import {ShoppingListService} from "../services/shopping-list.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private sls: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.sls.getIngredients();
    this.subscription = this.sls.ingredientsChange
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(id: number) {
    this.sls.startedEditing.next(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
