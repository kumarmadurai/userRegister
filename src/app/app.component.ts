import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PopupComponent } from './popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'userRegister';
  displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'dob', 'qualification', 'action'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator !: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort !: MatSort;
  constructor(private popup: MatDialog, private user: UserService ) {}

  ngOnInit() {
    this.getAllUserDetails();
  }

  openDialog() {
    this.popup.open(PopupComponent, {
      data: {
       width: '30%'
      },
    }).afterClosed().subscribe(val => {
      if(val === 'save') {
        this.getAllUserDetails();
      }
    });
  }
  getAllUserDetails() {
    this.user.getAllUserDetails().subscribe({
      next:(result) => {
       this.dataSource = new MatTableDataSource(result);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      error:(e) => {
            alert('Error');
      }
  })
  }
  editUserDetails(row: any) {
    this.popup.open(PopupComponent, {
      data: {
       width: '30%',
       data: row
      },
    }).afterClosed().subscribe(val => {
      if(val === 'update') {
        this.getAllUserDetails();
      }
    });
  }
  deleteUserDetails(id: number) {
this.user.deleteUserDetails(id).subscribe({
  next:(res) => {
    alert('deleted')
    this.getAllUserDetails();
  }
})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
