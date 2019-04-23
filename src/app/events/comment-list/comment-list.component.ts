import { Component, OnInit } from '@angular/core';
import { CommentForm } from '../model/event';
import { FormBuilder } from '@angular/forms';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  private eventNumber: any;
  private commentForm: any;
  private comments;
  private comment: CommentForm;
  
  constructor(private formBuilder: FormBuilder, private eventService: EventService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe(param => {
      this.eventNumber = param.get('id');
      this.eventService.getComments(this.eventNumber).subscribe((data) => {
        this.comments = data;
      })
    })
  }

  initForm(){
    this.commentForm = this.formBuilder.group({
      comment:['']
    })
  }

  deleteComment(id: any){
    console.log(id);
    this.eventService.deleteComment(id).subscribe(() => {
      console.log("success")
      this.ngOnInit();

      //reload
    },(err) => {
      console.log(err);
          //TODO
    })
  }

  onSubmit(){
    console.log(this.commentForm.value);
    this.comment = new CommentForm(this.commentForm.value);
    console.log(this.comment)

    let id = this.eventNumber;
    this.eventService.createComment(id, this.comment).subscribe(() => {
      console.log("Success")
      //TODO unkown error men server ser fin ut.
      this.ngOnInit();
    }, (err) => {
      console.log(err);
          //TODO
    })
    
  }

}
