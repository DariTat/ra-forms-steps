import { useState } from 'react';
import { v4 as uuidv4} from 'uuid';

export default function Steps() {
    const [tracks, setTrack] = useState([
      {id: 1, data: new Date(2023, 5, 27), value: 10},
      {id: 2, data: new Date(2023, 5, 28), value: 5.4},
    ])

    const [data, setData] = useState('')
    const [dist, setDist] = useState('')

    const handleFormChange = (evt) => {
      const { name, value } = evt.target;
      if (name === 'data') {
        const data = value.split('.')
        const d = new Date(data[2], data[1] - 1, data[0])
        setData(d);
      }
      if (name === 'dist') {
        setDist(value)
      }
    }
  
    const handleAddTrack = (evt) => {
      evt.preventDefault();
      if(data === '' || dist === '') {
        return;
      }
      const index = tracks.findIndex(item => item.data.getTime() === data.getTime());
      if (index !== -1) {
        tracks[index].value += Number(dist) 
      } else {
        const newTrack = {id: uuidv4(), data: data, value: Number(dist)};
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
      <form className='form_add' onSubmit={handleAddTrack}>
        <p>Дата(ДД.ММ.ГГ)
        <input type='text' name='data' value={data} onChange={handleFormChange}/>
        </p>
        <p>Пройдено км
        <input type='text' name='dist' value={dist} onChange={handleFormChange}/>
        </p>
        <button className='btn_add'>ОК</button>
      </form>
      <div>
        <p className='list'><span>Дата(ДД.ММ.ГГ)</span><span>Пройдено км</span><span>Действия</span></p>
        <ul className='track_list'>
          {tracks.sort((a, b) => b.data.getTime() - a.data.getTime()).map(track => (
            <li key={track.id} className='track'>
              <span>{track.data.toLocaleDateString()}</span>
              <span>{track.value}</span>
              <button className='btn_delete' onClick={() => handleDelete(track)}>x</button>
            </li>
          ))}
        </ul>
      </div>
      </>
    )
}