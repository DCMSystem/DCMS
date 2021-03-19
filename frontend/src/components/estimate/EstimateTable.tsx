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
          {!estimate && <div>선택된 견적서가 없습니다.</div>}
          {estimate && (
            <div>
              {estimate.list.dine.length > 0 && (
                <table>
                  <tbody>
                    <tr>
                      <th>NO</th>
                      <th>DINE PRODUCT</th>
                      <th colSpan={2}>MOQ</th>
                      <th>NET PRICE</th>
                      <th>STOCK</th>
                    </tr>
                    {estimate.list.dine.map((data, idx) => (
                      <tr key={data.id}>
                        <td>{idx + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.count}</td>
                        <td>PCS</td>
                        <td>US${data.price}</td>
                        <td>{data.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {estimate.list.korloy.length > 0 && (
                <table>
                  <tbody>
                    <tr>
                      <th>NO</th>
                      <th>KORLOY PRODUCT</th>
                      <th colSpan={2}>MOQ</th>
                      <th>NET PRICE</th>
                      <th>STOCK</th>
                    </tr>
                    {estimate.list.korloy.map((data, idx) => (
                      <tr key={data.id}>
                        <td>{idx + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.count}</td>
                        <td>PCS</td>
                        <td>US${data.price}</td>
                        <td>{data.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div>Delivery : {estimate.delivery} + 4 ~ 5 weeks</div>
              <ValidityDiv isOnlyOneTime={estimate.validity === 'Only One Time'}>
                Validity : {estimate.validity} {estimate.validityYear}
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
