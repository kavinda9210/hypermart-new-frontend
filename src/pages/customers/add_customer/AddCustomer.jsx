import React from 'react'
import Layout from '../../../components/Layout';
import { useNavigate } from 'react-router-dom';
//import './AddCustomer.css';


const AddCustomer = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div>AddCustomer</div>
    </Layout>
  )
}

export default AddCustomer