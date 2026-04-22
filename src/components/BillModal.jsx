// src/components/BillModal.jsx
import { useEffect, useRef } from 'react';

const BillModal = ({ billHtml, onClose, salesCode }) => {
  const modalRef = useRef(null);
  const printTimeoutRef = useRef(null);

  useEffect(() => {
    // Auto-print after modal opens
    const printTimeout = setTimeout(() => {
      if (modalRef.current) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(billHtml);
        printWindow.document.close();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }
    }, 500);

    // Auto-close modal after 4 seconds
    const closeTimeout = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearTimeout(printTimeout);
      clearTimeout(closeTimeout);
      if (printTimeoutRef.current) clearTimeout(printTimeoutRef.current);
    };
  }, [billHtml, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden animate-slideUp"
      >
        {/* Success Header */}
        <div className="bg-green-500 p-4 text-white text-center">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-xl font-bold">Payment Successful!</h2>
          <p className="text-sm">Invoice: {salesCode}</p>
        </div>

        {/* Body */}
        <div className="p-4 text-center">
          <div className="mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-3"></div>
            <p className="text-gray-600">Printing bill... Please wait.</p>
            <p className="text-xs text-gray-400 mt-2">Window will close automatically</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1">
          <div className="bg-green-500 h-1 animate-progress"></div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 text-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;