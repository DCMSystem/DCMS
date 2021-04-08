import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import useInput from 'lib/useInput';
import { DiscountInfo } from 'app/discount/discountSlice';
import { useDispatch } from 'react-redux';
import { insertDiscount, updateDiscount } from 'app/discount/discountThunk';

interface DiscountModalProps {
  open: boolean;
  item?: DiscountInfo;
  setSelItem: (value: DiscountInfo | undefined) => void;
  onClose: () => void;
}

function DiscountModal({ open, item, onClose, setSelItem }: DiscountModalProps) {
  const dispatch = useDispatch();
  const [year, setYear] = useState(item?.year || new Date().getFullYear());
  const [type, setType] = useState(item?.type || 'DINE');
  const [category, setCategory] = useState(item?.category || '일반');
  const [productFamily, setProductFamily] = useInput(item?.productFamily || '');
  const [purchaseDiscount, setPurchaseDiscount] = useState(item?.purchaseDiscount || 0.0);
  const [purchaseCondition, setPurchaseCondition] = useInput(item?.purchaseCondition || '');
  const [salesDiscount, setSalesDiscount] = useState(item?.salesDiscount || 0.0);
  const [salesCondition, setSalesCondition] = useInput(item?.salesCondition || '');
  const [profit, setProfit] = useState(item?.profit || 0.0);
  const [note, setNote] = useInput(item?.note || '');

  const [yearList, setYearList] = useState<Array<number>>([]);

  useEffect(() => {
    const startYear = new Date().getFullYear() - 5;
    const endYear = new Date().getFullYear() + 5;
    const list = [];
    for (let i = startYear; i <= endYear; i++) {
      list.push(i);
    }

    setYearList(list);
  }, []);

  const onYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    value && setYear(Number(value));
  };

  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setType(value);
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCategory(value);
  };

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = e.target;
    const { target } = dataset;
    const filterCharacter = value.replace(/[^0-9.]/g, ''); // 입력값이 숫자가 아니면 공백
    const inputNumber = filterCharacter ? Number(Number(filterCharacter).toFixed(4)) : 0;

    if (target === 'purchase') {
      setPurchaseDiscount(inputNumber);
    } else if (target === 'sales') {
      setSalesDiscount(inputNumber);
    } else if (target === 'profit') {
      setProfit(inputNumber);
    }
  };

  const onSubmitClick = () => {
    const data = {
      year,
      type,
      category,
      productFamily,
      purchaseDiscount,
      purchaseCondition,
      salesDiscount,
      salesCondition,
      profit,
      note,
    };

    if (item) {
      dispatch(updateDiscount({ ...data, id: item.id }));
    } else {
      dispatch(insertDiscount(data));
    }
    setSelItem(undefined);
  };

  return (
    <Dialog disableEscapeKeyDown disableBackdropClick open={open} onClose={onClose}>
      <DialogTitle>프로모션 항목 {!item ? '추가' : '수정'}</DialogTitle>
      <DialogContent>
        <div>
          <div>년도</div>
          <div>
            <select value={year} onChange={onYearChange}>
              {yearList.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div>분류</div>
          <div>
            <select value={type} onChange={onTypeChange}>
              <option value="DINE">DINE</option>
              <option value="KORLOY">KORLOY</option>
            </select>
          </div>
        </div>
        <div>
          <div>구분</div>
          <div>
            <select value={category} onChange={onCategoryChange}>
              <option value="일반">일반</option>
              <option value="대량">대량</option>
            </select>
          </div>
        </div>
        <div>
          <div>제품군</div>
          <div>
            <input type="text" value={productFamily} onChange={setProductFamily} />
          </div>
        </div>
        <div>
          <div>사입할인율</div>
          <div>
            <input
              type="number"
              value={purchaseDiscount}
              onChange={onChangeNumber}
              step={0.0001}
              data-target="purchase"
            />
          </div>
        </div>
        <div>
          <div>추가조건</div>
          <div>
            <input type="text" value={purchaseCondition} onChange={setPurchaseCondition} />
          </div>
        </div>
        <div>
          <div>판매할인율</div>
          <div>
            <input
              type="number"
              value={salesDiscount}
              onChange={onChangeNumber}
              step={0.0001}
              data-target="sales"
            />
          </div>
        </div>
        <div>
          <div>추가조건</div>
          <div>
            <input type="text" value={salesCondition} onChange={setSalesCondition} />
          </div>
        </div>
        <div>
          <div>이익률</div>
          <div>
            <input
              type="number"
              step={0.0001}
              value={profit}
              onChange={onChangeNumber}
              data-target="profit"
            />
            %
          </div>
        </div>
        <div>
          <div>비고</div>
          <div>
            <input type="text" value={note} onChange={setNote} />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <button className="button-submit" onClick={onSubmitClick}>
          {!item ? '등록' : '수정'}
        </button>
        <button className="button-cancel" onClick={onClose}>
          취소
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default DiscountModal;
