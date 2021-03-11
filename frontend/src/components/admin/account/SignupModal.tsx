import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import useInput from 'lib/useInput';

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: ({
    id,
    password,
    isMaster,
  }: {
    id: string;
    password: string;
    isMaster: boolean;
  }) => void;
}
function SignupModal({ open, onClose, onSubmit }: SignupModalProps) {
  const [id, setId] = useInput('');
  const [password, setPassword] = useInput('');
  const [isMaster, setIsMaster] = useState(false);

  const onSubmitClick = () => {
    onSubmit({ id, password, isMaster });
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value === 'radio_true') {
      setIsMaster(true);
    } else {
      setIsMaster(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>사용자 추가</DialogTitle>
      <DialogContent>
        <TextField label="ID" fullWidth value={id} onChange={setId} />
        <TextField
          type="password"
          label="Password"
          fullWidth
          value={password}
          onChange={setPassword}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">관리자 여부</FormLabel>
          <RadioGroup
            aria-label="master"
            name="master"
            value={'radio_' + isMaster}
            onChange={onRadioChange}
          >
            <FormControlLabel value="radio_true" control={<Radio />} label="관리자" />
            <FormControlLabel value="radio_false" control={<Radio />} label="사용자" />
          </RadioGroup>
        </FormControl>
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

export default SignupModal;
