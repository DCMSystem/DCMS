import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/hooks';
import { getEstimates } from 'app/estimate/estimateThunk';
import { EstimateInfo } from 'app/estimate/estimateSlice';
import { push } from 'lib/historyUtils';

function EstimateTable() {
  const dispatch = useDispatch();
  const { estimates } = useAppSelector((state) => state.estimate);
  const [estimate, setEstimate] = useState<EstimateInfo>();

  useEffect(() => {
    dispatch(getEstimates());
  }, []);

  useEffect(() => {
    if (estimates.length > 0) {
      setEstimate(estimates[0]);
    }
  }, [estimates]);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setEstimate(estimates.filter((data) => data.id === value)[0]);
  };

  return (
    <div className="estimate-table">
      <div>
        <div className="sublist">
          <button onClick={() => push('/estimate')}>견적서 양식</button>
          <button onClick={() => push('/estimate/table')} className="selected">
            견적표 추출
          </button>
          <button onClick={() => push('/estimate/list')}>견적리스트</button>
        </div>
      </div>
      {estimates.length < 1 && <div>견적표가 없습니다.</div>}
      {estimates.length > 0 && (
        <div>
          <div>
            <select onChange={onSelectChange} value={estimate?.id || ''}>
              {estimates.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.estimateNumber}
                </option>
              ))}
            </select>
          </div>
          <p></p>
          {!estimate && <div>선택된 견적서가 없습니다.</div>}
          {estimate && (
            <div><b>Customer : {estimate.companyName}</b>
              {estimate.list.dine.length > 0 && (
                <table>
                  <tbody>
                    <tr>
                      <th colSpan={1}>NO</th>
                      <th colSpan={5}>DINE PRODUCT</th>
                      <th colSpan={2}>MOQ</th>
                      <th colSpan={2}>NET PRICE</th>
                      <th colSpan={2}>STOCK</th>
                    </tr>
                    {estimate.list.dine.map((data, idx) => (
                      <tr key={data.id}>
                        <td colSpan={1}>{idx + 1}</td>
                        <td colSpan={5}>{data.name}</td>
                        <td colSpan={1}>{data.count}</td>
                        <td colSpan={1}>PCS</td>
                        <td colSpan={2}>US${data.price}</td>
                        <td colSpan={2}>{data.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {estimate.list.korloy.length > 0 && (
                <table>
                  <tbody>
                    <tr>
                      <th colSpan={1}>NO</th>
                      <th colSpan={5}>KORLOY PRODUCT</th>
                      <th colSpan={2}>MOQ</th>
                      <th colSpan={2}>NET PRICE</th>
                      <th colSpan={2}>STOCK</th>
                    </tr>
                    {estimate.list.korloy.map((data, idx) => (
                      <tr key={data.id}>
                        <td colSpan={1}>{idx + 1}</td>
                        <td colSpan={5}>{data.name}</td>
                        <td colSpan={1}>{data.count}</td>
                        <td colSpan={1}>PCS</td>
                        <td colSpan={2}>US${data.price}</td>
                        <td colSpan={2}>{data.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div><b>Delivery : {estimate.delivery}</b></div>
              <ValidityDiv isOnlyOneTime={estimate.validity === 'Only One Time'}>
                <b>Validity : {estimate.validity} {estimate.validityYear}</b>
              </ValidityDiv>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ValidityProps {
  isOnlyOneTime: boolean;
}

const ValidityDiv = styled.div<ValidityProps>`
  color: ${({ isOnlyOneTime }) => (isOnlyOneTime ? 'red' : 'black')};
`;

export default EstimateTable;
