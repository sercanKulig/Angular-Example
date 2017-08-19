import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../models/recipe.model";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable()
export class RouteProtectionService implements CanActivate {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  onRootProtectionRecipe(recipe: Recipe) {
    if (recipe == null) {
      this.router.navigate([''], {relativeTo: this.route});
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }
}
