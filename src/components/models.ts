import moment from "moment"
import API from "../api"

export interface RoomModel{
    id: number,
    name: string,
    pricePerMonth: number,
    remarks: number | null,
    capacity: number
}

export interface ProfileModel{
    id: number,
    name: string,
    gender: string,
    contactNumber: string
}

export interface RentModel{
    id: number,
    profileId: number,
    roomId: number,
    startDateTime: string,
    endDateTime: string,
    remarks: string,
    status: number
}

export interface CreateRentModel{
    profileId: number,
    roomId: number,
    startDateTime: string,
    remarks: string,
}

export interface RentDetailModel{
  rent: RentModel,
  room: RoomModel,
  profile: ProfileModel
}

export interface PaymentModel{
  id: number,
  rentId: number,
  totalAmount: string,
  paidAmount: string,

  balance: string,
  periodCoveredStartDate: string,
  periodCoveredEndDate: string,
  paidDateTime: string,
  status: number,
  particulars: string| null,
  paidBy: string,
  paymentForRoom: boolean
}

export enum RentStatus
{
    Active = 0,
    Inactive = 1,
    Transferred = 2
}

export function numberWithCommas(x:number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  export function stringAvatar(name: string) {
    let acronym = ''
    if ( name.split(' ').length == 1){
        acronym = name[0][0]
    }else{
        acronym = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: acronym,
    };
  }

  export function debounce (fn: any, time: any) {
    let timeoutId: any
    return wrapper
    function wrapper (...args:any) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        timeoutId = null
        fn(...args)
      }, time)
    }
  }

  export function formatMMDDYYYY(dt: Date){
    return (dt.getMonth() + 1) + 
    "/" +  dt.getDate() +
    "/" +  dt.getFullYear();
  }

  export function getStrDateToday(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let strToday = `${yyyy}-${mm}-${dd}`;
    return strToday;
  }

  export function dateToApi(dt: Date | null){
    if (!dt) return null;
    return {
        year: dt.getFullYear(),
        month: dt.getMonth()+1,
        day: dt.getDay()
    }
  }

  export function formatDateStr(dtStr: string, format?:string){
    if (!dtStr) return ''
    return moment(dtStr).format(format ?? `ll`)
  }

  export interface Payment{
    payment: PaymentModel,
    rent: RentModel,
    room: RoomModel,
    profile: ProfileModel
  }

  const getProfile = async (id:number) => (await API.get(`/Profiles/${id}`)).data
  const getRent = async (id:number) => (await API.get(`/Rents/${id}`)).data
  const getRoom = async (id:number) => (await API.get(`/Rooms/${id}`)).data
  
  interface LoadPaymentParams{
    setPayments: (data:Payment[]) => void,
    setLoading?: (loading:boolean) => void,
    getPayments: () => PaymentModel[],
  }
  export async function loadPayments(params: LoadPaymentParams){
    const {setPayments, setLoading, getPayments} = params
    const payments = await getPayments()
    const data: Payment[] = []
    for(const p of payments){
      const rent = await getRent(p.rentId)
      const room = await getRoom(rent.roomId)
      const profile = await getProfile(rent.profileId)
      data.push({
        payment: p, rent, room, profile
      })
    }
    setPayments(data)
    setLoading && setLoading(false)
  }