"use client";

import React, { useMemo, useState } from 'react'
import Header from '../(components)/Header';
import { ExpenseByCategorySummary, useGetExpensesByCategoryQuery } from '@/state/api';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type AggregatedDataItem = {
    name: string;
    color?: string;
    amount: number;
};

type AggregatedData = {
    [category: string]: AggregatedDataItem;
};

const Expenses = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const { data: expensesData, isLoading, isError } = useGetExpensesByCategoryQuery();
    const expenses = useMemo(() => expensesData ?? [], [expensesData]);

    const parseDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toUTCString().split("T")[0];
    }

    const aggregatedData: AggregatedDataItem[] = useMemo(() => {
        const filtered: AggregatedData = expenses.filter((data: ExpenseByCategorySummary) => {
            const matchesCategory = selectedCategory === "All" || data.category === selectedCategory;
            const dataDate = parseDate(data.date);
            const matchesDate = !startDate || !endDate || (dataDate >= startDate && dataDate <= endDate);
            return matchesCategory && matchesDate;
        }).reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
            const amount = parseInt(data.amount);
            if (!acc[data.category]) {
                acc[data.category] = { name: data.category, amount: 0 };
                acc[data.category].color = `#${Math.floor(
                    Math.random() * 16777215).toString(16)}`;
                acc[data.category].amount += amount;
            }
            return acc;
        }, {});

        return Object.values(filtered);
    }, [expenses, selectedCategory, startDate, endDate]);
    const classNames = {
        label: "block text-sm font-medium text-gray-700",
        input: "mt-1 block w-full py-2 pl-3 pr-10 text-base sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
    };

    if (isLoading) {
        return <div className="py-4">Loading...</div>;
    }

    if (isError || !expensesData) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch expenses
            </div>
        );
    }
    return (
        <div>
            {/* HEADER */}
            <div className="mb-5">
                <Header title="Expenses" />
                <p className="text-sm text-gray-500">
                    A visual representation of expenses over time.
                </p>
            </div>

            {/* FILTERS */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Filter by Category and Date
                    </h3>
                    <div className="space-y-4">

                        {/* CATEGORY */}
                        <div>
                            <label htmlFor="category" className={classNames.label}>Category</label>
                            <select
                                id="category"
                                name="category"
                                className={classNames.input}
                                defaultValue="All"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option>All</option>
                                <option>Office</option>
                                <option>Professional</option>
                                <option>Salaries</option>
                            </select>
                        </div>

                        {/* START DATE */}
                        <div>
                            <label htmlFor="start-date" className={classNames.label}>Start Date</label>
                            <input
                                id="start-date"
                                type="date"
                                name="start-date"
                                className={classNames.input}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        {/* END DATE */}
                        <div>
                            <label htmlFor="end-date" className={classNames.label}>End Date</label>
                            <input
                                id="end-date"
                                type="date"
                                name="end-date"
                                className={classNames.input}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* PIE CHART */}
                <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={aggregatedData}
                                dataKey="amount"
                                cx="50%"
                                cy="50%"
                                label
                                outerRadius={150}
                                fill="#8884d8"
                                onMouseEnter={(_, idx) => setActiveIndex(idx)}
                            >
                                {aggregatedData.map(
                                    (entry: AggregatedDataItem, index: number) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === activeIndex ? "rgb(29, 78, 216)" : entry.color}
                                        />
                                    )
                                )}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Expenses