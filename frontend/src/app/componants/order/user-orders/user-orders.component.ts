import {AfterViewInit, Component,OnInit, ViewChild} from '@angular/core';
import { OrderService } from 'src/app/core/services/order_service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'totalPrice', 'dateCreated', 'delivered'];
  orders:any[]=[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator:any = MatPaginator;

  constructor(private _orderService:OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this._orderService.getUserOrders().subscribe(
      (res)=> {
        this.orders = res.data; 
        this.dataSource = new MatTableDataSource<any>(this.orders.reverse());
        this.dataSource.paginator = this.paginator;
      },
      (e)=> console.log(e.msg)
    )
  }

}
