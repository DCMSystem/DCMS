import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/hooks';
import {
  getPromotions,
  openPromotionModal,
  closePromotionModal,
  deletePromotion,
} from 'app/promotion/promotionThunk';
import { PromotionInfo } from 'app/promotion/promotionSlice';
import PromotionModal from './PromotionModal';

function PromotionListTH({ isMaster }: { isMaster: boolean }) {
  return (
    <tr>
      <td>구분</td>
      <td>제품군</td>
      <td>사입할인율</td>
      <td>추가조건</td>
      <td>판매할인율</td>
      <td>추가조건</td>
      <td>이익률</td>
      <td>비고</td>
      {isMaster && (
        <Fragment>
          <td></td>
          <td></td>
        </Fragment>
      )}
    </tr>
  );
}

function PromotionListTR({
  idx,
  listCount,
  item,
  isMaster,
  onEditItem,
  onDeleteItem,
}: {
  idx: number;
  listCount: number;
  item: PromotionInfo;
  isMaster: boolean;
  onEditItem: (e: React.MouseEvent<HTMLElement>) => void;
  onDeleteItem: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <tr key={item.id}>
      {idx === 0 && <td rowSpan={listCount}>{item.category}</td>}
      <td>{item.productFamily}</td>
      <td>{item.purchaseDiscount}</td>
      <td>{item.purchaseCondition}</td>
      <td>{item.salesDiscount}</td>
      <td>{item.salesCondition}</td>
      <td>{item.profit}%</td>
      <td>{item.note}</td>
      {isMaster && (
        <Fragment>
          <td>
            <button onClick={onEditItem} data-itemid={item.id}>
              수정
            </button>
          </td>
          <td>
            <button onClick={onDeleteItem} data-itemid={item.id}>
              삭제
            </button>
          </td>
        </Fragment>
      )}
    </tr>
  );
}

function Promotion() {
  const dispatch = useDispatch();
  const { promotionModal, promotionList, year } = useAppSelector((state) => state.promotion);
  const { userInfo } = useAppSelector((state) => state.user);
  const dineDefaultList = promotionList.filter(
    (data) => data.type === 'DINE' && data.category === '일반'
  );
  const dineMassiveList = promotionList.filter(
    (data) => data.type === 'DINE' && data.category === '대량'
  );
  const korloyDefaultList = promotionList.filter(
    (data) => data.type === 'KORLOY' && data.category === '일반'
  );
  const korloyMassiveList = promotionList.filter(
    (data) => data.type === 'KORLOY' && data.category === '대량'
  );
  const [selItem, setSelItem] = useState<PromotionInfo | undefined>();

  const [yearList, setYearList] = useState<Array<number>>([]);

  useEffect(() => {
    const startYear = new Date().getFullYear() - 5;
    const endYear = new Date().getFullYear() + 5;
    const list = [];
    for (let i = startYear; i <= endYear; i++) {
      list.push(i);
    }

    setYearList(list);
    dispatch(getPromotions({ year }));
  }, [dispatch]);

  const onYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    value && dispatch(getPromotions({ year: Number(value) }));
  };

  const onInsertClick = () => {
    dispatch(openPromotionModal());
  };

  const onClosePromotionModal = () => {
    setSelItem(undefined);
    dispatch(closePromotionModal());
  };

  const onEditItem = (e: React.MouseEvent<HTMLElement>) => {
    const itemId = e.currentTarget.getAttribute('data-itemid');
    if (itemId) {
      setSelItem(promotionList.filter((data) => data.id === itemId)[0]);
      dispatch(openPromotionModal());
    }
  };

  const onDeleteItem = (e: React.MouseEvent<HTMLElement>) => {
    const response = window.confirm('삭제하시겠습니까?');
    if (!response) {
      return;
    }

    const itemId = e.currentTarget.getAttribute('data-itemid');
    if (itemId) {
      dispatch(deletePromotion({ id: itemId }));
    }
  };

  return (
    <div className="promotion-wrapper">
      <div>
        <select value={year} onChange={onYearChange}>
          {yearList.map((data) => (
            <option key={data} value={data}>
              {data}
            </option>
          ))}
        </select>
      </div>
      <div>
        {userInfo.isMaster && <button onClick={onInsertClick}>추가</button>}
        <div className="company">
          <div>DINE</div>
          <table>
            <tbody>
              <PromotionListTH isMaster={userInfo.isMaster} />
              {dineDefaultList.map((data, idx) => (
                <PromotionListTR
                  idx={idx}
                  listCount={dineDefaultList.length}
                  item={data}
                  onEditItem={onEditItem}
                  onDeleteItem={onDeleteItem}
                  key={data.id}
                  isMaster={userInfo.isMaster}
                />
              ))}
              {dineMassiveList.map((data, idx) => (
                <PromotionListTR
                  idx={idx}
                  listCount={dineMassiveList.length}
                  item={data}
                  onEditItem={onEditItem}
                  onDeleteItem={onDeleteItem}
                  key={data.id}
                  isMaster={userInfo.isMaster}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="company">
          <div>KORLOY</div>
          <table>
            <tbody>
              <PromotionListTH isMaster={userInfo.isMaster} />
              {korloyDefaultList.map((data, idx) => (
                <PromotionListTR
                  idx={idx}
                  listCount={korloyDefaultList.length}
                  item={data}
                  onEditItem={onEditItem}
                  onDeleteItem={onDeleteItem}
                  key={data.id}
                  isMaster={userInfo.isMaster}
                />
              ))}
              {korloyMassiveList.map((data, idx) => (
                <PromotionListTR
                  idx={idx}
                  listCount={korloyMassiveList.length}
                  item={data}
                  onEditItem={onEditItem}
                  onDeleteItem={onDeleteItem}
                  key={data.id}
                  isMaster={userInfo.isMaster}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {promotionModal && (
        <PromotionModal
          open={promotionModal}
          onClose={onClosePromotionModal}
          item={selItem}
          setSelItem={setSelItem}
        />
      )}
    </div>
  );
}

export default Promotion;
