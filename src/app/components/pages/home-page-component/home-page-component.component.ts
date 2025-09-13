import { Component } from '@angular/core';
import { PageHeaderComponent } from "../../shared/page-header-component/page-header-component.component";

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page-component.component.html',
  styleUrl: './home-page-component.component.scss',
  standalone: true,
  imports:[PageHeaderComponent]
})

export class HomePageComponent {
pageHeading:string = "Everything your business needs to master AI, all in one place.";
spotLight:string="Explore top AI tools and learn how to use them effectively.";
}
