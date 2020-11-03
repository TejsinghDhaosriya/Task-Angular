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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data=[]

   constructor(private http:HttpClient) { }
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