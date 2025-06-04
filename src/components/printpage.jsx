import React from 'react';
import { FaPrint } from 'react-icons/fa';

function PrintPage({ isDarkMode }) {
  function handlePrint() {
    window.print();
  }
  return (
    <button type="button"
      onClick={handlePrint}
      style={{
        backgroundColor: isDarkMode ? '#3182ce' : 'rgb(245, 245, 245)',
        borderRadius: '8px',
        padding: '8px',
        cursor: 'pointer',
        color: isDarkMode ? 'white' : 'black',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FaPrint />
    </button>
  );
}
export default PrintPage;
