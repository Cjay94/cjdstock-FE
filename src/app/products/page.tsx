"use client";

import { useGetProductsQuery } from '@/state/api';
import { PlusCircleIcon, Search } from 'lucide-react';
import React, { useState } from 'react'
import Header from '../(components)/Header';
import Rating from '../(components)/Rating';
import Image from 'next/image';

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: products, isLoading, isError } = useGetProductsQuery(searchTerm);

    if (isLoading) {
        return <div className="py-4">Loading...</div>;
    }

    if (isError || !products) {
        return (
            <div className="text-center text-red-500 py-4">
                Failed to fetch products
            </div>
        );
    }

    return (
        <div className="mx-auto pb-5 w-full">
            {/* SEARCH BAR */}
            <div className="mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded">
                    <Search className="size-5 text-gray-500 m-2" />
                    <input
                        className="w-full py-2 px-4 rounded bg-white"
                        placeholder="Search Products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>


            {/* HEADER BAR */}
            <div className="flex justify-between items-center mb-6">
                <Header title='Products' />
                <button
                    className='flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded'
                >
                    <PlusCircleIcon
                        className='size-5 mr-2 !text-grey-200'
                    />
                    Create Product
                </button>
            </div>

            {/* BODY PRODUCTS LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    products?.map((product, idx) => (
                        <div
                            key={idx}
                            className="border shadow rounded-md p-4 w-full max-w-full mx-auto"
                        >
                            <div className="flex flex-col items-center">
                                <Image
                                    src={`/product${Math.floor(Math.random() * 3) + 1}.png`}
                                    alt={product.name}
                                    width={150}
                                    height={150}
                                    className='mb-3 rounded-2xl size-36'
                                />

                                <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                                <p className="text-gray-800">R {product.price.toFixed(2)}</p>
                                <div className="text-sm text-gray-600 mt-1">
                                    Stock: {product.stockQuantity}
                                </div>
                                {product.rating && (
                                    <div className="flex items-center mt-2">
                                        <Rating rating={product.rating} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* MODAL */}
        </div>
    )
}

export default Products