import { useState } from 'react';
import { v4 as uuidv4} from 'uuid';
import Data from './Data';
import Record from './Record';

export default function Form() {
    const [tracks, setTrack] = useState([
      {id: 1, data: new Date(2023, 5, 27), value: 10},
      {id: 2, data: new Date(2023, 5, 28), value: 5.4},
    ])

    const [data, setData] = useState()
    const [dist, setDist] = useState()

    const handleFormChange = (evt) => {
      const { name, value } = evt.target;
      if (name === 'data') {
        setData(value);
      }
      if (name === 'dist') {
        if (Number(value) <= 0) {
          return
        }
        setDist(Number(value))
      }
    }
  
    const handleAddTrack = (evt) => {
      evt.preventDefault();
      if(data === '' || dist === '') {
        return;
      }
      const d = data.split('.')
      const newData = new Date(d[2], d[1] - 1, d[0])
      if (newData == 'Invalid Date') {
        return
      }
      const index = tracks.findIndex(item => item.data.getTime() === newData.getTime());
      if (index !== -1) {
        tracks[index].value += Number(dist) 
      } else {
        const newTrack = {id: uuidv4(), data: newData, value: dist};
        setTrack(prevTrack => [...prevTrack, newTrack]); 
      }
      setData('');
      setDist('');
    }
  
    const handleDelete = (track) => {
      setTrack(prevTrack => prevTrack.filter(o => o.id !== track.id));
    }
   
    return (
      <>
        <Record data={data} dist={dist} handleFormChange={handleFormChange} handleAddTrack={handleAddTrack}/>
        <Data tracks={tracks} handleDelete={handleDelete}/> 
      </>
    )
}