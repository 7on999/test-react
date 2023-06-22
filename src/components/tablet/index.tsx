import TabletCell from '../tablet-cell';
import styles from './tablet.module.css'

export type Cell = {
  field: string|number
  isProhibitEdit: boolean
}

type Props = {
  headers: string[]
  data: Cell[][]
  onClickRow?: (i:number)=>void
  classname?: string
}

export function Table({headers, data, onClickRow, classname}: Props) {

  return (
    <table className={`${styles.table} ${classname}`}>
      <thead>
        <tr>
          {headers.map((headerText) => (
            <th key={headerText} className={styles.headers}>{headerText}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((tableRow:Cell[], index:number) => ( 
          <tr key={tableRow[0].field+String(index)} onClick={onClickRow? ()=>onClickRow(index):undefined} className={styles.row}>
            {tableRow.map((cellElement:Cell)=>(
              <TabletCell key={cellElement.field+String(index)} textValue={String(cellElement.field)} index={index} prohibitEdit={cellElement.isProhibitEdit}/>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
