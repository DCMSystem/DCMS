import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import useInput from 'lib/useInput';

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
  }: {
    type: string;
    category: string;
    name: string;
    count: number;
    price: number;
    amount: number;
    stock: string;
  }) => void;
}

function EstimateModal({ open, onClose, onSubmit }: EstimateModalProps) {
  const [type, setType] = useState('DINE PRODUCT');
  const [category, setCategory] = useState('I/S');
  const [name, setName] = useInput('');
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [stock, setStock] = useState('');
  const [orgPrice, setOrgPrice] = useState(0);
  const [profit, setProfit] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  const onSubmitClick = () => {
    onSubmit({
      type,
      category: type === 'KORLOY PRODUCT' ? category : '',
      name,
      count,
      price,
      amount: count * price,
      stock,
    });
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filterCharacter = value.replace(/[^0-9.]/g, ''); // 입력값이 숫자가 아니면 공백
    const startedCharacted = filterCharacter.replace(/^[0]/, '');
    setPrice(parseFloat(startedCharacted));
  };

  const onChangeOrgPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filterCharacter = value.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    const startedCharacted = filterCharacter.replace(/^[0]/, '');
    const inputNumber = Number(startedCharacted);

    if (category === 'I/S') {
      const calcPrice = Number(((inputNumber / 0.1771) * 0.2168).toFixed(2));
      setPrice(calcPrice);
      setProfit(Math.round(calcPrice / inputNumber - 1));
    } else {
      const calcPrice = Number(((inputNumber / 0.2952) * 0.3614).toFixed(2));
      setPrice(calcPrice);
      setProfit(Math.round(calcPrice / inputNumber - 1));
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

  return (
    <Dialog disableEscapeKeyDown disableAutoFocus open={open} onClose={onClose}>
      <DialogTitle>항목 추가</DialogTitle>
      <DialogContent>
        <div>
          <div>
            PRODUCT 구분 :{' '}
            <select value={type} onChange={onTypeChange}>
              <option value="DINE PRODUCT">DINE PRODUCT</option>
              <option value="KORLOY PRODUCT">KORLOY PRODUCT</option>
            </select>
            {type === 'KORLOY PRODUCT' && (
              <select value={category} onChange={onCategoryChange}>
                <option value="I/S">I/S</option>
                <option value="T/H">T/H</option>
              </select>
            )}
          </div>
          {type === 'KORLOY PRODUCT' && (
            <div>
              사입가 : <input type="text" value={orgPrice} onChange={onChangeOrgPrice} />
            </div>
          )}
          <div>
            판매가 : <input type="text" value={price} onChange={onChangePrice} />
          </div>
          <div>이익률 : {profit}%</div>
          <div>
            수량 : <input type="number" value={count} />
          </div>
          <div>
            재고현황 :{' '}
            <input type="checkbox" id="stock" onChange={onEmptyCheckboxChange} checked={isEmpty} />
            <label htmlFor="stock">재고 없음</label>
            {!isEmpty && <input type="type" value={stock} onChange={onStockChange} />}
            {isEmpty && 'NS'}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onSubmitClick}>
          등록
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EstimateModal;
