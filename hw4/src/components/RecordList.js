import React from 'react'
import PropTypes from 'prop-types'
import Record from './Record';

/* Функциональный компонент отображения списка записей прогулок */
function RecordList({records, onEditClick, onRemoveClick}) {    
  return (<>
    <ul>
        <li style={{display : "inline"}}>Дата (ДД.ММ.ГГГГ)</li>&nbsp;
        <li style={{display : "inline"}}>Пройдено км</li>&nbsp;
        <li style={{display : "inline"}}>Действия</li>&nbsp;
    </ul>
    {
        // сначала сортируем записи по возрастанию даты и маппим результат в список компонентов Record
        records.sort((a,b) => {return Date.parse(a.date) - Date.parse(b.date); })
        .map( (record) => { // ВНИМАНИЕ НА ТОЧКУ ПЕРЕД map ! Я просто перенес строку для читаемости
            return <><Record {...record} key={record.date} onEditClick={onEditClick} onRemoveClick={onRemoveClick} /><br/></>;
        })
    }
  </>)
}

RecordList.propTypes = {
    records : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default RecordList
