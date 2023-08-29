import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // selector is used in app.component.html in this application 
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


// send data to the search route
export class SearchComponent implements OnInit {

  // inject router into the component
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // this method doSearch is called in search.component.html
  doSearch(value : string) {
    // for debugging purposes
    console.log(`value=${value}`);

    // routing data to "search/:route" in app.module.ts which is handled by ProductListComponent
    this.router.navigateByUrl(`/search/${value}`);
  }

}
