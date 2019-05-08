import { Component, OnInit } from '@angular/core';
import { CommentForm } from '../model/event';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/authservice.service';

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
  private errorMessage = '';
  private submitted = false;

  
  constructor(private formBuilder: FormBuilder, private eventService: EventService,private authService: AuthserviceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe(param => {
      this.eventNumber = param.get('id');
      this.eventService.getComments(this.eventNumber).subscribe((data) => {
        this.comments = data;
        console.log(this.comments);
      })
    })
  }

  initForm(){
    this.commentForm = this.formBuilder.group({
      comment:['', [Validators.required]]
    })
  }

  get name() {
    return this.commentForm.get('comment');
  }

  deleteComment(id: any){
    console.log(id);
    this.eventService.deleteComment(id).subscribe(() => {
      console.log("success")
      this.ngOnInit();
    }, (err) => {
      this.handleUnauthorized(err);
      this.errorMessage = 'Gick inte att att ta bort kommentaren';

    });
  }

  private handleUnauthorized(err: any) {
    if (err.status === 401) {      
      let success = this.authService.tryRefreshToken();
      if (success) {
        this.ngOnInit();
      } else {
        this.router.navigate(["/logga-in"]);
      }
    }
  }

  onSubmit(){
    console.log(this.commentForm.value);
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    this.comment = new CommentForm(this.commentForm.value);

    let id = this.eventNumber;
    this.eventService.createComment(id, this.comment).subscribe(() => {
      console.log("sucess")
      this.ngOnInit();
    }, (err) => {
      this.handleUnauthorized(err);
      this.errorMessage = 'Gick inte att posta kommentaren';
    });
    
  }

}
