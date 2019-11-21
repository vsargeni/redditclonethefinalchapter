import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreModule,
  AngularFirestoreDocument,
  fromDocRef
} from '@angular/fire/firestore';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() subid: string;
  @Input() postid: string;

  constructor(private route: ActivatedRoute, public db: AngularFirestore) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subid = params.get('subid');
      this.postid = params.get('postid');
    });
    this.getPostInfo(this.subid, this.postid);
  }

  async getPostInfo(subid: string, postid: string) {
    try {
      await this.db.collection('subreddits').doc(subid).collection('posts').doc(postid).get().toPromise()
        .then(async doc => {
          if (!doc.exists) {
            console.log('Document does not exist');
          } else {
            document.querySelector('#title').innerHTML = `<b><h1>Title: ${doc.get('title')}</h1></b>`;
            document.querySelector('#author').innerHTML = `<b><h2>Author: ${doc.get('author')}</h2></b>`;
            document.querySelector('#image').innerHTML = `<b><a href=${doc.get('image')}><h2>Image: ${doc.get('image')}</h2></a></b>`;
            document.querySelector('#link').innerHTML = `<b><a href=${doc.get('link')}><h2>Link: ${doc.get('link')}</h2></a></b>`;
            document.querySelector('#text').innerHTML = `<b><h2>Text: ${doc.get('text')}</h2></b>`;
            console.log(postid);
            try {
              await this.db.collection('subreddits').doc(subid).collection('posts').doc(postid).collection('comments').get().toPromise()
                .then(coll => {
                  if (coll.empty) {
                    console.log('No documents found');
                  } else {
                    coll.forEach(comment => {
                      document.querySelector('#comments').innerHTML +=
                        `<br><p id="comment">${comment.get('text')}</p>
                        <p id="author">By: ${comment.get('author')}</p></br>`;
                      console.log(comment.id);
                    });
                  }
                });
            } catch (err) {
              console.log(err);
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
  }
}
