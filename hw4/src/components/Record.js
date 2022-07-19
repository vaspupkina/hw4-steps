import React from 'react'
import PropTypes from 'prop-types'

/* Функциональный компонент записи прогулки */
function Record({date, distance, onEditClick, onRemoveClick}) {
    // функция преобразовывает дату из строки YYYY-mm-dd в строку dd.mm.YYYY
    const convertDate = (date)=>{
        var dateStamp = Date.parse(date); // сначала парсим строку и получаем timestamp
        return new Date(dateStamp).toLocaleDateString("ru-RU"); // затем создаем по timestamp объект Date и форматируем по местной локали 
      }

  return (
    <ul>
        <li style={{display : 'inline'}}>{convertDate(date)}&nbsp;&nbsp;</li>
        <li style={{display : 'inline'}}>{distance}&nbsp;&nbsp;</li>
        <li style={{display : 'inline'}}>
            <button onClick={() => { onEditClick(date); }}>✎</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => { onRemoveClick(date); } }>✘</button>
        </li>
    </ul>
  )
}

Record.propTypes = {
    date: PropTypes.string.isRequired,
    distance : PropTypes.string.isRequired,
    onEditClick : PropTypes.func.isRequired,
    onRemoveClick : PropTypes.func.isRequired
}

export default Record
