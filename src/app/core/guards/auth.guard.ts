import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StrorageService } from '../services/strorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StrorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.storageService.getToken(); // Replace with your actual authentication logic

    if (isAuthenticated) {
      return true; // Allow access to the route
    } else {
      // Redirect to the login page or any other route
      return this.router.createUrlTree(['/auth']);
    }
  }
}
