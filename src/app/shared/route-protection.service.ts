import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../models/recipe.model";
import {Injectable} from "@angular/core";

@Injectable()
export class RouteProtectionService {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  onRootProtectionRecipe(recipe: Recipe) {
    if (recipe == null) {
      this.router.navigate([''], {relativeTo: this.route});
    }
  }
}
