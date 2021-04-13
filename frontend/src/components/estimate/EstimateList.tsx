import React, { useEffect, Fragment, useState } from 'react';
import { push } from 'lib/historyUtils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/hooks';
import { getEstimates } from 'app/estimate/estimateThunk';
import { EstimateInfo, EstimateProductInfo } from 'app/estimate/estimateSlice';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import { setNumberFormatWithComma } from 'lib/common';

function EstimateListTR({ estimate, item }: { estimate: EstimateInfo; item: EstimateProductInfo }) {
  return (
    <tr key={item.id}>
      <td>{estimate.estimateNumber}</td>
      <td>{item.type}</td>
      <td>{estimate.companyName}</td>
      <td>{item.name}</td>
      <td>{setNumberFormatWithComma(item.count.toString())}</td>
      <td>{setNumberFormatWithComma(item.orgPrice.toString())}</td>
      <td>{setNumberFormatWithComma(item.price.toString())}</td>
      <td>{setNumberFormatWithComma(item.amount.toFixed(2))}</td>
      <td>{item.profit}%</td>
      <td>
        {estimate.validity} {estimate.validity === 'By the end of Dec,' && estimate.validityYear}
      </td>
      <td>{item.specialPrice ? 'O' : '-'}</td>
    </tr>
  );
}

function EstimateList() {
  const dispatch = useDispatch();
  const { estimates } = useAppSelector((state) => state.estimate);
  const [csvData, setCsvData] = useState<Array<any>>([]);

  const headers = [
    { label: '견적서 번호', key: 'estimateNumber' },
    { label: '구분', key: 'type' },
    { label: '업체', key: 'companyName' },
    { label: '제품명', key: 'name' },
    { label: '수량', key: 'count' },
    { label: '사입가', key: 'orgPrice' },
    { label: '판매가', key: 'price' },
    { label: 'Amount', key: 'amount' },
    { label: '이익률', key: 'profit' },
    { label: 'Validity', key: 'validity' },
    { label: '특가', key: 'specialPrice' },
  ];

  useEffect(() => {
    dispatch(getEstimates());
  }, []);

  useEffect(() => {
    onDownloadClick();
  }, [estimates]);

  const onDownloadClick = () => {
    if (!estimates || estimates.length < 1) {
      return;
    }

    const data = estimates.map((data) => {
      const dineArr =
        data.list.dine.length > 0
          ? data.list.dine.map((item) => {
              return {
                estimateNumber: data.estimateNumber,
                type: item.type,
                companyName: data.companyName,
                name: item.name,
                count: setNumberFormatWithComma(item.count.toString()),
                orgPrice: setNumberFormatWithComma(item.orgPrice.toString()),
                price: setNumberFormatWithComma(item.price.toString()),
                amount: setNumberFormatWithComma(item.amount.toFixed(2)),
                profit: item.profit,
                validity: `${data.validity} ${
                  data.validity === 'By the end of Dec,' && data.validityYear
                }`,
                specialPrice: item.specialPrice ? 'O' : '-',
              };
            })
          : [];

      const korloyArr =
        data.list.korloy.length > 0
          ? data.list.korloy.map((item) => {
              return {
                estimateNumber: data.estimateNumber,
                type: item.type,
                companyName: data.companyName,
                name: item.name,
                count: setNumberFormatWithComma(item.count.toString()),
                orgPrice: setNumberFormatWithComma(item.orgPrice.toString()),
                price: setNumberFormatWithComma(item.price.toString()),
                amount: setNumberFormatWithComma(item.amount.toFixed(2)),
                profit: item.profit,
                validity: `${data.validity} ${
                  data.validity === 'By the end of Dec,' && data.validityYear
                }`,
                specialPrice: item.specialPrice ? 'O' : '-',
              };
            })
          : [];

      return dineArr.concat(korloyArr);
    });

    const flatData = data.flat();
    setCsvData(flatData);
  };

  return (
    <div className="estimate-list">
      <div className="sublist">
        <button onClick={() => push('/estimate')}>견적서 양식</button>
        <button onClick={() => push('/estimate/table')}>견적표 추출</button>
        <button onClick={() => push('/estimate/list')} className="selected">
          견적리스트
        </button>
      </div>
      <div>
        <CSVLink className="downloadme" data={csvData} headers={headers} filename={`${moment().format('YYYY-MM-DD')}.csv`}>
          Download me
        </CSVLink>
      </div><p>
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
              <td>특가</td>
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
