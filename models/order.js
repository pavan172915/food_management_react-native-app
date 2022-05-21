import moment from "moment";
export default class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
  get readableDate() {
    return moment(this.date).format('MMMM DD YYYY,hh:mm');
  }
}
