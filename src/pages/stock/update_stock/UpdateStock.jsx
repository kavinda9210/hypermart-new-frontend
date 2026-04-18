import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../../../components/Layout';
import './updateStock.css';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateStock = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const token = useMemo(() => localStorage.getItem('token'), []);

	const itemId = useMemo(() => {
		const params = new URLSearchParams(location.search || '');
		const id = params.get('id');
		return id ? String(id).trim() : '';
	}, [location.search]);

	const [item, setItem] = useState(null);
	const [updates, setUpdates] = useState([]);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState('');

	const [quantity, setQuantity] = useState('');
	const [purchasePrice, setPurchasePrice] = useState('');
	const [retailPrice, setRetailPrice] = useState('');
	const [wholesalePrice, setWholesalePrice] = useState('');
	const [note, setNote] = useState('');
	const [receivedAt, setReceivedAt] = useState(() => {
		const d = new Date();
		const pad = (n) => String(n).padStart(2, '0');
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
	});

	const ensureToken = () => {
		const t = localStorage.getItem('token');
		if (!t) {
			localStorage.removeItem('user');
			window.location.assign('/');
			return null;
		}
		return t;
	};

	const resetFormToItemDefaults = (nextItem) => {
		setQuantity('');
		setNote('');
		setPurchasePrice(nextItem?.purchase_price != null ? String(nextItem.purchase_price) : '');
		setRetailPrice(nextItem?.retail_price != null ? String(nextItem.retail_price) : '');
		setWholesalePrice(nextItem?.wholesale_price != null ? String(nextItem.wholesale_price) : '');
		const d = new Date();
		const pad = (n) => String(n).padStart(2, '0');
		setReceivedAt(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`);
	};

	useEffect(() => {
		if (!itemId) {
			navigate('/stock/stock');
			return;
		}

		const load = async () => {
			setLoading(true);
			setError('');
			try {
				const t = ensureToken();
				if (!t) return;

				const [itemResp, updatesResp] = await Promise.all([
					fetch(`/api/items/${encodeURIComponent(itemId)}`, { headers: { Authorization: `Bearer ${t}` } }),
					fetch(`/api/stock/${encodeURIComponent(itemId)}/updates`, { headers: { Authorization: `Bearer ${t}` } }),
				]);

				if (itemResp.status === 401 || updatesResp.status === 401) {
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					window.location.assign('/');
					return;
				}

				const itemData = await itemResp.json().catch(() => ({}));
				const updatesData = await updatesResp.json().catch(() => ({}));

				if (!itemResp.ok) {
					setItem(null);
					setUpdates([]);
					setError(itemData?.error || 'Failed to load item.');
					return;
				}

				const nextItem = itemData?.item || null;
				setItem(nextItem);
				resetFormToItemDefaults(nextItem);

				setUpdates(Array.isArray(updatesData?.updates) ? updatesData.updates : []);
			} catch {
				setError('Failed to load data.');
				setItem(null);
				setUpdates([]);
			} finally {
				setLoading(false);
			}
		};

		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		if (!itemId) return;

		const qty = Number(quantity);
		if (!Number.isFinite(qty) || qty <= 0) {
			setError('Please enter a valid stock quantity.');
			return;
		}

		const body = {
			quantity: qty,
			purchase_price: purchasePrice === '' ? undefined : Number(purchasePrice),
			retail_price: retailPrice === '' ? undefined : Number(retailPrice),
			wholesale_price: wholesalePrice === '' ? undefined : Number(wholesalePrice),
			note: note === '' ? undefined : note,
			received_at: receivedAt ? new Date(receivedAt).toISOString() : undefined,
		};

		if (body.purchase_price !== undefined && !Number.isFinite(body.purchase_price)) {
			setError('Invalid purchase price.');
			return;
		}
		if (body.retail_price !== undefined && !Number.isFinite(body.retail_price)) {
			setError('Invalid retail price.');
			return;
		}
		if (body.wholesale_price !== undefined && !Number.isFinite(body.wholesale_price)) {
			setError('Invalid wholesale price.');
			return;
		}

		setSubmitting(true);
		try {
			const t = ensureToken();
			if (!t) return;

			const resp = await fetch(`/api/stock/${encodeURIComponent(itemId)}/updates`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${t}`,
				},
				body: JSON.stringify(body),
			});
			const data = await resp.json().catch(() => ({}));
			if (resp.status === 401) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.location.assign('/');
				return;
			}
			if (!resp.ok) {
				setError(data?.error || 'Failed to add stock.');
				return;
			}

			// Refresh item + updates.
			const [itemResp, updatesResp] = await Promise.all([
				fetch(`/api/items/${encodeURIComponent(itemId)}`, { headers: { Authorization: `Bearer ${t}` } }),
				fetch(`/api/stock/${encodeURIComponent(itemId)}/updates`, { headers: { Authorization: `Bearer ${t}` } }),
			]);
			const itemData = await itemResp.json().catch(() => ({}));
			const updatesData = await updatesResp.json().catch(() => ({}));
			const nextItem = itemData?.item || null;
			setItem(nextItem);
			setUpdates(Array.isArray(updatesData?.updates) ? updatesData.updates : []);
			resetFormToItemDefaults(nextItem);
		} catch {
			setError('Failed to add stock.');
		} finally {
			setSubmitting(false);
		}
	};

	const formatDateTime = (v) => {
		if (!v) return '—';
		const d = new Date(v);
		return Number.isNaN(d.getTime()) ? String(v) : d.toLocaleString();
	};

	return (
		<Layout>
			<div className="min-h-dvh max-lg:h-fit flex flex-col h-fit bg-white">
				{/* Navigation Bar */}
				
				{/* Loading Overlay (UI only) */}
				<div className="loading-overlay" style={{ display: loading || submitting ? 'flex' : 'none' }}>
					<div className="text-center">
						<div className="spinner"></div>
					</div>
				</div>
				{/* Breadcrumbs */}
				<div className="px-6 lg:px-12 py-5 max-sm:px-6">
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
									<p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Stock</p>
								</div>
							</li>
							<li aria-current="page">
								<div className="flex items-center">
									<svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
									</svg>
									<p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Update Stock</p>
								</div>
							</li>
						</ol>
					</nav>
				</div>
				{/* Main Form Panel */}
				<div className="px-6 lg:px-12">
					<div className="flex flex-col flex-grow h-full p-6 border-2 rounded-lg">
						{error ? (
							<p className="mb-4 text-sm text-red-600">{error}</p>
						) : null}
						<form className="w-full" onSubmit={handleSubmit}>
							<div className="grid gap-6 mb-6 md:grid-cols-2">
								<div>
									<label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Item Name</label>
									<input id="name" type="text" value={item?.item_name ?? ''} className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readOnly />
								</div>
								<div>
									<label htmlFor="code" className="block mb-2 text-sm font-medium text-black">Item Code</label>
									<input id="code" type="text" value={item?.item_code ?? ''} className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readOnly />
								</div>
							</div>
							<div className="grid gap-6 mb-6 md:grid-cols-2">
								<div>
									<label htmlFor="minqty" className="block mb-2 text-sm font-medium text-black">Minimum Quantity</label>
									<input id="minqty" type="text" value={item?.minimum_qty ?? ''} className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readOnly />
								</div>
								<div>
									<label htmlFor="cqty" className="block mb-2 text-sm font-medium text-black">Current Quantity</label>
									<input id="cqty" type="text" value={item?.quantity ?? ''} className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readOnly />
								</div>
							</div>
							<div className="grid gap-6 mb-6 md:grid-cols-3">
								<div>
									<label htmlFor="unit_type" className="block mb-2 text-sm font-medium text-black">Unit Type</label>
									<input id="unit_type" type="text" value={item?.unit_type_id ?? ''} className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Unit type" readOnly />
								</div>
								<div>
									<label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black">Stock Quantity *</label>
									<input id="quantity" type="number" min="0.01" step="0.01" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter quantity" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
								</div>
								<div style={{ display: 'none' }} id="exp_date_container" className="flex max-sm:flex-col gap-3">
									<div>
										<label htmlFor="show_expiry_alert_in" className="block mb-2 text-sm font-medium text-black">Show Expiry Alert In</label>
										<input type="number" id="show_expiry_alert_in" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="How many days?" min="1" step="1" />
										<p id="show_expiry_alert_in_error" className="mt-1 text-sm text-red-500"></p>
									</div>
									<div className="w-full">
										<label htmlFor="exp_date" className="block mb-2 text-sm font-medium text-black">Expiry Date</label>
										<input id="exp_date" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
									</div>
								</div>
								<div>
									<label htmlFor="received_at" className="block mb-2 text-sm font-medium text-black">Received Date & Time</label>
									<input id="received_at" type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={receivedAt} onChange={(e) => setReceivedAt(e.target.value)} />
								</div>
							</div>
							<div className="mb-4">
								<h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-1">Stock Batch Pricing</h3>
								<div className="grid gap-6 mb-6 md:grid-cols-3">
									<div>
										<label htmlFor="purchase_price" className="block mb-2 text-sm font-medium text-black">Purchase Price *</label>
										<input type="number" id="purchase_price" step="0.01" min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter purchase price" required value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
									</div>
									<div>
										<label htmlFor="retail_price" className="block mb-2 text-sm font-medium text-black">Retail Price *</label>
										<input type="number" id="retail_price" step="0.01" min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter purchase price" required value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} />
									</div>
									<div>
										<label htmlFor="wholesale_price" className="block mb-2 text-sm font-medium text-black">Wholesale Price</label>
										<input type="number" id="wholesale_price" step="0.01" min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter wholesale price" value={wholesalePrice} onChange={(e) => setWholesalePrice(e.target.value)} />
									</div>
								</div>
							</div>
							<div>
								<label htmlFor="note" className="block mb-2 text-sm font-medium text-black">Note</label>
								<input id="note" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-6" placeholder="Enter note" value={note} onChange={(e) => setNote(e.target.value)} />
							</div>
							{/* Supplier Selection (hidden) */}
							<div className="mb-6 custom-select" style={{ display: 'none' }}>
								<label htmlFor="supplier_id" className="block mb-2 text-sm font-medium text-black">Supplier Selection</label>
								<select id="supplier_id" className="hidden">
									<option value="">Select Supplier</option>
									<option value="1">sample supplier</option>
								</select>
							</div>
							{/* Supplier Invoice (hidden) */}
							<div className="mb-6 custom-select" style={{ display: 'none' }}>
								<label htmlFor="supplier_invoice_id" className="block mb-2 text-sm font-medium text-black">Supplier Invoice</label>
								<select id="supplier_invoice_id" className="hidden">
									<option value="">Select Supplier Invoice (optional)</option>
									<option value="2">758979jbhxgdx - sample supplier | Rs.1200.00</option>
								</select>
							</div>
							{/* Invoice Section (hidden) */}
							<div className="hidden mb-6 border-2 border-dashed border-orange-300 rounded-lg">
								{/* ...Invoice Section UI omitted for brevity... */}
							</div>
							<div className="flex items-center justify-center w-full gap-4 max-sm:flex-col max-sm:p-0">
								<button type="submit" disabled={submitting || loading} className="py-3 px-6 bg-[#029ED9] text-white rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full">Add</button>
								<button
									type="button"
									disabled={submitting || loading}
									className="px-6 py-3 text-white bg-[#3c8c2c] rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full"
									onClick={() => resetFormToItemDefaults(item)}
								>
									Reset
								</button>
								<button type="button" className="px-6 py-3 text-white bg-red-600 rounded-lg max-sm:py-1 max-sm:px-3 max-sm:w-full" onClick={() => navigate('/stock/stock')}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
				{/* Table Section */}
				<div className="flex flex-col flex-grow px-12 py-5 overflow-y-auto bg-white max-sm:px-6 max-lg:min-h-full">
					<span></span>
					<div className="relative overflow-x-auto">
						<table className="w-full text-sm text-left text-gray-500 rtl:text-right">
							<thead className="text-xs text-white uppercase bg-[#3c8c2c]">
								<tr>
									<th className="px-6 py-3 rounded-tl-lg">#</th>
									<th className="px-6 py-3">Item Code</th>
									<th className="px-6 py-3">Item Name</th>
									<th className="px-6 py-3">Batch No</th>
									<th className="px-6 py-3">Batch Qty</th>
									<th className="px-6 py-3">Remaining</th>
									<th className="px-6 py-3">Purchase Price</th>
									<th className="px-6 py-3">Retail Price</th>
									<th className="px-6 py-3">Wholesale Price</th>
									<th className="px-6 py-3">Supplier</th>
									<th className="px-6 py-3">Invoice Ref</th>
									<th className="px-6 py-3">Expiry Date</th>
									<th className="px-6 py-3">Received At</th>
									<th className="px-6 py-3 rounded-tr-lg">Note</th>
								</tr>
							</thead>
							<tbody>
								{updates.length === 0 ? (
									<tr className="text-black bg-white border-2">
										<td className="px-6 py-4 text-center" colSpan={14}>No stock updates found</td>
									</tr>
								) : updates.map((u, idx) => (
									<tr key={u.id ?? idx} className="text-black bg-white border-2">
										<td className="px-6 py-4 font-medium whitespace-nowrap">{updates.length - idx}</td>
										<td className="px-6 py-4">{item?.item_code ?? '—'}</td>
										<td className="px-6 py-4">{item?.item_name ?? '—'}</td>
										<td className="px-6 py-4">{u.batch_no || '—'}</td>
										<td className="px-6 py-4">{u.stock ?? '—'}</td>
										<td className="px-6 py-4"><span className="text-green-700 font-semibold">{u.remaining_stock ?? '—'}</span></td>
										<td className="px-6 py-4">{u.purchase_price ?? '—'}</td>
										<td className="px-6 py-4 font-semibold text-blue-700">{u.retail_price ?? '—'}</td>
										<td className="px-6 py-4">{u.wholesale_price ?? '—'}</td>
										<td className="px-6 py-4">{u.supplier_name || '—'}</td>
										<td className="px-6 py-4">{u.invoice_ref || u.supplier_invoice_reference_number || u.supplier_invoice_code || '—'}</td>
										<td className="px-6 py-4">{u.exp_date || '—'}</td>
										<td className="px-6 py-4">{formatDateTime(u.received_at || u.created_at)}</td>
										<td className="px-6 py-4">{u.note || '—'}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Footer */}
				
			</div>
		</Layout>
	);
};

export default UpdateStock;
