export const  moneyFormant = (price: number) => {

   const USDollar   =  new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return USDollar.format(price)
} 