declare module 'currency-converter-lt' {
    export default class CurrencyConverter {
        constructor();
        from(currency: string): this;
        to(currency: string): this;
        amount(amount: number): this;
        convert(): Promise<number>;
    }
}
