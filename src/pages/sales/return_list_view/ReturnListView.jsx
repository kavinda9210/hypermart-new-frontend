import React, { useState } from 'react';
import './ReturnListView.css';
import Layout from '../../../components/Layout';

const mockReturnHistory = [
	{
		saleCode: 'SALE-69CBA6F433883',
		date: '2026-04-06',
		customer: 'Customer',
		item: '11*5(large)',
		qty: 1,
		returned: 1,
		refund: 'Rs. 1500',
	},
];

const ReturnListView = () => {
	// UI state for search and refund logic (static for now)
	const [search, setSearch] = useState('');

	return (
        <Layout>
		<div className="min-h-dvh max-lg:h-fit flex flex-col h-dvh bg-gray-100">
			{/* Navigation Bar */}
			
			{/* Breadcrumbs */}
			<div className="px-12 py-5 max-sm:px-6">
				<nav className="flex" aria-label="Breadcrumb">
					<ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
						<li className="inline-flex items-center">
							<p className="inline-flex items-center text-sm font-medium text-gray-700">Main Panel</p>
						</li>
						<li>
							<div className="flex items-center">Sales</div>
						</li>
						<li aria-current="page">
							<div className="flex items-center">Return List View</div>
						</li>
					</ol>
				</nav>
			</div>
			{/* Search Section */}
			<div className="flex items-center w-1/2 gap-3 px-12 py-5 max-sm:px-6 max-md:w-full">
				<input
					type="text"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					placeholder="Enter sale code to search for refund"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<button className="py-3 px-6 bg-[#3c8c2c] text-white rounded-lg text-nowrap">Search Sale</button>
				<button className="py-3 px-6 bg-gray-500 text-white rounded-lg">Clear</button>
			</div>
			{/* Sale Details Section (hidden by default) */}
			{/* ...omitted for brevity, can be added as needed... */}
			{/* Return History Table */}
			<div className="flex flex-col px-12 py-5 overflow-y-auto bg-white max-sm:px-6 max-lg:min-h-full">
				<h3 className="text-lg font-semibold mb-4">Return History</h3>
				<div className="relative h-[400px] overflow-x-auto">
					<table className="w-full text-sm text-left text-gray-500 rtl:text-right">
						<thead className="text-xs text-white uppercase bg-[#3c8c2c]">
							<tr>
								<th className="px-6 py-4">Sale Code</th>
								<th className="px-6 py-4">Date</th>
								<th className="px-6 py-4">Customer</th>
								<th className="px-6 py-4">Item</th>
								<th className="px-6 py-4">Qty</th>
								<th className="px-6 py-4">Returned</th>
								<th className="px-6 py-4">Refund</th>
							</tr>
						</thead>
						<tbody>
							{mockReturnHistory.map((row, idx) => (
								<tr key={idx}>
									<td className="px-6 py-4 font-semibold bg-gray-100" colSpan={7}>{row.saleCode}</td>
								</tr>
							))}
							<tr>
								<td className="px-6 py-4">SALE-69CBA6F433883</td>
								<td className="px-6 py-4">2026-04-06</td>
								<td className="px-6 py-4">Customer</td>
								<td className="px-6 py-4">11*5(large)</td>
								<td className="px-6 py-4">1</td>
								<td className="px-6 py-4">1</td>
								<td className="px-6 py-4">Rs. 1500</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			
		</div>
        </Layout>
	);
};

export default ReturnListView;
