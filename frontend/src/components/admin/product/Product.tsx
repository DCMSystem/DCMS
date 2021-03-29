import React from 'react';
import { push } from 'lib/historyUtils';

function Product() {
  return (
    <div className="product">
      <div className="sublist">
        <button onClick={() => push('/product')} className="selected">
          제품군 관리
        </button>
        <button onClick={() => push('/product/discount')}>연간할인율 관리</button>
        <button onClick={() => push('/product/promotion')}>연간 프로모션관리</button>
      </div>
    </div>
  );
}

export default Product;
