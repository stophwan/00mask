import produce from 'immer'

const baseState = {
    loading: false,
    error: "",
    stores: [
        {
          addr: '서울특별시 송파구 가락로 277 (방이동)',
          code: '11800534',
          created_at: '2020/05/05 23:55:00',
          lat: 37.5126353,
          lng: 127.1195397,
          name: '방이메디칼약국',
          remain_stat: 'plenty',
          stock_at: '2020/05/04 08:41:00',
          type: '01'
        },
        {
          addr: '서울특별시 송파구 양재대로 1222 (방이동, 올림픽프라자상가 1층 94호)',
          code: '11845805',
          created_at: '2020/05/05 23:55:00',
          lat: 37.515374,
          lng: 127.132576,
          name: '종우약국',
          remain_stat: 'break',
          stock_at: '2020/05/04 10:09:00',
          type: '01'
        }
      ]
};

const reducer = produce((state, action) => {

}, baseState);

export default reducer;