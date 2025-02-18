import { LucideIcon } from 'lucide-react';
import React from 'react'

type StatCardProps = {
    title: string;
    primaryIcon: React.JSX.Element;
    details: StatDetail[];
    dateRange: string;
};

type StatDetail = {
    title: string;
    amount: string;
    changePercentage: number;
    IconComponent: LucideIcon;
};


const StatCard = ({ title, primaryIcon, details, dateRange }: StatCardProps) => {

    const formatPercentage = (value: number) => {
        const signal = value >= 0 ? "+" : "";
        return `${signal}${value.toFixed()}%`
    }

    const getChangeColor = (value: number) =>
        value >= 0 ? "text-green-500" : "text-red-500";


    return (
        <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between">
            {/* HEADER */}
            <div>
                <div className="flex justify-between items-center mb-2 px-5 pt-4">
                    <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
                    <span className="text-xs text-gray-400">{dateRange}</span>
                </div>
                <hr />
            </div>

            {/* BODY */}
            <div className="flex mb-6 items-center justify-around gap-4 px-5">
                <div className="p-5 rounded-full bg-blue-50 border border-sky-300 ">
                    {primaryIcon}
                </div>
                <div className="flex-1">
                    {details.map((statDetail, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex items-center justify-between my-4">
                                <span className="text-gray-500">{statDetail.title}</span>
                                <span className="font-bold text-gray-800">{statDetail.amount}</span>
                                <div className="flex items-center">
                                    <statDetail.IconComponent
                                        className={`w-5 h-5 mr-2 ${getChangeColor(statDetail.changePercentage)}`}
                                    />

                                    <span className={`font-medium ${getChangeColor(
                                        statDetail.changePercentage
                                    )}`}>
                                        {formatPercentage(statDetail.changePercentage)}
                                    </span>
                                </div>
                            </div>
                            {idx < details.length - 1 && <hr />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StatCard