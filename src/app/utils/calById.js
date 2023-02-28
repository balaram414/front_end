import axios from 'axios';
export function calById(url) {
  let result = axios.get(url).then((response) => {   
    console.log('-------------' + JSON.stringify(response.data.data) + '======================>');
  });
  return result.data.data
}
