import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { catchError } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  posts = [];
  postsLists: any[];
  start = 0;
  end = 10;
  pageSize = 10;
  filterText = '';
  pageIndex = 0;
  postsLoading = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.postsLoading = true;
    this.auth
      .getUserPosts()
      .pipe(catchError((err, caught) => caught))
      .subscribe((res) => {
        console.log(res);
        setTimeout(() => {
          this.postsLoading = false;
          this.posts = res?.map((d) => ({
            id: d.id,
            userId: d.userId,
            title: d.title,
            body: d.body,
          }));
          this.postsLists = this.posts.slice(this.start, this.end);
        }, 5000);
      });
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.start = 0;
    this.end = 10;
    this.pageIndex = 0;
    this.postsLists = this.posts
      .filter((t) => t.title.startsWith(event))
      .splice(this.start, this.end);
  }
  pageChange(ev: PageEvent) {
    if (this.filterText) {
      this.pageIndex = ev.pageIndex;
      this.start = ev.pageIndex * ev.pageSize;
      this.end = this.start + ev.pageSize;
      this.postsLists = this.posts
        .filter((t) => t.title.startsWith(this.filterText))
        .slice(this.start, this.end);
      return;
    }
    this.pageIndex = ev.pageIndex;
    this.start = ev.pageIndex * ev.pageSize;
    this.end = this.start + ev.pageSize;
    this.postsLists = this.posts.slice(this.start, this.end);
  }

  getFilteredLength() {
    return this.posts.filter((t) => t.title.startsWith(this.filterText)).length;
  }
}

export interface PostData {
  id: string;
  userId: string;
  title: string;
  body: string;
}
