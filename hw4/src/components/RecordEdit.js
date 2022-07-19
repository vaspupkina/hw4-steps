import React, { useState } from 'react'
import PropTypes from 'prop-types'

/* Функциональный компонент редактирования записи прогулки 
date - string
distance - string
isEdit - bool флаг, означающий что мы в режиме редактирования
onSubmit - обработчик отправки новой записи или сохранения изменений редактирования */
function RecordEdit({date, distance, isEdit, onSubmit}) {
    const [form, setForm] = useState({ date : date, 
                                    distance : distance});

    // обработчик нажатия на ОК\Сохранить
    const handleSubmit = (event) => {
        // исключаем любую иную обработку события
       if (event) {
           event.preventDefault();
           event.stopPropagation();
       }

       // вызываем переданный обработчик с данными записи
       onSubmit(form);
    }

    // обработчик события внесения изменений в дату или дистанцию
    const handleChange = (event) => {
        // исключаем любую иную обработку события
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        // меняем стейт, указывая для каждого поля с именем event.target.name
        // значение event.traget.value. Например, input с именем "date" поменяет
        // поле стейта с именем "date" на значение этого инпута
        setForm( (prevForm) => {
            return {...prevForm, [event.target.name] : event.target.value};
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {isEdit && <label key="RecordEditMode">Редактирование&nbsp;&nbsp;</label>}
            <label key="RecordEditDateLabel" htmlFor='date'>Дата ДД.ММ.ГГ</label> &nbsp;
            <input key="RecordEditDate" disabled={isEdit} id="date" name="date" type="date" value={form.date} onChange={handleChange}/> &nbsp;
            <label key="RecordDistanceLabel" htmlFor='distance'>Пройдено км</label> &nbsp;
            <input key="RecordDistanceDistance" id="distance" name="distance" type="number" value={form.distance} onChange={handleChange}/> &nbsp;
            <button type="submit">{isEdit ? "Сохранить": "Ok"}</button>
        </form>
    )
}

RecordEdit.propTypes = {
    date : PropTypes.string,
    distance : PropTypes.string,
    onSubmit : PropTypes.func
}

export default RecordEdit
