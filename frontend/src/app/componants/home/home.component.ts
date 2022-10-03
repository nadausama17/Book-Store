import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/core/models/book';
import { Cart } from 'src/app/core/models/cart';
import { User } from 'src/app/core/models/user';
import { BookServices } from 'src/app/core/services/book_services';
import { CartServices } from 'src/app/core/services/cart_services';
import { UserServices } from 'src/app/core/services/user_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books!: Book[];
  tempBooks!: Book[];
  user!: User | null;
  deleteDialogue: boolean = false;
  deletedBookId: any;
  searchText:string = "";

  constructor(
    public bookServices: BookServices,
    public userServices: UserServices,
    private cartServices: CartServices,
    private router: Router,
    private toastr: ToastrService
  ) {
    bookServices.getAllBooks().subscribe((res) => {
      if (!res.success) {
        toastr.error(res.msg);
        return;
      }
      this.books = res.data;
      this.tempBooks = res.data;
    });
  }

  top(id: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.deleteDialogue = true;
    this.deletedBookId = id;
  }
  ngOnInit(): void {}

  deleteBook() {
    this.deleteDialogue = false;
    this.bookServices.deleteBook(this.deletedBookId).subscribe(
      (data) =>{
        this.books = this.books.filter(
          (book) => book._id != this.deletedBookId
        );
        this.bookServices.favBooks = this.bookServices.favBooks.filter((b)=> b.bookId != this.deletedBookId);
        this.bookServices.favBooksIds = this.bookServices.favBooksIds.filter((id)=> id != this.deletedBookId);
      },
      (e) => console.log(e),
      () => {}
    );
  }

  addCart(bookId: any,bookTitle:string,bookImage:string,bookPrice:number) {
    if (this.userServices.isLoggedIn) {
      let data = { bookId, bookTitle, bookImage, bookPrice };
      this.cartServices.addToCart(data).subscribe(
        (res) => this.toastr.success('Book added to cart'),
        (e) => { console.log(e);
         this.toastr.error('Failed to add book to cart')},
        () => {}
      );
    } else {
      this.toastr.error('Please Login to add to cart');
    }
  }

  changeFavouriteStatus(bookId:any,book:Book,addToFav:boolean){
    if(addToFav){
      this.addToFavourite(bookId,book);
    }else{
      this.deleteFromFavourite(bookId);
    }
  }

  addToFavourite(bookId:any,book:Book){
    let data = { book };
    this.bookServices.addToFavourite(data).subscribe(
      (res)=> {
        this.toastr.success(res.msg);
        this.bookServices.favBooks.push({bookId: book._id,bookImage: book.image,bookTitle: book.title,
          bookPrice: book.price});
        this.bookServices.favBooksIds.push(bookId);
      },
      (e)=> {this.toastr.error(e.msg); console.log(e);}
    )
  }

  deleteFromFavourite(bookId:string){
    this.bookServices.deleteBookFromFav(bookId).subscribe(
      (res) => {
        this.bookServices.favBooks = this.bookServices.favBooks.filter((book)=> book.bookId != bookId);
        const index = this.bookServices.favBooksIds.findIndex((id)=> id == bookId);
        this.bookServices.favBooksIds.splice(index,1);
        this.toastr.success(res.msg);
      },
      (e) => this.toastr.error(e.msg)
    )
  }

  searchFun(){
    this.tempBooks = [...this.books];
    
    this.tempBooks = this.tempBooks.filter((b)=>{
      let regex = new RegExp(this.searchText,'i');

      return (b.title.search(regex) != -1) || (b.author.search(regex) !=-1);
    });
  }
}
