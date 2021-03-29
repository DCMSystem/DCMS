import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { EstimateInfo } from 'app/estimate/estimateSlice';

interface EstimateSelectModalProps {
  open: boolean;
  estimateList: Array<EstimateInfo>;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

function EstimateSelectModal({ open, estimateList, onClose, onSubmit }: EstimateSelectModalProps) {
  const [selectId, setSelectId] = useState(estimateList[0].id);

  const onSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectId(value);
  };

  const onSubmitClick = () => {
    onSubmit(selectId);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>견적서 선택</DialogTitle>
      <DialogContent>
        {estimateList.map((data) => (
          <div>
            <input
              type="radio"
              checked={data.id === selectId}
              value={data.id}
              onChange={onSelectChange}
              id={data.id}
            />
            <label htmlFor={data.id}>{data.estimateNumber}</label>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onSubmitClick}>
          확인
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EstimateSelectModal;
