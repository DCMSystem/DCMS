import React, { useEffect, Fragment } from 'react';
import { push } from 'lib/historyUtils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/hooks';
import { getEstimates } from 'app/estimate/estimateThunk';
import { EstimateInfo, EstimateProductInfo } from 'app/estimate/estimateSlice';

function EstimateListTR({ estimate, item }: { estimate: EstimateInfo; item: EstimateProductInfo }) {
  return (
    <tr key={item.id}>
      <td>{estimate.estimateNumber}</td>
      <td>{item.type}</td>
      <td>{estimate.companyName}</td>
      <td>{item.name}</td>
      <td>{item.count}</td>
      <td>{item.orgPrice}</td>
      <td>{item.price}</td>
      <td>{item.amount}</td>
      <td>{item.profit}%</td>
      <td>
        {estimate.validity} {estimate.validityYear}
      </td>
    </tr>
  );
}

function EstimateList() {
  const dispatch = useDispatch();
  const { estimates } = useAppSelector((state) => state.estimate);

  useEffect(() => {
    dispatch(getEstimates());
  }, []);

  return (
    <div className="estimate-list">
      <div className="sublist">
        <button onClick={() => push('/estimate')}>견적서 양식</button>
        <button onClick={() => push('/estimate/table')}>견적표 추출</button>
        <button onClick={() => push('/estimate/list')} className="selected">
          견적리스트
        </button>
      </div>
      <div className="list-data">
        <table>
          <tbody>
            <tr>
              <td>견적서 번호</td>
              <td>구분</td>
              <td>업체</td>
              <td>제품명</td>
              <td>수량</td>
              <td>사입가</td>
              <td>판매가</td>
              <td>Amount</td>
              <td>이익률</td>
              <td>Validity</td>
            </tr>
            {(!estimates || estimates.length < 1) && (
              <tr>
                <td colSpan={10}>데이터가 없습니다.</td>
              </tr>
            )}
            {estimates &&
              estimates.map((estimate) => (
                <Fragment>
                  {estimate.list.dine.map((data) => (
                    <EstimateListTR key={data.id} estimate={estimate} item={data} />
                  ))}
                  {estimate.list.korloy.map((data) => (
                    <EstimateListTR key={data.id} estimate={estimate} item={data} />
                  ))}
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EstimateList;
