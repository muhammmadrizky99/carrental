// src/pages/rental.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
// import DefaultLayout from '@/components/Layouts/DefaultLayout';

interface RentalFormData {
  name: string;
  email: string;
  car: string;
  rentalDate: string;
  returnDate: string;
  additionalRequests: string;
}

const Rental: React.FC = () => {
  const [formData, setFormData] = useState<RentalFormData>({
    name: '',
    email: '',
    car: '',
    rentalDate: '',
    returnDate: '',
    additionalRequests: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, car, rentalDate, returnDate } = formData;

    if (!name || !email || !car || !rentalDate || !returnDate) {
      setErrorMessage('All fields are required.');
      return;
    }

    
    try {
      const response = await fetch('/api/rental', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Rental successfully processed!');
        setErrorMessage(''); // Clear previous error messages
      } else {
        setErrorMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('An error occurred, please try again.');
    }
  };

  return (
    // <DefaultLayout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Rental Form</h2>

        {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
        {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Car Model</label>
            <select
              name="car"
              value={formData.car}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a car</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Convertible">Convertible</option>
              <option value="Truck">Truck</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rental Date</label>
            <input
              type="date"
              name="rentalDate"
              value={formData.rentalDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Additional Requests</label>
            <textarea
              name="additionalRequests"
              value={formData.additionalRequests}
              onChange={handleChange}
              placeholder="Any special requests?"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Rental
          </button>
        </form>
      </div>
    // </DefaultLayout>
  );
};

export default Rental;
