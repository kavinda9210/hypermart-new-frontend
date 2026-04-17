import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../../components/Layout'
import './ExportPanel.css'

const ExportPanel = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(() => new Set());
  const [categoryMap, setCategoryMap] = useState(() => new Map());

  const token = useMemo(() => localStorage.getItem('token'), []);

  const loadItems = async () => {
    setLoading(true);
    setError('');
    try {
      const pageLimit = 500;
      let offset = 0;
      let total = null;
      const all = [];

      while (true) {
        const params = new URLSearchParams();
        params.set('limit', String(pageLimit));
        params.set('offset', String(offset));
        if (typeFilter !== 'all') params.set('type_filter', typeFilter);

        const resp = await fetch(`/api/items?${params.toString()}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await resp.json().catch(() => ({}));

        if (resp.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.assign('/');
          return;
        }
        if (!resp.ok) {
          setItems([]);
          setSelected(new Set());
          setError(data?.error || 'Failed to load items.');
          return;
        }

        const chunk = Array.isArray(data?.items) ? data.items : [];
        if (total === null) total = Number(data?.total) || 0;
        all.push(...chunk);

        offset += pageLimit;
        if (all.length >= total) break;
        if (chunk.length === 0) break;
      }

      setItems(all);
      setSelected(new Set());
    } catch {
      setItems([]);
      setSelected(new Set());
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const resp = await fetch('/api/item-categories', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) return;
        const rows = Array.isArray(data?.categories) ? data.categories : [];
        const map = new Map(rows.map((c) => [Number(c.id), String(c.categories || '')]));
        setCategoryMap(map);
      } catch {
        // ignore
      }
    };
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOne = (id) => {
    const key = String(id);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleAll = (checked) => {
    if (!checked) {
      setSelected(new Set());
      return;
    }
    const all = new Set(items.map((it) => String(it.id)));
    setSelected(all);
  };

  const exportSelected = async () => {
    setError('');
    try {
      const ids = Array.from(selected);
      if (ids.length === 0) {
        setError('Please select at least one item.');
        return;
      }

      const resp = await fetch('/api/items/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...(typeFilter === 'all' ? {} : { type_filter: typeFilter }), ids }),
      });

      if (resp.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.assign('/');
        return;
      }

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        setError(data?.error || 'Export failed.');
        return;
      }

      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `items_export_${typeFilter}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setError('Export failed.');
    }
  };

  return (
      <Layout>
    <div className="export-panel-container">
      {/* Breadcrumbs */}
      <nav className="w-full px-12 py-5 max-sm:px-6" aria-label="Breadcrumb">
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
              <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Items</p>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Export Items</p>
            </div>
          </li>
        </ol>
      </nav>
      <div className="export-panel-content">
        {/* Filter Controls */}
        <form className="export-panel-controls mb-6">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="type_filter">Item Type</label>
            <div>
              <select
                name="type_filter"
                id="type_filter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Items</option>
                <option value="scale">Scale Items</option>
                <option value="normal">Normal Items</option>
              </select>
            </div>
          </div>
          <div className="flex items-end gap-2">
            <button type="button" className="export-selected" onClick={exportSelected}>
              <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Export Selected
            </button>
            <button type="button" className="refresh-btn" title="Refresh" onClick={loadItems}>
              <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
        </form>
        {error ? (
          <div className="px-12 max-sm:px-6 -mt-2 mb-4 text-sm text-red-600">{error}</div>
        ) : null}
        {/* Items Table */}
        <div className="export-panel-table-container">
          <table className="export-panel-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    id="selectAll"
                    className="rounded"
                    checked={items.length > 0 && selected.size === items.length}
                    onChange={(e) => toggleAll(e.target.checked)}
                  />
                </th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Retail Price</th>
                <th>Type - (Scale Group No if any)</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="center" style={{ color: '#6b7280', padding: '2rem 0' }}>Loading…</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="center" style={{ color: '#6b7280', padding: '2rem 0' }}>No items found</td>
                </tr>
              ) : (
                items.map((it) => (
                  <tr key={it.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selected.has(String(it.id))}
                        onChange={() => toggleOne(it.id)}
                      />
                    </td>
                    <td>{it.item_code}</td>
                    <td>{it.item_name}</td>
                    <td>{categoryMap.get(Number(it.item_categories_id)) || it.item_categories_id || ''}</td>
                    <td>{it.unit_type_id ?? ''}</td>
                    <td>{it.retail_price ?? ''}</td>
                    <td>{Number(it.scale_item) === 1 ? `Scale - (${it.scale_group_no ?? ''})` : 'Normal'}</td>
                    <td></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default ExportPanel