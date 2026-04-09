
import React from 'react';
import Layout from '../../../components/Layout';
import './PaymentDetails.css';

const PaymentDetails = () => {
	return (
		<Layout>
			{/* Loading Overlay (UI only) */}
			<div className="loading-overlay" style={{ display: 'none' }}>
				<div className="text-center">
					<div className="spinner"></div>
				</div>
			</div>
			<div className="flex flex-col flex-grow">
				{/* Breadcrumbs */}
				<div className="px-12 py-5 max-sm:px-6">
					<nav className="flex" aria-label="Breadcrumb">
						<ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
							<li className="inline-flex items-center">
								<p className="inline-flex items-center text-sm font-medium text-gray-700">
									<svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
									</svg>
									Main Panel
								</p>
							</li>
							<li>
								<div className="flex items-center">
									<svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
									</svg>
									<p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Sales</p>
								</div>
							</li>
							<li aria-current="page">
								<div className="flex items-center">
									<svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
									</svg>
									<p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Sales Details</p>
								</div>
							</li>
						</ol>
					</nav>
				</div>
				{/* Payment Details Card (UI only, static) */}
				<div className="px-12 py-6 max-sm:px-6">
					<div className="p-8 mx-auto bg-white shadow-xl rounded-2xl max-w-7xl">
						<div className="flex justify-between mb-6 max-md:flex-col gap-4">
							<h1 className="text-3xl font-semibold text-gray-800">Payment Details</h1>
							<div className="flex flex-wrap gap-2">
								<button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">Print Receipt</button>
								<button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none">View Customer Invoice</button>
							</div>
						</div>
						{/* Sale Info */}
						<div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
							<div className="space-y-4">
								<h2 className="text-lg font-medium text-gray-700">Sale Information</h2>
								<p><strong>Sale Code:</strong> SALE-69D3710786916</p>
								<p><strong>Sale ID:</strong> a17a4258-2d48-4187-86c3-e2207f71ebff</p>
								<p><strong>Customer:</strong> Customer</p>
								<p><strong>Sales Person:</strong> Admin</p>
								<p><strong>Payment ID:</strong> a17a4258-3511-49a7-acb9-b92233de18e9</p>
								<p><strong>Date:</strong> 06 Apr 2026</p>
							</div>
							<div className="space-y-4">
								<h2 className="text-lg font-medium text-gray-700">Payment Summary</h2>
								<p><strong>Original Amount:</strong> 1,200.00</p>
								<p><strong>Total Paid:</strong> 1,200.00</p>
								<p><strong>Remaining Due:</strong> 0.00</p>
								<p><strong>Status:</strong> <span className="text-green-600">PAID</span></p>
							</div>
						</div>
						{/* Purchased Items */}
						<div className="mt-6">
							<h2 className="mb-4 text-lg font-medium text-gray-700">Purchased Items</h2>
							<div className="overflow-x-auto shadow-sm rounded-xl">
								<table className="min-w-full bg-white border border-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Item</th>
											<th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Quantity</th>
											<th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Sold Price</th>
											<th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Returns</th>
											<th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										<tr className="hover:bg-gray-100">
											<td className="px-6 py-4">11*5(large)</td>
											<td className="px-6 py-4">1</td>
											<td className="px-6 py-4">1200.00</td>
											<td className="px-6 py-4">0</td>
											<td className="px-6 py-4"></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PaymentDetails;
