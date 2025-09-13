import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar-component/side-bar-component.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [SideBarComponent, TooltipModule],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss'
})
export class HeaderComponent {
isAdmin:boolean = false;

}
