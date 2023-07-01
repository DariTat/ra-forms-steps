export default function Data({tracks, handleDelete }) {
    return (
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
    )
}