import React from 'react'
import Layout from '../../../components/Layout'
import './EditItemPage.css'

const EditItemPage = () => {
  // Demo state for image preview
  const [image, setImage] = React.useState('https://hypermart-new.onlinesytems.com/upload/item/default.png');
  const [imageName, setImageName] = React.useState('');
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setImage('https://hypermart-new.onlinesytems.com/upload/item/default.png');
      setImageName('');
    }
  };
  return (
    <Layout>
    <div className="edit-item-form">
      {/* Breadcrumbs */}
      <nav className="px-12 py-5 max-sm:px-6" aria-label="Breadcrumb">
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
              <p className="text-sm font-medium text-gray-700 ms-1 md:ms-2">Update Items 3020</p>
            </div>
          </li>
        </ol>
      </nav>
      <form className="flex-grow p-6" autoComplete="off">
        <div className="flex flex-col flex-grow h-full p-6 border-2 rounded-lg">
          <div className="form-row">
            <div>
              <label htmlFor="item_code">Item Code</label>
              <input type="text" id="item_code" value="3020" disabled readOnly />
            </div>
            <div>
              <label htmlFor="barcode">Barcode <span className="text-gray-500">(Optional)</span></label>
              <input type="text" id="barcode" placeholder="Barcode No" defaultValue="sdsdsd" />
              <p className="mt-1 text-sm text-red-500" id="barcode_error"></p>
            </div>
            <div>
              <label htmlFor="item_name">Item name <span className="text-red-500">*</span></label>
              <input type="text" id="item_name" placeholder="Your Item name" defaultValue="Zesta green 25 tea bags box 37.5g" required />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select id="category" defaultValue="1">
                <option value="">Select category</option>
                <option value="1">sample category</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="supplier">Supplier <span className="text-red-500">*</span></label>
              <select id="supplier" defaultValue="1" required>
                <option disabled>Your supplier name</option>
                <option value="1">sample supplier</option>
              </select>
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input type="number" id="quantity" value="10000" disabled readOnly />
            </div>
            <div>
              <label htmlFor="minimum_qty">Minimum Quantity <span className="text-red-500">*</span></label>
              <input type="number" id="minimum_qty" placeholder="Enter Minimum Qty" defaultValue="1" step="0.01" required />
            </div>
            <div>
              <label htmlFor="purchase_price">Purchase Price</label>
              <input type="number" id="purchase_price" placeholder="Enter purchase price" value="1000.00" step="0.01" disabled readOnly />
            </div>
            <div>
              <label htmlFor="retail_price">Retail Price</label>
              <input type="number" id="retail_price" placeholder="Enter retail price" value="1200.00" step="0.01" disabled readOnly />
            </div>
            <div>
              <label htmlFor="wholesale_price">Wholesale Price</label>
              <input type="number" id="wholesale_price" placeholder="Enter wholesale price" value="1100.00" step="0.01" disabled readOnly />
            </div>
            <div>
              <label htmlFor="pos_order_no">POS Order No <span className="text-gray-500">(For POS Ordering)</span></label>
              <input type="number" id="pos_order_no" placeholder="Enter POS order number" min="1" step="1" />
              <p className="mt-1 text-sm text-red-500" id="pos_order_no_error"></p>
            </div>
            <div>
              <label htmlFor="product_image">Current Item Image</label>
              <img src={image} alt="Current Item" className="image-preview" />
            </div>
          </div>
          <div className="form-row full-width-row">
            <div className="full-width-description">
              <label htmlFor="description">Description <span className="text-gray-500">(Optional)</span></label>
              <textarea id="description" rows={5}></textarea>
              <p className="mt-1 text-sm text-red-500" id="description_error"></p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="imageInput">Add image</label>
            <input type="file" id="imageInput" onChange={handleImageChange} />
            {imageName && <div className="mb-2 text-sm text-gray-500">{imageName}</div>}
            {image && <img src={image} alt="Preview" className="image-preview" style={{ width: 200, height: 200, marginTop: 10, marginBottom: 10 }} />}
            <p className="mt-1 text-sm text-red-500" id="image_path_error"></p>
          </div>
          <div className="form-actions">
            <button className="update-btn" type="submit">Update</button>
            <button className="cancel-btn" type="button" onClick={() => window.location.href='/item/item_list'}>Cancel</button>
          </div>
        </div>
      </form>
      
    </div>
    </Layout>
  );
}

export default EditItemPage