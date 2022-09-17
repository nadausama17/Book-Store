import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order_service';

@Component({
  selector: 'app-user-single-order',
  templateUrl: './user-single-order.component.html',
  styleUrls: ['./user-single-order.component.css']
})
export class UserSingleOrderComponent implements OnInit {

  orderId:string = "";
  order:Order | undefined;
  baseUrlImg:string = "http://localhost:3000/images/";

  constructor(private _orderService:OrderService, private _router:Router,
    private _activatedRoute:ActivatedRoute, private _toast:ToastrService) { }

  ngOnInit(): void {
    this.orderId = this._activatedRoute.snapshot.params["orderId"];
    this.getUserOrder(this.orderId);
  }

  getUserOrder(orderId:string){
    this._orderService.getUserSingleOrder(orderId).subscribe(
      (res)=> this.order = res.data,
      (e)=> console.log(e),
    )
  }

  cancelOrder(orderId:string){
    this._orderService.cancelOrder(orderId).subscribe(
      (res)=> {
        this._router.navigateByUrl('/myorders');
        this._toast.success(res.msg)
      },
      (e)=> this._toast.error(e.msg)
    )
  }

}
