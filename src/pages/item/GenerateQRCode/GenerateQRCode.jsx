import React, { useMemo, useRef, useState } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import Layout from '../../../components/Layout';
import './GenerateQRCode.css';

const initialItems = [
  { id: 1, item_code: '1001', item_name: 'test', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
  { id: 2, item_code: '1002', item_name: 'Ratthi milk powder(200g) box', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
  { id: 3, item_code: '1003', item_name: '10*5(medium bag)', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
  { id: 4, item_code: '1004', item_name: '11*5(large bag)', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
  { id: 5, item_code: '1005', item_name: '11*5(large)', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
  { id: 6, item_code: '1006', item_name: '14*16(jumbo bag)', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
  { id: 7, item_code: '1007', item_name: '16*16(lunch sheet)', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
  { id: 8, item_code: '1008', item_name: '16*20(king jumbo bag)', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
  { id: 9, item_code: '1009', item_name: '4rever Fair & beauty25g', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
  { id: 10, item_code: '1010', item_name: '4rever foot cream 100g', qty: 10000, category: 'sample category', subCategory: 'N/A', status: 'In Stock', image: '/images/upload/default.png' },
];

const rowsPerPage = 10;

const GenerateQRCode = () => {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Generated Code');
  const [codeImage, setCodeImage] = useState('');
  const [codeType, setCodeType] = useState('qr');
  const barcodeImageRef = useRef(null);

  const filteredItems = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return initialItems;
    return initialItems.filter((item) => item.item_name.toLowerCase().includes(value));
  }, [search]);

  const totalPages = 1;
  const visibleItems = filteredItems.slice(0, 1);

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
                required
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
              required
            />
            Entries
          </span>
        </div>

        <div className="px-6 lg:px-12" />

        <div className="flex flex-col px-12 py-1 overflow-y-auto bg-white max-sm:px-6">
          <div className="relative overflow-x-auto">
            <div id="codeModal" className={`fixed inset-0 z-50 flex items-center justify-center ${modalOpen ? '' : 'hidden'} bg-gray-500 bg-opacity-50`}>
              <div className="p-5 bg-white rounded-lg">
                <h2 id="modalTitle" className="mb-4 text-xl">{modalTitle}</h2>
                <div id="codeContainer" className="flex items-center justify-center mb-4">
                  <img ref={barcodeImageRef} src={codeImage} alt={codeType === 'qr' ? 'QR Code' : 'Barcode'} />
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
                  <th scope="col" className="px-4 py-2 rounded-tl-lg">#</th>
                  <th scope="col" className="px-4 py-2">Item image</th>
                  <th scope="col" className="px-4 py-2">Item Name</th>
                  <th scope="col" className="px-4 py-2">Item Code</th>
                  <th scope="col" className="px-4 py-2">Qty</th>
                  <th scope="col" className="px-4 py-2">Category</th>
                  <th scope="col" className="px-4 py-2">SubCategory</th>
                  <th scope="col" className="px-4 py-2">Status</th>
                  <th scope="col" className="px-4 py-2 rounded-tr-lg">Manage</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((item, index) => (
                  <tr key={item.id} className="text-black bg-white border-2">
                    <td scope="row" className="px-4 py-2 font-medium whitespace-nowrap">{index + 1}</td>
                    <td>
                      <img src={item.image} alt={item.item_name} style={{ width: '40px', height: '40px', borderRadius: '50px' }} />
                    </td>
                    <td className="px-4 py-2 item-name">{item.item_name}</td>
                    <td className="px-4 py-2">{item.item_code}</td>
                    <td className="px-4 py-2">{item.qty}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">{item.subCategory}</td>
                    <td className="hidden px-4 py-2">1</td>
                    <td className="px-4 py-2">
                      <span style={{ padding: '5px 10px', border: '1px solid green', borderRadius: '5px', backgroundColor: 'transparent', color: 'green', cursor: 'pointer' }}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button type="button" className="p-2 text-white bg-[#3c8c2c] border-2 rounded-lg qr-code-btn mr-2" onClick={() => openQrModal(item.item_code)}>
                        QR Code
                      </button>
                      <button type="button" className="p-2 text-white bg-[#3c8c2c] border-2 rounded-lg barcode-btn mr-2" onClick={() => openBarcodeModal(item.item_code)}>
                        Barcode
                      </button>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://hypermart-new.onlinesytems.com/ItemCardPrint/${item.item_code}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 inline-block"
                      >
                        Print Item Card
                      </a>
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
              <div className="flex justify-between flex-1 sm:hidden">
                <button type="button" className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 rounded-md cursor-default" disabled>
                  &laquo; Previous
                </button>
                <button type="button" className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
                  Next &raquo;
                </button>
              </div>

              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm leading-5 text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">1</span> of <span className="font-medium">1</span> results
                  </p>
                </div>

                <div>
                  <span className="relative z-0 inline-flex rounded-md shadow-sm rtl:flex-row-reverse">
                    <span aria-disabled="true" aria-label="&laquo; Previous">
                      <span className="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md" aria-hidden="true">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </span>
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-white bg-blue-600 border-blue-600 border cursor-default"
                      aria-label="Go to page 1"
                    >
                      1
                    </button>
                    <span aria-disabled="true" aria-label="Next »">
                      <span className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 bg-white border border-gray-300 rounded-r-md cursor-default">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </span>
                  </span>
                </div>
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