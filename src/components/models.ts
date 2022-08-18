export interface RoomModel{
    id: number,
    name: string,
    pricePerMonth: number,
    remarks: number | null
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
    name: string,
    gender: string,
    contactNumber: string,
    remarks: string,
    rentStatus: string
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