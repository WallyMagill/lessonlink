import React from 'react';
import { FaPrint } from 'react-icons/fa';

function PrintPage() {
  function handlePrint() {
    window.print();
  }
  return (
    <button type="submit"
      onClick={handlePrint}
      style={{
        backgroundColor: 'rgb(245, 245, 245)',
        borderRadius: '8px',
        padding: '8px',
        cursor: 'pointer',
        color: 'black',
      }}
    >
      <FaPrint />
    </button>
  );
}
export default PrintPage;
