import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar-component/side-bar-component.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterLinkActive } from "@angular/router";
import { RouterLink } from "../../../../../node_modules/@angular/router/index";

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [SideBarComponent, TooltipModule, RouterLinkActive, RouterLink],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss'
})
export class HeaderComponent {
isAdmin:boolean = false;

}
