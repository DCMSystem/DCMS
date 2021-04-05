import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import useInput from 'lib/useInput';
import { setMoneyDecimalRounding } from 'lib/common';

interface EstimateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: ({
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
  }) => void;
}

function EstimateModal({ open, onClose, onSubmit }: EstimateModalProps) {
  const [type, setType] = useState('DINE PRODUCT');
  const [category, setCategory] = useState('I/S');
  const [name, setName] = useInput('');
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState('');
  const [orgPrice, setOrgPrice] = useState(0);
  const [profit, setProfit] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  const onSubmitClick = () => {
    if (!isEmpty && !stock) {
      alert('재고를 입력해주세요.');
      return;
    }

    if (!name) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!count) {
      alert('수량을 입력해주세요.');
      return;
    }

    onSubmit({
      type,
      category: type === 'KORLOY PRODUCT' ? category : '',
      name,
      count,
      price: setMoneyDecimalRounding(price),
      amount: setMoneyDecimalRounding(count * Number(price)),
      stock,
      orgPrice,
      profit,
    });
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filterCharacter = value.replace(/[^0-9\.]/g, ''); // 입력값이 숫자가 아니면 공백
    const startedCharacted = filterCharacter.replace(/^[0]/, '');

    if (startedCharacted) {
      const floatPrice = setMoneyDecimalRounding(Number(startedCharacted));

      if (type === 'KORLOY PRODUCT') {
        setProfit(setMoneyDecimalRounding(Number(floatPrice) / orgPrice - 1));
      }

      setPrice(floatPrice);
    } else {
      if (type === 'KORLOY PRODUCT') {
        setProfit(setMoneyDecimalRounding(0 / orgPrice - 1));
      }
      setPrice(0.0);
    }
  };

  const onChangeOrgPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filterCharacter = value.replace(/[^0-9.]/g, ''); // 입력값이 숫자가 아니면 공백
    const startedCharacted = filterCharacter.replace(/^[0]/, '');
    const inputNumber = startedCharacted ? Number(startedCharacted) : 0;

    if (category === 'I/S') {
      const calcPrice = setMoneyDecimalRounding((inputNumber / 0.1771) * 0.2168);
      setPrice(calcPrice);
      setProfit(setMoneyDecimalRounding((Number(calcPrice) / inputNumber - 1) * 100));
    } else {
      const calcPrice = setMoneyDecimalRounding((inputNumber / 0.2952) * 0.3614);
      setPrice(calcPrice);
      setProfit(setMoneyDecimalRounding((Number(calcPrice) / inputNumber - 1) * 100));
    }
    // setPrice(Number(startedCharacted) / 0.1)
    setOrgPrice(inputNumber);
  };

  const onEmptyCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsEmpty(checked);

    if (checked) {
      setStock('NS');
    } else {
      setStock('0');
    }
  };

  const onStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filterCharacter = value.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    const startedCharacted = filterCharacter.replace(/^[0]/, '');
    setStock(startedCharacted);
  };

  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setType(value);
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCategory(value);
  };

  const onCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filterCharacter = value.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    const startedCharacted = filterCharacter.replace(/^[0]/, '');
    const number = startedCharacted === '' ? 0 : parseInt(startedCharacted);
    setCount(number);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      disableAutoFocus
      disableBackdropClick
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        <div className="add-estimate-title">견적 항목 추가</div>
      </DialogTitle>
      <DialogContent>
        <div className="add-estimate">
          <div>
            PRODUCT 구분 :{' '}
            <select className="pro_input" value={type} onChange={onTypeChange}>
              <option value="DINE PRODUCT">DINE PRODUCT</option>
              <option value="KORLOY PRODUCT">KORLOY PRODUCT</option>
            </select>
            {type === 'KORLOY PRODUCT' && (
              <select className="pro2_input" value={category} onChange={onCategoryChange}>
                <option value="I/S">I/S</option>
                <option value="T/H">T/H</option>
              </select>
            )}
          </div>
          <div>
            제품명 : <input className="deg_input" type="text" value={name} onChange={setName} />
          </div>
          <div>
            수　량 :{' '}
            <input className="num_input" type="text" value={count} onChange={onCountChange} />
          </div>
          {type === 'KORLOY PRODUCT' && (
            <div>
              사입가 :{' '}
              <input
                className="pop_input"
                type="number"
                value={orgPrice}
                onChange={onChangeOrgPrice}
                step={0.01}
              />
            </div>
          )}
          <div>
            판매가 :{' '}
            <input
              className="pip_input"
              type="number"
              value={price}
              onChange={onChangePrice}
              step={0.01}
            />
          </div>
          {type === 'KORLOY PRODUCT' && <div>이익률 : {profit}%</div>}
          <div>
            재고현황 :{' '}
            <input
              className="stc_input"
              type="checkbox"
              id="stock"
              onChange={onEmptyCheckboxChange}
              checked={isEmpty}
            />
            <label htmlFor="stock">재고 없음</label>
            {!isEmpty && <input type="type" value={stock} onChange={onStockChange} />}
            {isEmpty && 'NS'}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <button className="button-submit" onClick={onSubmitClick}>
          등록
        </button>
        <button className="button-cancel" onClick={onClose}>
          취소
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default EstimateModal;
