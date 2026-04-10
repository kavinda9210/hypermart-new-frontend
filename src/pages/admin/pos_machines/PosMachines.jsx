import React from 'react';
import Layout from '../../../components/Layout';

function PosMachines({ onBackToMain }) {
  return (
    <Layout onBackToMain={onBackToMain}>
      <div className="flex min-h-[40vh] items-center justify-center px-6 py-10">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">PC Registrations</h1>
          <p className="mt-2 text-sm text-slate-600">Placeholder page created for the admin route.</p>
        </div>
      </div>
    </Layout>
  );
}

export default PosMachines;
