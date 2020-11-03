// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'demoapp';
// }

import {HttpClient , HttpHeaders} from '@angular/common/http';

import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Table with filtering
 */
// @Component({
//   selector: 'table-filtering-example',
//   styleUrls: ['table-filtering-example.css'],
//   templateUrl: 'table-filtering-example.html',
// })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   constructor(private http:HttpClient) { }
data
  displayedColumns: string[] = ['avatar','id', 'email', 'first_name', 'last_name'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
      dataSource = new MatTableDataSource(this.data);


  lastNameFilter = new FormControl();
  emailFilter = new FormControl();
  firstNameFilter = new FormControl();




  filteredValues = { first_name:'', last_name:'',email:''};
ngOnInit() {

      const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})}
       this.http.get('https://reqres.in/api/users?page=2',httpOptions).subscribe(res => {
         console.log(res['data'])
                 this.dataSource.data = res['data'];

       })

    this.emailFilter.valueChanges.subscribe((emailFilterValue)        => {
    this.filteredValues['email'] = emailFilterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.lastNameFilter.valueChanges.subscribe((lastNameFilterValue) => {
      this.filteredValues['last_name'] = lastNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.firstNameFilter.valueChanges.subscribe((lastNameFilterValue) => {
      this.filteredValues['first_name'] = lastNameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

  this.dataSource.filterPredicate = this.customFilterPredicate();
  
}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // numFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   this.dataSource.filterPredicate = (data: any, fitlerString: string) => {

  //       return data.position == filterValue;
  //   };
  //   this.dataSource.filter = filterValue;
  // }

  customFilterPredicate() {
    const myFilterPredicate = function(data,        filter:string) :boolean {
      let searchString = JSON.parse(filter);
      console.log(data.email)
      console.log(filter)
      return data.email.toString().trim().indexOf(searchString.email) !== -1 && 
    data.last_name.toString().trim().toLowerCase().indexOf(searchString.last_name.toLowerCase()) !== -1
    && 
    data.first_name.toString().trim().toLowerCase().indexOf(searchString.first_name.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */