import { Component,ViewEncapsulation, ViewChild } from '@angular/core'

@Component({
	selector: 'student-table',
	template: `
  <div>
      <ngx-datatable
        #myTable
        class='material expandable'
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [scrollbarV]="50"
        [rows]='rows'
        (page)="onPage($event)">

        <!-- Row Detail Template -->
        <ngx-datatable-row-detail [rowHeight]="100" #myDetailRow (toggle)="onDetailToggle($event)">
          <ng-template let-row="row" ngx-datatable-row-detail-template>
            <div style="padding-left:35px;">
              <div><strong>Address</strong></div>
              <div>{{row.address.city}}, {{row.address.state}}</div>
            </div>
          </ng-template>
        </ngx-datatable-row-detail>

        <!-- Column Templates -->
         <ngx-datatable-column
          [width]="50"
          [resizeable]="false"
          [sortable]="false"
          [draggable]="false"
          [canAutoResize]="false">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <i class="glpyphicon"
              href="#"
              [class.glyphicon-chevron-right]="!my_var"
              [class.glyphicon-chevron-down]="row.$$expanded"
              title="Expand/Collapse Row"
              (click)="toggleExpandRow(row)">
            </i>
          </ng-template>
        </ngx-datatable-column>


        <ngx-datatable-column name="Index" width="80">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <strong>{{row.$$index}}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Expanded" width="80">
          <ng-template let-row="row" ngx-datatable-cell-template>
            <strong>{{row.$$expanded === 1}}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Name" width="200">
          <ng-template let-value="value" ngx-datatable-cell-template>
            <strong>{{value}}</strong>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" width="300">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            <i [innerHTML]="row['name']"></i> and <i>{{value}}</i>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" ></ngx-datatable-column>
      </ngx-datatable>
    </div>
	`,
	styles: [`
	`],
	encapsulation: ViewEncapsulation.None
})


export class StudentTableComponent {

	my_var = true;

  @ViewChild('myTable') table: any;

	rows = [
    {
        "id": 0,
        "name": "Ramsey Cummings",
        "gender": "male",
        "age": 52,
        "address": {
            "state": "South Carolina",
            "city": "Glendale"
        }
    },
    {
        "id": 1,
        "name": "Stefanie Huff",
        "gender": "female",
        "age": 70,
        "address": {
            "state": "Arizona",
            "city": "Beaverdale"
        }
    },
    {
        "id": 2,
        "name": "Mabel David",
        "gender": "female",
        "age": 52,
        "address": {
            "state": "New Mexico",
            "city": "Grazierville"
        }
    },
    {
        "id": 3,
        "name": "Frank Bradford",
        "gender": "male",
        "age": 61,
        "address": {
            "state": "Wisconsin",
            "city": "Saranap"
        }
    },
    {
        "id": 4,
        "name": "Forbes Levine",
        "gender": "male",
        "age": 34,
        "address": {
            "state": "Vermont",
            "city": "Norris"
        }
    },
    {
        "id": 5,
        "name": "Santiago Mcclain",
        "gender": "male",
        "age": 38,
        "address": {
            "state": "Montana",
            "city": "Bordelonville"
        }
    },
    {
        "id": 6,
        "name": "Merritt Booker",
        "gender": "male",
        "age": 33,
        "address": {
            "state": "New Jersey",
            "city": "Aguila"
        }
    },    
    {
        "id": 7,
        "name": "Oconnor Wade",
        "gender": "male",
        "age": 18,
        "address": {
            "state": "Virginia",
            "city": "Kenmar"
        }
    },
    {
        "id": 8,
        "name": "Leigh Beasley",
        "gender": "female",
        "age": 53,
        "address": {
            "state": "Texas",
            "city": "Alfarata"
        }
    },
    {
        "id": 9,
        "name": "Johns Wood",
        "gender": "male",
        "age": 52,
        "address": {
            "state": "Maine",
            "city": "Witmer"
        }
    },
    {
        "id": 10,
        "name": "Thompson Hays",
        "gender": "male",
        "age": 38,
        "address": {
            "state": "Nevada",
            "city": "Kipp"
        }
    },
    {
        "id": 11,
        "name": "Hallie Mack",
        "gender": "female",
        "age": 19,
        "address": {
            "state": "Minnesota",
            "city": "Darrtown"
        }
    },
    {
        "id": 12,
        "name": "Houston Santos",
        "gender": "male",
        "age": 24,
        "address": {
            "state": "Georgia",
            "city": "Crucible"
        }
    },
    {
        "id": 13,
        "name": "Brandy Savage",
        "gender": "female",
        "age": 65,
        "address": {
            "state": "Idaho",
            "city": "Nord"
        }
    },
    {
        "id": 14,
        "name": "Finch Barnett",
        "gender": "male",
        "age": 22,
        "address": {
            "state": "Ohio",
            "city": "Osmond"
        }
    },
    {
        "id": 15,
        "name": "Nicole Crosby",
        "gender": "female",
        "age": 77,
        "address": {
            "state": "Kentucky",
            "city": "Fairfield"
        }
    }
  ];
  expanded: any = {};
  timeout: any;

  constructor() {
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}