class Cart {
    items: { productId: string; quantity: number }[] = [];
  
    addItem(productId: string, quantity: number) {
      const existingItem = this.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ productId, quantity });
      }
    }
  
    removeItem(productId: string) {
      this.items = this.items.filter(item => item.productId !== productId);
    }
  
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  }
  
  export default Cart;
  