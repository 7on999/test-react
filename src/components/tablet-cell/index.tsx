import { useState, memo } from "react"

import styles from './cell.module.css'

import { useAppDispatch} from '../../store/hooks'
import { changeTrainSpeed } from '../../store/reducer'

type Props = {
  textValue:string;
  prohibitEdit:boolean;
  index: number;
}

function TabletCell({textValue, prohibitEdit=false, index}:Props){
  const dispatch = useAppDispatch()
  const [value, setValue] = useState(textValue) 

  const handeChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(event.target.value)
    dispatch(changeTrainSpeed({indexSpeed:index, value:Number(event.target.value)})) 
  }

  return (
    <td className={styles.cell}> 
      <input  className={styles.input} readOnly={prohibitEdit} value={value} onChange={handeChange} type="text"/>
    </td>
  )
}

export default memo(TabletCell)
