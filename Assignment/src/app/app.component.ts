import { Component, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  apiData;
  drawingData;
  page;
  url;albumId;thumbnail;title;

  
  constructor(private http: HttpClient){};

  ngOnInit(): void {
    this.http.get('http://jsonplaceholder.typicode.com/photos?_start=0&_limit=20').subscribe(
      (data => {
        this.apiData = data;
        console.log(this.apiData);
        this.drawTable([...this.apiData]); //making a copy of original
      }),
      (err => console.log(err))
    );
  }

  drawTable(data){
    this.drawingData = data;
  }

  onDelete(id){
    //remove based on the index
    let idx = -1;
    for(let i = 0; i < this.drawingData.length; i++){
      if(this.drawingData[i].id === id){
        idx = i;
        break;
      }
    }
    if(idx > -1){
      this.drawingData.splice(idx, 1);
      alert('ID '+id+" has been deleted");
    }
    
  }

  onSave(){
      let obj = {
        albumId:this.albumId,
        thumbnailUrl: this.thumbnail,
        title: this.title,
        url: this.url,
      }
      let id = +this.drawingData[this.drawingData.length-1].id;
      id = id+1;
      obj['id'] = id;
      this.drawingData.push(obj);

      $("#formModal").modal("hide");
      this.albumId = '';
       this.thumbnail = '';
       this.title = '';
        this.url = '';
  }
}
