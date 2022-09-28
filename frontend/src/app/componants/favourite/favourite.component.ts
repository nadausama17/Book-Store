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

  favBooks:any[] = [];

  constructor(private userServices:UserServices, private cartServices:CartServices,
    private toastr: ToastrService, private _bookServices:BookServices) { }

  ngOnInit(): void {
    this.getFavBooks();
  }

  getFavBooks(){
    this._bookServices.getFavBooks().subscribe(
      (res) => this.favBooks = res.data,
      (e) => this.toastr.error(e.msg)
    )
  }

  deleteFromFavourite(bookId:string){

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
