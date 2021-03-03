import Link from 'next/link'
import Layout from '../layout'
import ndStyle from '../assets/styles/utils/newData.module.scss'
import table from '../assets/styles/table/table.module.scss'
import React, { useEffect, useState } from 'react';
import { getEmployees } from '../services/Employee/employeeList'

export default function Table() {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const t = [
    {
      id: 1,
      first_name: "sdfgh",
      last_name: "sdfgh",
      username: "sdfgh",
    },
    {
      id: 2,
      first_name: "rtyui",
      last_name: "rtyui",
      username: "rtyui",
    },
    {
      id: 3,
      first_name: "sdfghrtyui",
      last_name: "sdfghrtyui",
      username: "sdfghrtyui",
    },
    {
      id: 4,
      first_name: "wertyhnm,",
      last_name: "wertyhnm,",
      username: "wertyhnm,",
    },
    {
      id: 5,
      first_name: "oiuygfy789",
      last_name: "oiuygfy789",
      username: "oiuygfy789",
    },
  ]

  useEffect(() => {
    getEmployees().
      then(res => res.data).
      then(data => {
        setRowData(data.data)
      }).
      catch(err => console.error(err))
  }, []);

  return (
    <Layout>
      <div className={ndStyle.newData}>
        <button className={ndStyle.newDataButton}>
          افزودن کارمند جدید
          </button>
      </div>
      <div className={table.container}>
        <div className={table.header}>
          <div className={table.column}>
            نام
          </div>
          <div className={table.column}>
            نام خانوادگی
          </div>
          <div className={table.column}>
            نام کاربری
          </div>
        </div>
        <div className={table.body}>
          {rowData.map(row =>
            <div className={table.row}>
              <div className={table.column}>
                {row.first_name}
              </div>
              <div className={table.column}>
                {row.last_name}
              </div>
              <div className={table.column}>
                {row.username}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};