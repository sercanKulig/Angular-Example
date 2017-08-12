import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Test' ,'http://images.media-allrecipes.com/userphotos/250x250/2160152.jpg'),
    new Recipe('A Test Recipe', 'Test' ,'http://images.media-allrecipes.com/userphotos/250x250/2160152.jpg'),
    new Recipe('A Test Recipe', 'Test' ,'http://images.media-allrecipes.com/userphotos/250x250/2160152.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
