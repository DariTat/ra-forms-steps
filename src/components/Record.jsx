export default function Record({data, dist, handleFormChange, handleAddTrack}) {
    return (
        <form className='form_add' onSubmit={handleAddTrack}>
        <p>Дата(ДД.ММ.ГГ)
        <input name='data' value={data} onChange={handleFormChange}/>
        </p>
        <p>Пройдено км
        <input type="number"  name='dist' value={dist} onChange={handleFormChange}/>
        </p>
        <button className='btn_add'>ОК</button>
      </form>
    )
}