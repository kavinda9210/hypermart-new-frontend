import React, { useEffect, useMemo, useState } from 'react';
import './ReturnListView.css';
import Layout from '../../../components/Layout';

const ReturnListView = () => {
	const token = useMemo(() => localStorage.getItem('token'), []);

	const ensureToken = () => {
		const t = localStorage.getItem('token');
		if (!t) {
			localStorage.removeItem('user');
			window.location.assign('/');
			return null;
		}
		return t;
	};

	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('');
	const [returns, setReturns] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const loadReturns = async () => {
			setLoading(true);
			setError('');
			try {
				const t = ensureToken();
				if (!t) return;
				const params = new URLSearchParams();
				if (query && query.trim()) params.set('sale_code', query.trim());
				const url = `/api/sales/returns${params.toString() ? `?${params.toString()}` : ''}`;
				const resp = await fetch(url, { headers: { Authorization: `Bearer ${t}` } });
				const data = await resp.json().catch(() => ({}));
				if (resp.status === 401) {
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					window.location.assign('/');
					return;
				}
				setReturns(Array.isArray(data?.returns) ? data.returns : []);
			} catch {
				setError('Failed to load return history.');
				setReturns([]);
			} finally {
				setLoading(false);
			}
		};
		loadReturns();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, token]);

	const groupedReturns = useMemo(() => {
		const map = new Map();
		for (const row of returns) {
			const code = row?.sales_code || 'UNKNOWN';
			if (!map.has(code)) map.set(code, []);
			map.get(code).push(row);
		}
		return Array.from(map.entries());
	}, [returns]);

	const formatRefund = (refund) => {
		if (refund === null || refund === undefined || refund === '') return '';
		const n = Number(refund);
		if (Number.isFinite(n)) return `Rs. ${n}`;
		return String(refund);
	};

	return (
		<Layout>
		<div className="flex flex-col flex-grow bg-white">
			{/* Navigation Bar */}
			
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
								<p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Return List View</p>
							</div>
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
				<button
					className="py-3 px-6 bg-[#3c8c2c] text-white rounded-lg text-nowrap"
					onClick={() => setQuery(search)}
					type="button"
				>
					Search Sale
				</button>
				<button
					className="py-3 px-6 bg-gray-500 text-white rounded-lg"
					onClick={() => {
						setSearch('');
						setQuery('');
					}}
					type="button"
				>
					Clear
				</button>
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
							{loading ? (
								<tr>
									<td className="px-6 py-6 text-center" colSpan={7}>Loading…</td>
								</tr>
							) : error ? (
								<tr>
									<td className="px-6 py-6 text-center text-red-600" colSpan={7}>{error}</td>
								</tr>
							) : groupedReturns.length === 0 ? (
								<tr>
									<td className="px-6 py-6 text-center" colSpan={7}>No return history found</td>
								</tr>
							) : (
								groupedReturns.map(([saleCode, rows]) => (
									<React.Fragment key={saleCode}>
										<tr>
											<td className="px-6 py-4 font-semibold bg-gray-100" colSpan={7}>{saleCode}</td>
										</tr>
										{rows.map((row) => (
											<tr key={row.return_id} className="text-black bg-white border-b">
												<td className="px-6 py-4"></td>
												<td className="px-6 py-4">{row.date}</td>
												<td className="px-6 py-4">{row.customer_name}</td>
												<td className="px-6 py-4">{row.item_name}</td>
												<td className="px-6 py-4">{row.qty ?? ''}</td>
												<td className="px-6 py-4">{row.returned ?? ''}</td>
												<td className="px-6 py-4">{formatRefund(row.refund)}</td>
											</tr>
										))}
									</React.Fragment>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
			
		</div>
        </Layout>
	);
};

export default ReturnListView;
