import { useEffect, useState } from 'react';
import { Table, Cell } from './components/table/index'
import { useAppSelector, useAppDispatch  } from './store/hooks'
import { fetchTrains } from './store/action-creators'
import { selectTrain } from './store/reducer'
import type { SpeedLimit } from './store/reducer'

import './reset.css';
import styles from './app.module.css'

function App() {

  const dispatch = useAppDispatch()

  const trainsInfo = useAppSelector(state=>state.trains.data)
  const isLoading = useAppSelector(state=>state.trains.isLoading)
  const selectedRow = useAppSelector(state=>state.trains.selectedTrainIndex)

  const [limitSpeedsTableData, setLimitSpeedsTableData] = useState<Cell[][]>([])

  const headersTrainsTable = ['Название', 'Описание']
  const headersSpeedsTable = ['Название', 'Ограничение по скорости']
  const trainTableData:Cell[][] = trainsInfo.map(objTrain=>[{field:objTrain.name, isProhibitEdit:true}, {field:objTrain.description, isProhibitEdit:true}])


  useEffect(()=>{
    dispatch(fetchTrains())
  }, [dispatch])

  const onClickRow = (index:number)=>{
    dispatch(selectTrain(index))
  }

  useEffect(()=>{
    if (selectedRow!==null){
      const dataForSecondTable = trainsInfo[selectedRow].speedLimits.map(obj=>Object.values(obj))
      const dataForSecondTableEdit = dataForSecondTable.map(arrValues=>arrValues.map((text, index)=>({field:text, isProhibitEdit:!index})))

      setLimitSpeedsTableData(dataForSecondTableEdit)
    } 

  }, [selectedRow])

  const onBtnClick = ()=>{
    if (selectedRow!==null){
      const arrForSendToServerBeforeSort = structuredClone(trainsInfo[selectedRow].speedLimits)
      
      const checkValid = arrForSendToServerBeforeSort.every(({speedLimit}:SpeedLimit)=>typeof(speedLimit)==='number' && speedLimit>0)

      if (!checkValid) {
        alert('Dы ввели неккоретные данные:скоростные ограничения должны быть положительными целыми числами.')
      } else {
        const arrForSendToServer = arrForSendToServerBeforeSort.sort((a:SpeedLimit,b:SpeedLimit)=>a.speedLimit-b.speedLimit)
        console.log('arrForSendToServer:', arrForSendToServer)
        alert('Данные на сервер успешно отправлены, массив скоростных ограничений выведен в консоле')
      }
    }
  }

  return (
    <main className={styles.main}>
      {isLoading && <h1> Идет загрузка </h1>}
      
      <div className={styles.permissionBlockWrapper}>
        <h3> Ограничения по скорости </h3>
        <Table data={trainTableData} headers={headersTrainsTable} onClickRow={onClickRow} classname={styles.table1}/>
      </div>
      
      { (selectedRow!==null) && 
      <div className={styles.wrapperTableBtn}>
         <div> 
          <h3> Поезда </h3>
          <h3> {`Поезд №${selectedRow}`}</h3>
          <Table data={limitSpeedsTableData} headers={headersSpeedsTable} classname={styles.table2}/>
        </div>
        <button className={styles.btn} onClick={onBtnClick}> Отправить данные</button>
      </div>
      }
    </main> 
  );
}

export default App;
