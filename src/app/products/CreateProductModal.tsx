import React, { ChangeEvent, FormEvent, useState } from 'react'
import { v4 } from 'uuid'
import Header from '../(components)/Header'

type CreateProductModelProps = {
    isOpen: boolean
    onCreate: (formData: ProductFormData) => void
    onClose: () => void
}

type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
};

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModelProps) => {
    const [formData, setFormData] = useState({
        productId: v4(),
        name: "",
        price: 0,
        stockQuantity: 0,
        rating: 0,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:
                name === "price" || name === "stockQuantity" || name === "rating"
                    ? parseFloat(value)
                    : value,
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    }

    if (!isOpen) return null;

    const labelStyles = "block text-sm font-medium text-gray-700";
    const inputStyles = "block w-full mb-2 p-2 border-2 border-gray-500 rounded-md";

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto size-full z-20">
            <div className="relative top-20 mx-auto p-5 w-96 border shadow-lg rounded-md bg-white">
                <Header title="Create New Product" />
                <form onSubmit={handleSubmit} className="mt-5">

                    {/* PRODUCT NAME */}
                    <label htmlFor="productName" className={labelStyles}>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        onChange={handleChange}
                        value={formData.name}
                        className={inputStyles}
                        required
                    />

                    {/* PRICE */}
                    <label htmlFor="productPrice" className={labelStyles}>Product Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Product Price"
                        onChange={handleChange}
                        value={formData.price}
                        className={inputStyles}
                        required
                    />

                    {/* STOCK QUANTITY */}
                    <label htmlFor="stockQuantity" className={labelStyles}>
                        Stock Quantity
                    </label>
                    <input
                        type="number"
                        name="stockQuantity"
                        placeholder="Stock Quantity"
                        onChange={handleChange}
                        value={formData.stockQuantity}
                        className={inputStyles}
                        required
                    />

                    {/* RATING */}
                    <label htmlFor="rating" className={labelStyles}>
                        Rating
                    </label>
                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating"
                        onChange={handleChange}
                        value={formData.rating}
                        className={inputStyles}
                        required
                    />

                    {/* CREATE BUTTON */}
                    <button
                        type='submit'
                        className='mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded'
                    >
                        Create
                    </button>

                    {/* CANCEL BUTTON */}
                    <button
                        onClick={onClose}
                        type='button'
                        className='ml-2 px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded '
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateProductModal