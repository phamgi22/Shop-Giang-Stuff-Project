import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
	providedIn: 'root'
})
export class CartService {
  
	cartItems: CartItem[] = [];

	// Subject is a subclass of Observalbe: can be used to publish events in our code
	// Event will be sent to all of the subscribers
	totalPrice: Subject<number> = new Subject<number>();
	totalQuantity: Subject<number> = new Subject<number>();

	constructor() { }

	addToCart(theCartItem: CartItem) {

		// check if we already have the item in our cart
		let alreadyExistInCart: boolean = false;
		let existingCartItem: CartItem = undefined!;
		// find the item in the cart based on item id
		//check if we found it

		if (this.cartItems.length > 0) {
			existingCartItem = this.cartItems.find(curItem => curItem.id == theCartItem.id)!;
			alreadyExistInCart = existingCartItem != undefined;
		}
		// check if we found it

		if (alreadyExistInCart) {
			existingCartItem.quantity++;
		} else {
			this.cartItems.push(theCartItem);
		}

		// compute total price and total quantity
		this.computeCartTotals();
	}

	computeCartTotals() {
		let totalPriceValue: number = 0;
		let totalQuantityValue: number = 0;

		for (let item of this.cartItems) {
			totalPriceValue += item.quantity * item.unitPrice;
			totalQuantityValue += item.quantity;
		}
		// publish (.next == publish) a new value of total price and total quantity
		// all subscribers receive new data
		totalPriceValue.toFixed(2);
		this.totalPrice.next(totalPriceValue);
		this.totalQuantity.next(totalQuantityValue);

		// log cart data for debugging
		this.logCartDate(totalPriceValue, totalQuantityValue);
	}
	
	logCartDate(totalPriceValue: number, totalQuantityValue: number) {
		console.log(`Contents of the cart`);
		for (let item of this.cartItems) {
			const subTotalPrice = item.quantity * item.unitPrice;
			console.log(`name: ${item.name}, unitPrice=${item.unitPrice}, subTotalPrice=${subTotalPrice} `);
		}
		// toFixed: show only 2 digit after decimal "."
		console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
		console.log(`------------`)
	}

	decrementQuantity(theCartItem: CartItem) {
		theCartItem.quantity--;
		if (theCartItem.quantity == 0) {
			this.remove(theCartItem);
		} else {
			this.computeCartTotals();
		}
	}

	remove(theCartItem: CartItem) {
		const itemIndex = this.cartItems.findIndex(item => item.id === theCartItem.id);

		// if item index is found, remove item from the array at the found index
		// spice(itemIndex, 1): 1 is the number of item removed
		if (itemIndex > -1) {
			this.cartItems.splice(itemIndex, 1);
			this.computeCartTotals();
		}
	}






}
