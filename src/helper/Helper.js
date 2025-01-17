export class Helper {
    static log=(msg, data)=>{
        console.log(`----------${msg}========>>>`,JSON.stringify(data));
    }

    static getPrice = (price) => {
        const symbol = "R";
        const formattedPrice = new Intl.NumberFormat('en-ZA').format(price);
        return `${symbol}${formattedPrice}`;
    };
}