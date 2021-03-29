import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are You Sure?</h1>
             <mat-dialog-actions>
               <mat-dialog-content>
                 <p>You already got {{  data.progress }}%</p>
               </mat-dialog-content>
               <button mat-button [mat-dialog-close]="true">Yes</button>
               <button mat-button [mat-dialog-close]="false">No</button>
             </mat-dialog-actions>` ,
  styleUrls: ['./stop-training.component.css']
})
export class StopTrainingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
