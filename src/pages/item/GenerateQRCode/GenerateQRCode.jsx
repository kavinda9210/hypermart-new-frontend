import React, { useEffect, useMemo, useRef, useState } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import Layout from '../../../components/Layout';

import './GenerateQRCode.css';

// Served by Vite from /public (always available even if backend is down).
const DEFAULT_ITEM_IMAGE = '/images/upload/default.png';

function normalizeImageSrc(src) {
  const value = String(src || '').trim();
  if (!value) return DEFAULT_ITEM_IMAGE;
  if (value.startsWith('data:')) return value;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;

  // Handle absolute server path stored in DB (legacy/incorrect)
  // e.g. backend\hypermart-new-backend\public\images\upload\items\file.jpg
  const absMatch = value.match(/[\\/]images[\\/]upload[\\/]items[\\/](.+)$/i);
  if (absMatch?.[1]) return `/upload/items/${absMatch[1].replace(/^[\\/]+/, '')}`;

  // Correct already-good paths
  if (value.startsWith('/upload/items/')) return value;
  if (value.startsWith('upload/items/')) return `/${value}`;

  // Convert /images/upload/items/... -> /upload/items/...
  if (value.startsWith('/images/upload/items/')) return value.replace('/images/upload/items/', '/upload/items/');
  if (value.startsWith('images/upload/items/')) return `/${value}`.replace('/images/upload/items/', '/upload/items/');

  // If it's just a filename, assume it's in /upload/items/
  if (/^[^/\\]+\.(jpg|jpeg|png|gif|webp)$/i.test(value)) return `/upload/items/${value}`;

  return DEFAULT_ITEM_IMAGE;
}

const GenerateQRCode = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Generated Code');
  const [codeImage, setCodeImage] = useState(null);
  const [codeType, setCodeType] = useState('qr');
  const barcodeImageRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil((total || 0) / entries));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const offset = total === 0 ? 0 : (safePage - 1) * entries;

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxButtons = 5;
    const last = totalPages;
    const current = safePage;
    let start = Math.max(1, current - Math.floor(maxButtons / 2));
    let end = Math.min(last, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    for (let p = start; p <= end; p += 1) pages.push(p);
    return pages;
  }, [safePage, totalPages]);

  // Fetch items from backend with pagination and search (backend supports limit+offset)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const params = new URLSearchParams();
        params.set('limit', String(entries));
        params.set('offset', String(offset));
        if (search.trim()) params.set('search', search.trim());

        const res = await fetch(`/api/items?${params.toString()}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error('Failed to fetch items');
        const data = await res.json();
        setItems(Array.isArray(data.items) ? data.items : []);
        setTotal(Number(data.total) || 0);
      } catch {
        setItems([]);
        setTotal(0);
      }
    };

    fetchItems();
  }, [entries, offset, search]);

  const goToPage = (page) => {
    const next = Number(page);
    if (!Number.isFinite(next)) return;
    if (next < 1 || next > totalPages) return;
    setCurrentPage(next);
  };

  const goToPrev = () => goToPage(safePage - 1);
  const goToNext = () => goToPage(safePage + 1);

  const openQrModal = async (itemCode) => {
    const fullURL = `https://hypermart-new.onlinesytems.com/ItemDetails/${itemCode}`;
    const url = await QRCode.toDataURL(fullURL, { width: 200, height: 200 });
    setModalTitle(`QR Code for ${itemCode}`);
    setCodeType('qr');
    setCodeImage(url);
    setModalOpen(true);
  };

  const openBarcodeModal = async (itemCode) => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, itemCode, {
      format: 'CODE128',
      width: 2,
      height: 100,
      displayValue: true,
    });
    const url = canvas.toDataURL('image/png');
    setModalTitle(`Barcode for ${itemCode}`);
    setCodeType('barcode');
    setCodeImage(url);
    setModalOpen(true);
  };

  const handlePrintItemCard = (item) => {
    let w;
    try {
      const itemCode = String(item?.item_code || '').trim();
      if (!itemCode) return;

      // Open first (avoids popup blockers). Keep features minimal so we can write into it.
      w = window.open('', '_blank', 'width=700,height=900');
      if (!w) return;

      // Quick placeholder so you never get an empty about:blank.
      w.document.open();
      w.document.write('<!doctype html><title>Preparing…</title><p style="font-family:Arial; padding:16px;">Preparing item card…</p>');
      w.document.close();

      const canvas = document.createElement('canvas');
      JsBarcode(canvas, itemCode, {
        format: 'CODE128',
        width: 2,
        height: 80,
        displayValue: true,
      });
      const barcodeUrl = canvas.toDataURL('image/png');

      const name = String(item?.item_name || '').trim();
      const normalizedImage = normalizeImageSrc(item?.image_path);
      const imageUrl = normalizedImage.startsWith('/')
        ? `${window.location.origin}${normalizedImage}`
        : normalizedImage;
      const fallbackImageUrl = `${window.location.origin}${DEFAULT_ITEM_IMAGE}`;

      w.document.open();
      w.document.write(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Item Card - ${itemCode}</title>
            <style>
              body { font-family: Helvetica, Arial, sans-serif; margin: 24px; }
              .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; width: 320px; }
              .row { display: flex; gap: 12px; align-items: center; }
              .img { width: 64px; height: 64px; border-radius: 8px; object-fit: cover; border: 1px solid #eee; }
              .name { font-size: 16px; font-weight: 700; margin: 0; }
              .code { font-size: 13px; margin: 4px 0 0 0; color: #444; }
              .barcode { margin-top: 12px; width: 100%; }
              @media print {
                body { margin: 0; }
                .card { border: none; }
              }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="row">
                <img class="img" src="${imageUrl}" alt="${name || itemCode}" onerror="this.onerror=null;this.src='${fallbackImageUrl}';" />
                <div>
                  <p class="name">${name || 'Item'}</p>
                  <p class="code">Code: ${itemCode}</p>
                </div>
              </div>
              <img class="barcode" src="${barcodeUrl}" alt="Barcode ${itemCode}" />
            </div>
            <script>
              window.onload = function () {
                setTimeout(function () { window.print(); }, 250);
              };
            </script>
          </body>
        </html>
      `);
      w.document.close();
    } catch (e) {
      try { if (w && !w.closed) w.close(); } catch { /* ignore */ }
    }
  };

  const downloadCurrentCode = () => {
    if (!codeImage) return;
    const link = document.createElement('a');
    link.href = codeImage;
    link.download = `${modalTitle.replace(/\s+/g, '_')}.png`;
    link.click();
    setModalOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch('');
    setEntries(10);
    setCurrentPage(1);
  };

  const handleShowEntries = (event) => {
    const nextValue = Number(event.target.value);
    setEntries(Number.isFinite(nextValue) && nextValue > 0 ? nextValue : 10);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-dvh h-dvh bg-white font-sans qr-page">
        <div id="loading-overlay" className="loading-overlay" style={{ display: 'none' }}>
          <div className="text-center">
            <div className="spinner" />
          </div>
        </div>

        <div className="flex flex-col h-[90%]">
        <div className="px-12 py-1 max-sm:px-6">
          <nav className="flex justify-between w-full" aria-label="Breadcrumb">
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
                  <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">QR/Barcode</p>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex items-center w-full gap-3 px-6 py-1 max-sm:px-4 max-md:flex-wrap">
          <label htmlFor="searchItemName" className="text-xs">Search</label>
          <div className="flex items-center justify-between px-4 py-2">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                name="search"
                id="searchItemName"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg md:p-3 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter item name"
              />
              <button type="submit" className="py-2 md:py-3 px-4 md:px-6 bg-[#47891E] text-white rounded-lg text-sm md:text-base">
                Search
              </button>
            </form>
          </div>
          <button type="button" className="py-2 md:py-3 px-4 md:px-6 bg-[#000000] text-white rounded-lg text-sm md:text-base" onClick={handleReset}>
            Reset
          </button>
          <span className="flex items-center gap-3 w-fit max-md:w-full">
            <input
              type="number"
              id="col_num"
              value={entries}
              onChange={handleShowEntries}
              className="block w-full p-2 text-xs text-gray-900 border border-gray-300 rounded-lg md:p-3 md:text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
              min="1"
            />
            Entries
          </span>
        </div>

        <div className="px-6 lg:px-12" />

        <div className="flex flex-col px-12 py-1 overflow-y-auto bg-white max-sm:px-6">
          {/* Entries and Page controls (like item list page) */}
          <div className="flex items-center justify-end gap-3 mb-2">
            <label className="text-sm text-gray-700">Entries</label>
            <select
              className="p-2 text-sm border border-gray-300 rounded bg-white"
              value={entries}
              onChange={handleShowEntries}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <label className="text-sm text-gray-700 ml-2">Page</label>
            <input
              type="number"
              min={1}
              max={totalPages}
              className="w-20 p-2 text-sm border border-gray-300 rounded bg-white"
              value={safePage}
              onChange={e => {
                const val = Number(e.target.value);
                if (val >= 1 && val <= totalPages) setCurrentPage(val);
              }}
            />
          </div>
          <div className="relative overflow-x-auto">
            <div id="codeModal" className={`fixed inset-0 z-50 flex items-center justify-center ${modalOpen ? '' : 'hidden'} bg-gray-500 bg-opacity-50`}>
              <div className="p-5 bg-white rounded-lg">
                <h2 id="modalTitle" className="mb-4 text-xl">{modalTitle}</h2>
                <div id="codeContainer" className="flex items-center justify-center mb-4">
                  {codeImage ? (
                    <img ref={barcodeImageRef} src={codeImage} alt={codeType === 'qr' ? 'QR Code' : 'Barcode'} />
                  ) : null}
                </div>
                <button id="downloadBtn" type="button" className="p-2 text-white bg-blue-600 rounded-lg" onClick={downloadCurrentCode}>
                  Download
                </button>
                <button id="closeModalBtn" type="button" className="p-2 mt-2 text-white bg-gray-600 rounded-lg block" onClick={() => setModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>

            <table id="itemsTable" className="w-full text-sm text-left text-gray-500 rtl:text-right">
              <thead className="text-xs text-white uppercase bg-[#47891E]">
                <tr>
                  <th scope="col" className="px-4 py-2 rounded-tl-lg sticky top-0 z-10 bg-[#47891E]">#</th>
                  <th scope="col" className="px-4 py-2 sticky top-0 z-10 bg-[#47891E]">Item image</th>
                  <th scope="col" className="px-4 py-2 sticky top-0 z-10 bg-[#47891E]">Item Name</th>
                  <th scope="col" className="px-4 py-2 sticky top-0 z-10 bg-[#47891E]">Item Code</th>
                  <th scope="col" className="px-4 py-2 sticky top-0 z-10 bg-[#47891E]">Qty</th>
                  <th scope="col" className="px-4 py-2 sticky top-0 z-10 bg-[#47891E]">Category</th>
                  <th scope="col" className="px-4 py-2 sticky top-0 z-10 bg-[#47891E]">SubCategory</th>
                  <th scope="col" className="px-4 py-2 sticky top-0 z-10 bg-[#47891E]">Status</th>
                  <th scope="col" className="px-4 py-2 rounded-tr-lg sticky top-0 z-10 bg-[#47891E]">Manage</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-400">No items in the list</td>
                  </tr>
                ) : items.map((item, index) => (
                  <tr key={item.id || item.item_code || index} className="text-black bg-white border-2">
                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">{offset + index + 1}</td>
                    <td>
                      <img
                        src={normalizeImageSrc(item.image_path)}
                        alt={item.item_name}
                        style={{ width: '40px', height: '40px', borderRadius: '50px' }}
                      />
                    </td>
                    <td className="px-4 py-2 item-name">{item.item_name}</td>
                    <td className="px-4 py-2">{item.item_code}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.category || item.item_categories_id || ''}</td>
                    <td className="px-4 py-2">{item.subCategory || ''}</td>
                    <td className="px-4 py-2">{item.status_id === 1 ? 'In Stock' : 'Out Of Stock'}</td>
                    <td className="px-4 py-2">
                      <button type="button" className="p-2 text-white bg-[#3c8c2c] border-2 rounded-lg qr-code-btn mr-2" onClick={() => openQrModal(item.item_code)}>
                        QR Code
                      </button>
                      <button type="button" className="p-2 text-white bg-[#3c8c2c] border-2 rounded-lg barcode-btn mr-2" onClick={() => openBarcodeModal(item.item_code)}>
                        Barcode
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePrintItemCard(item)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 inline-block"
                      >
                        Print Item Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center p-1 mt-1 mb-6">
          <div className="pagination w-full">
            <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
              {/* Results summary */}
              <div>
                <p className="text-sm leading-5 text-gray-700">
                  Showing <span className="font-medium">{total === 0 ? 0 : offset + 1}</span>
                  {' '}to <span className="font-medium">{total === 0 ? 0 : Math.min(offset + items.length, total)}</span>
                  {' '}of <span className="font-medium">{total}</span> results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="&laquo; Previous"
                  disabled={safePage <= 1}
                  onClick={goToPrev}
                  className={
                    `relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 border border-gray-300 rounded-l-md ` +
                    (safePage <= 1 ? 'text-gray-400 bg-white cursor-default' : 'text-gray-700 bg-white hover:bg-gray-50')
                  }
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                {pageNumbers.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => goToPage(p)}
                    className={
                      `relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 border ` +
                      (p === safePage
                        ? 'text-white bg-blue-600 border-blue-600 cursor-default'
                        : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50')
                    }
                    aria-label={`Go to page ${p}`}
                    disabled={p === safePage}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next &raquo;"
                  disabled={safePage >= totalPages}
                  onClick={goToNext}
                  className={
                    `relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 border border-gray-300 rounded-r-md ` +
                    (safePage >= totalPages ? 'text-gray-400 bg-white cursor-default' : 'text-gray-700 bg-white hover:bg-gray-50')
                  }
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default GenerateQRCode;