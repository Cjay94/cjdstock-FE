"use client"

import CardExpenseSummary from "./CardExpenseSummary"
import CardPopularProducts from "./CardPopularProducts"
import CardPurchaseSummary from "./CardPurchaseSummary"
import CardSalesSummary from "./CardSalesSummary"

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
            <CardPopularProducts />
            <CardSalesSummary />
            <CardPurchaseSummary />
            <CardExpenseSummary />
            <div className="bg-blue-500 text-white md:row-span-1 xl:row-span-2">Component 5</div>
            <div className="bg-purple-500 text-white md:row-span-1 xl:row-span-2">Component 6</div>
            <div className="bg-pink-500 text-white md:row-span-1 xl:row-span-2">Component 7</div>
        </div>
    )
}

export default Dashboard