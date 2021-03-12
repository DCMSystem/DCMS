import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';
import { getEstimateCount } from 'app/estimate/estimateThunk';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { officerList, attnList, attnList2 } from 'values/estimateValues';

function Estimate() {
  const dispatch = useDispatch();
  const { estimateCount } = useAppSelector((state) => state.estimate);
  const [validity, setValidity] = useState('Only One Time');
  const [validityYear, setValidityYear] = useState(new Date().getFullYear());
  const [officerName, setOfficerName] = useState('Mr.Kim');
  const [companyName, setCompanyName] = useState('');
  const [list, setList] = useState<
    Array<{
      type: string;
      no: number;
      name: string;
      count: number;
      price: string;
      amount: number;
      stock: string;
    }>
  >([]);
  const [manufacturer, setManufacturer] = useState('DINE INC.');
  const [manager, setManager] = useState('Stella');

  useEffect(() => {
    // dispatch(getEstimateCount());
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

  const onManufacturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setManufacturer(value);
  };

  const onManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setManager(value);
  };

  return (
    <div className="estimate-wrapper">
      <div className="save-button">
        <button>문서 저장</button>
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
                </tr>
              </thead>
            </table>
            <div className="list-add-btn">
              <button>+</button>
            </div>
          </div>
          <div className="remark">
            <div className="title indent-left">Remark:</div>
            <div className="content indent-left">1. The above is net price</div>
          </div>
          <div className="total">
            <div className="indent-left">TOTAL : </div>
            <div className="total-count">
              {5} <span>PCS</span>
            </div>
            <div className="indent-right">US${`500.00`}</div>
          </div>
          <div className="footer">
            <Validity value={validity}>
              1. Validity :{' '}
              <select value={validity} onChange={onValidityChange}>
                <option value="Only One Time">Only One Time</option>
                <option value="By the end of Dec, YYYY">By the end of Dec,</option>
              </select>
              {validity === 'By the end of Dec, YYYY' && (
                <input type="text" onChange={onValidityYearChange} value={validityYear} />
              )}
            </Validity>
            <div>2. Payment : 30days after shipment</div>
            <div>3. Packing : Standard Export Packing (Carton box)</div>
            <div>
              4. Manufacturer :{' '}
              <select value={manufacturer} onChange={onManufacturerChange}>
                <option value="DINE INC.">DINE INC.</option>
                <option value="KORLOY INC.">KORLOY INC.</option>
              </select>
            </div>
            <div>5. Delivery : About 45 days</div>
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
