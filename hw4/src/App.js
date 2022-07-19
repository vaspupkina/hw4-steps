import { useState } from 'react';
import './App.css';
import RecordEdit from './components/RecordEdit';
import RecordList from './components/RecordList';

/* Функциональный компонент приложения учета прогулок */
function App() {
  const [state, setState] = useState({records : [],       // записи прогулок 
                                      editIndex : -1});   // индекс текущей редактируемой записи
  
  /* Обработчик отправки формы RecordEdit */
  const handleOnSubmit = (form) => {  
    setState((prevState) => {
      // ищем есть ли уже запись на дату, возвращаем ее индекс или -1, если не нашли
      var currentIndex = state.records.findIndex((item) => { 
        return item.date === form.date; 
      });

      // если нашли уже запись
      if (currentIndex >= 0) {
        // проверяем, не находимся ли в режиме редактирования
        if (prevState.editIndex >= 0) {
          // просто перезаписываем дистанцию
          prevState.records[currentIndex].distance = form.distance;
        } 
        else {
          // иначе прибавляем к уже пройденной дистанции новое значение
          // важно: данные у нас хранятся как строки, поэтому мы приводим оба слагаемых к числовому float
          prevState.records[currentIndex].distance = parseFloat(prevState.records[currentIndex].distance) + parseFloat(form.distance);
        }
        // затем удостоверяемся, что пройденная дистанция у нас снова будет храниться как строка
        prevState.records[currentIndex].distance = prevState.records[currentIndex].distance.toString();
      } 
      else {
        // если записей на заданную дату не нашлось, добавляем новую
        prevState.records.push({date : form.date, distance : form.distance});
      }
      // меняем стейт с новым массивом записей и сбрасываем режим редактирования
      return {...prevState, editIndex: -1, records : prevState.records};
    });  
  }

  // обработчик щелчка включения режима редактирования
  const handleOnEditClick = (date) => {
      setState( (prevState) => {
        // получаем индекс редактируемой записи в массиве
        var currentIndex = prevState.records.findIndex((item) => { 
                                    return item.date === date; 
                              });
        // включаем режим редактирования путем указания индекса редактируемой записи
        return {...prevState, editIndex : currentIndex};
      });
  }

  // обработчик щелчка удаления записи
  const handleOnRemoveClick = (date) => {
    setState( (prevState) => {
      return {...prevState, records: prevState.records.filter((item) => { // оставляем только те записи, где не совпадает дата
                            return item.date !== date;
                            }), editIndex : -1}; // сбрасываем режим редактирования
    });
  }

  // функция возвращает объект с данными текущей редактируемой записи или 
  // объект с пустыми полями, если редактирование не активно
  const getCurrentEditRecord = () => {
    var currentRecord = {date : undefined, distance : undefined};
    if (state.editIndex >= 0) {
      currentRecord = state.records[state.editIndex];
    }
    return currentRecord;
  }

  return (
    <>
      {/* передаем props через spread полей, возвращаемых getCurrentEditRecord
          ВАЖНО: в качестве ключа выставляем режим редактирования, чтобы RecordEdit обновлялся когда мы
          входим в этот режим или выходим из него */}
      <RecordEdit onSubmit={handleOnSubmit} {...getCurrentEditRecord()} key={state.editIndex} isEdit={state.editIndex >= 0}/>
      <br/>
      <RecordList records={state.records} onEditClick={handleOnEditClick} onRemoveClick={handleOnRemoveClick} />
    </>
  );
}

export default App;
