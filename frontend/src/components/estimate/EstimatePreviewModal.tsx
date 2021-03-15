import React, { useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { attnList, attnList2 } from 'values/estimateValues';
import { useAppSelector } from 'app/hooks';
import moment from 'moment';
import styled from 'styled-components';
import { reducer } from 'lib/common';
import html2pdf from 'html2pdf.js';
import { useDispatch } from 'react-redux';
import { insertEstimate } from 'app/estimate/estimateThunk';
import YoungSign from 'css/img/sign/Young.png';
import StellaSign from 'css/img/sign/Stella.jpeg';

interface EstimatePreviewModalProps {
  open: boolean;
  validity: string;
  validityYear: number;
  officerName: string;
  companyName: string;
  list: {
    dine: Array<{
      id: string;
      type: string;
      category: string;
      name: string;
      count: number;
      price: number;
      amount: number;
      stock: string;
      orgPrice: number;
      profit: number;
    }>;
    korloy: Array<{
      id: string;
      type: string;
      category: string;
      name: string;
      count: number;
      price: number;
      amount: number;
      stock: string;
      orgPrice: number;
      profit: number;
    }>;
  };
  manufacturer: string;
  manager: string;
  onClose: () => void;
}

function EstimatePreviewModal({
  open,
  validity,
  validityYear,
  officerName,
  companyName,
  list,
  manufacturer,
  manager,
  onClose,
}: EstimatePreviewModalProps) {
  const { estimateCount } = useAppSelector((state) => state.estimate);
  const dispatch = useDispatch();
  const htmlRef = useRef<HTMLDivElement>(null);

  const onSubmitClick = () => {
    htmlRef.current && html2pdf().set({ filename: 'test.pdf' }).from(htmlRef.current).save();
    dispatch(
      insertEstimate({
        estimateNumber: `${moment().format('YYMM')}-
    ${estimateCount + 1 > 9 ? estimateCount + 1 : '0' + (estimateCount + 1)}`,
        date: moment().format('D-MMM-YY'),
        attn: attnList.concat(attnList2),
        companyName,
        officerName,
        list,
        validity,
        manufacturer,
        delivery: 'About 45 days',
        manager,
      })
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>미리보기</DialogTitle>
      <DialogContent>
        <div className="estimate-wrapper" ref={htmlRef}>
          <div className="document estimate-modal">
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
                  {companyName}_{officerName}
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
                  <tbody>
                    {list.dine.length > 0 && (
                      <tr>
                        <td></td>
                        <td className="product-name">DINE PRODUCT</td>
                        <td className="product-amount">MOQ</td>
                        <td>- FOB KOREA-</td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="remark">
                <div className="title indent-left">Remark:</div>
                <div className="content indent-left">1. The above is net price</div>
              </div>
              <div className="total">
                <div className="indent-left">TOTAL : </div>
                <div className="total-count">
                  {list.dine
                    .map((data) => {
                      return data.count;
                    })
                    .concat(
                      list.korloy.map((data) => {
                        return data.count;
                      })
                    )
                    .reduce(reducer)}{' '}
                  <span>PCS</span>
                </div>
                <div className="indent-right">
                  US$
                  {list.dine
                    .map((data) => {
                      return data.amount;
                    })
                    .concat(
                      list.korloy.map((data) => {
                        return data.amount;
                      })
                    )
                    .reduce(reducer)}
                </div>
              </div>
              <div className="footer">
                <Validity value={validity}>
                  1. Validity : {validity}
                  {validity === 'By the end of Dec, YYYY' && { validityYear }}
                </Validity>
                <div>2. Payment : 30days after shipment</div>
                <div>3. Packing : Standard Export Packing (Carton box)</div>
                <div>4. Manufacturer : {manufacturer}</div>
                <div>5. Delivery : {'About 45 days'}</div>
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
                          {manager === 'Stella' ? (
                            <img src={StellaSign} alt="Stella" />
                          ) : (
                            <img src={YoungSign} alt="Young" />
                          )}
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
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onSubmitClick}>
          저장
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface ValidityProps {
  value: string;
}

const Validity = styled.div<ValidityProps>`
  color: ${({ value }) => (value === 'Only One Time' ? 'red' : 'black')};
  font-weight: ${({ value }) => (value === 'Only One Time' ? 'bold' : 'normal')};
`;

export default EstimatePreviewModal;
