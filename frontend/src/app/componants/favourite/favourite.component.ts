import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookServices } from 'src/app/core/services/book_services';
import { CartServices } from 'src/app/core/services/cart_services';
import { UserServices } from 'src/app/core/services/user_services';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  constructor(private userServices:UserServices, private cartServices:CartServices,
    private toastr: ToastrService, public _bookServices:BookServices) { }

  ngOnInit(): void {
  }

  deleteFromFavourite(bookId:string){
    this._bookServices.deleteBookFromFav(bookId).subscribe(
      (res) => {
        this._bookServices.favBooks = this._bookServices.favBooks.filter((book)=> book.bookId != bookId);
        const index = this._bookServices.favBooksIds.findIndex((id)=> id == bookId);
        this._bookServices.favBooksIds.splice(index,1);
        this.toastr.success(res.msg);
      },
      (e) => this.toastr.error(e.msg)
    )
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

}
