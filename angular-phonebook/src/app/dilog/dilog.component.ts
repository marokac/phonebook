import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dilog',
  templateUrl: './dilog.component.html',
  styleUrls: ['./dilog.component.scss']
})
export class DilogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<DilogComponent>,) {}

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
}
}
