import { Component, inject, OnInit } from '@angular/core';
import { PostsStore } from './rxjs-store/posts-store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ AsyncPipe],
  providers: [PostsStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit{
  title = 'poc-rxjs-store';

  store = inject(PostsStore);

  ngOnInit() {
    this.store.isLoading$.subscribe(console.log)
    this.store.allState$.subscribe(console.log)
  }
}
