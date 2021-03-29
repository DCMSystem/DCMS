import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';
import {
  getEstimateCount,
  openEstimateModal,
  closeEstimateModal,
  getEstimates,
} from 'app/estimate/estimateThunk';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { officerList, attnList, attnList2 } from 'values/estimateValues';
import { randomStr } from 'lib/randomStr';
import EstimateModal from './EstimateModal';
import EstimatePreviewModal from './EstimatePreviewModal';
import { reducer, setInputNumberFormat } from 'lib/common';
import { EstimateProductInfo } from 'app/estimate/estimateSlice';
import { push } from 'lib/historyUtils';

function Estimate() {
  const dispatch = useDispatch();
  const { estimateCount, estimateModal } = useAppSelector((state) => state.estimate);
  const [modal, setModal] = useState(false);
  const [validity, setValidity] = useState('Only One Time');
  const [validityYear, setValidityYear] = useState(new Date().getFullYear());
  const [officerName, setOfficerName] = useState('Mr.Kim');
  const [companyName, setCompanyName] = useState('');
  const [list, setList] = useState<{
    dine: Array<EstimateProductInfo>;
    korloy: Array<EstimateProductInfo>;
  }>({ dine: [], korloy: [] });
  const [manufacturer, setManufacturer] = useState('DINE INC.');
  const [manager, setManager] = useState('Stella');
  const [shippmentStart, setShippmentStart] = useState('6');
  const [shippmentEnd, setShippmentEnd] = useState('8');
  const [specialPrice, setSpecialPrice] = useState(false);
  const fullList = list.dine.concat(list.korloy);

  useEffect(() => {
    dispatch(getEstimateCount());
    dispatch(getEstimates());
  }, []);

  const onValidityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setValidity(value);
  };

  const onValidityYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filterCharacter = value.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    const startedCharacted = filterCharacter.replace(/^[0]/, '');
    setValidityYear(parseInt(startedCharacted));
  };

  const onOfficerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setOfficerName(value);
  };

  const onCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCompanyName(value);
  };

  const onManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setManager(value);
  };

  const onPreviewClick = () => {
    if (shippmentStart && shippmentEnd && parseInt(shippmentEnd) < parseInt(shippmentStart)) {
      alert('배달 소요 기간을 다시 확인해주세요.');
      return;
    }

    if (!companyName || !officerName) {
      alert('필드를 입력해주세요.');
      return;
    }

    if (list.dine.length < 1 && list.korloy.length < 1) {
      alert('품목을 하나 이상 선택해주세요.');
      return;
    }

    dispatch(openEstimateModal());
  };

  const onCloseEstimateModal = () => {
    dispatch(closeEstimateModal());
  };

  const onListSubmit = ({
    type,
    category,
    name,
    count,
    price,
    amount,
    stock,
    orgPrice,
    profit,
  }: {
    type: string;
    category: string;
    name: string;
    count: number;
    price: number;
    amount: number;
    stock: string;
    orgPrice: number;
    profit: number;
  }) => {
    const concatList =
      type === 'DINE PRODUCT'
        ? list.dine.concat({
            id: randomStr(),
            type,
            category,
            name,
            count,
            price,
            amount,
            stock,
            orgPrice,
            profit,
            checked: false,
          })
        : list.korloy.concat({
            id: randomStr(),
            type,
            category,
            name,
            count,
            price,
            amount,
            stock,
            orgPrice,
            profit,
            checked: false,
          });

    setList(
      type === 'DINE PRODUCT' ? { ...list, dine: concatList } : { ...list, korloy: concatList }
    );

    if (type === 'DINE PRODUCT') {
      if (list.korloy.length > 0) {
        setManufacturer('DINE INC., KORLOY INC.');
      } else {
        setManufacturer('DINE INC.');
      }
    } else {
      if (list.dine.length > 0) {
        setManufacturer('DINE INC., KORLOY INC.');
      } else {
        setManufacturer('KORLOY INC.');
      }
    }

    onModalClick();
  };

  const onListDelete = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget;
    const target = e.currentTarget.getAttribute('data-target');

    const filterList =
      target === 'DINE PRODUCT'
        ? list.dine.filter((data) => data.id !== id)
        : list.korloy.filter((data) => data.id !== id);

    setList(
      target === 'DINE PRODUCT' ? { ...list, dine: filterList } : { ...list, korloy: filterList }
    );
  };

  const onModalClick = () => {
    setModal(!modal);
  };

  const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const startValue = setInputNumberFormat(value);
    if (startValue) {
      const endValue = parseInt(startValue) + 2;
      setShippmentEnd(endValue + '');
    }

    setShippmentStart(startValue || '0');
  };

  const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const endValue = setInputNumberFormat(value);
    setShippmentEnd(endValue || '0');
  };

  const onProductInfoCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      checked,
      dataset: { productid, producttype },
    } = e.target;
    if (producttype === 'DINE PRODUCT') {
      const filterList = list.dine.map((data) => {
        if (data.id === productid) {
          data.checked = checked;
        }
        return data;
      });

      setList({ ...list, dine: filterList });
    } else {
      const filterList = list.korloy.map((data) => {
        if (data.id === productid) {
          data.checked = checked;
        }
        return data;
      });
      setList({ ...list, korloy: filterList });
    }
  };

  const onSpecialPriceChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setSpecialPrice(checked);
  };

  return (
    <div className="estimate-wrapper">
      <div className="sublist">
        <button onClick={() => push('/estimate')} className="selected">
          견적서 양식
        </button>
        <button onClick={() => push('/estimate/table')}>견적표 추출</button>
        <button onClick={() => push('/estimate/list')}>견적리스트</button>
      </div>
      <div className="save-button">
        <button onClick={onPreviewClick}>견적서 생성</button>
      </div>
      <div className="document">
        <div className="header">
          <div className="name indent-left">QUOTATION</div>
          <div className="number">
            {moment().format('YYMM')}-
            {estimateCount + 1 > 9 ? estimateCount + 1 : '0' + (estimateCount + 1)}
          </div>
          <div className="date indent-right">
            DATE:<span>{moment().format('D-MMM-YY')}</span>
          </div>
        </div>
        <div className="inform">
          <div className="logo">DINE Inc.</div>
          <div className="text">
            <div className="left">
              <div className="to">TO : DINE Inc.(QINGDAO)</div>
              <div className="attn">
                <span>Attn : </span>
                {attnList.join(' / ')}
                <div>{attnList2.join(' / ')}</div>
              </div>
              <div className="fax">FAX NO : 86-532-8588-5082</div>
            </div>
            <div className="right">
              <div className="address">(15116) 24, MTV 26-ro, Jeongwang-Dong,</div>
              <div className="address">Shihung-City, Gyeonggi-do, KOREA</div>
              <div className="tel">TEL : 0082-31-488-6200</div>
              <div className="fax">FAX : 0082-31-433-1721</div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="first">
            <div className="right indent-left">We are pleased to offer you on your inquiry</div>
            <div className="left indent-right">
              <input type="text" value={companyName} onChange={onCompanyNameChange} />_
              <select value={officerName} onChange={onOfficerChange}>
                {officerList.map((data) => (
                  <option value={data} key={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="list">
            <table>
              <thead>
                <tr className="thead-tr">
                  <td className="no">NO.</td>
                  <td className="text-left">
                    Specification
                    <br />
                    (Cat.no)
                  </td>
                  <td>
                    Q'ty
                    <br />
                    (minimum)
                  </td>
                  <td>
                    Unit Price
                    <br />
                    (US$)
                  </td>
                  <td>Amount</td>
                  <td>
                    Remark
                    <br />
                    STOCK
                  </td>
                  <td>특가</td>
                </tr>
              </thead>
              <tbody>
                {list.dine.length > 0 && (
                  <tr>
                    <td></td>
                    <td className="product-name">DINE PRODUCT</td>
                    <td className="product-amount">MOQ</td>
                    <td>- FOB KOREA-</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
                {list.dine.map((data, idx) => (
                  <tr key={data.id}>
                    <td>{idx + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.count} PCS</td>
                    <td>US${data.price}</td>
                    <td>US${data.amount}</td>
                    <td>{data.stock}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={data.checked}
                        data-productid={data.id}
                        data-producttype={data.type}
                        onChange={onProductInfoCheckedChange}
                      />
                    </td>
                    <td>
                      <button onClick={onListDelete} data-target="DINE PRODUCT" id={data.id}>
                        -
                      </button>
                    </td>
                  </tr>
                ))}
                {list.korloy.length > 0 && (
                  <tr>
                    <td></td>
                    <td className="product-name">KORLOY PRODUCT</td>
                    <td className="product-amount">MOQ</td>
                    <td>- FOB KOREA-</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
                {list.korloy.map((data, idx) => (
                  <tr key={data.id}>
                    <td>{idx + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.count} PCS</td>
                    <td>US${data.price}</td>
                    <td>US${data.amount}</td>
                    <td>{data.stock}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={data.checked}
                        data-productid={data.id}
                        data-producttype={data.type}
                        onChange={onProductInfoCheckedChange}
                      />
                    </td>
                    <td>
                      <button onClick={onListDelete} data-target="KORLOY PRODUCT" id={data.id}>
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="list-add-btn">
              <button onClick={onModalClick}>+</button>
            </div>
          </div>
          <div className="remark">
            <div className="title indent-left">Remark:</div>
            <div className="content indent-left">1. The above is net price</div>
          </div>
          <div className="total">
            <div className="indent-left">TOTAL : </div>
            <div className="total-count">
              {fullList.length > 0
                ? fullList
                    .map((data) => {
                      return data.count;
                    })
                    .reduce(reducer)
                : 0}{' '}
              <span>PCS</span>
            </div>
            <div className="indent-right">
              US$
              {fullList.length > 0
                ? fullList
                    .map((data) => {
                      return data.amount;
                    })
                    .reduce(reducer)
                : 0}
            </div>
          </div>
          <div className="footer">
            <Validity value={validity}>
              1. Validity :{' '}
              <select value={validity} onChange={onValidityChange}>
                <option value="Only One Time">Only One Time</option>
                <option value="By the end of Dec,">By the end of Dec,</option>
              </select>
              {validity === 'By the end of Dec,' && (
                <input type="text" onChange={onValidityYearChange} value={validityYear} />
              )}
              <input
                type="checkbox"
                checked={specialPrice}
                onChange={onSpecialPriceChecked}
                id="special-price"
              />
              <label htmlFor="special-price">특가</label>
            </Validity>
            <div>2. Payment : 30days after shipment</div>
            <div>3. Packing : Standard Export Packing (Carton box)</div>
            <div>4. Manufacturer : {manufacturer}</div>
            <div>
              5. Delivery : About{' '}
              <input type="text" value={shippmentStart} onChange={onChangeStartDate} /> ~{' '}
              <input type="text" value={shippmentEnd} onChange={onChangeEndDate} /> weeksdl
            </div>
            <div className="signiture">
              <table>
                <tbody>
                  <tr>
                    <td>CHARGE</td>
                    <td>MANAGER</td>
                    <td>DIRECTOR</td>
                  </tr>
                  <tr>
                    <td className="sign">
                      <select value={manager} onChange={onManagerChange}>
                        <option value="Stella">Stella</option>
                        <option value="Young">Young</option>
                      </select>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="last">DIQPM-704-02(REV.00)</div>
          </div>
        </div>
      </div>
      {modal && <EstimateModal open={modal} onClose={onModalClick} onSubmit={onListSubmit} />}
      {estimateModal && (
        <EstimatePreviewModal
          open={estimateModal}
          validity={validity}
          validityYear={validityYear}
          officerName={officerName}
          companyName={companyName}
          list={list}
          manufacturer={manufacturer}
          manager={manager}
          shippment={shippmentStart + ' ~ ' + shippmentEnd}
          specialPrice={specialPrice}
          onClose={onCloseEstimateModal}
        />
      )}
    </div>
  );
}

interface ValidityProps {
  value: string;
}

const Validity = styled.div<ValidityProps>`
  color: ${({ value }) => (value === 'Only One Time' ? 'red' : 'black')};
  font-weight: ${({ value }) => (value === 'Only One Time' ? 'bold' : 'normal')};
`;

export default Estimate;
