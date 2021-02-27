import Layout from '../layout'
import ndStyle from '../assets/styles/utils/newData.module.scss'
import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { getEmployees } from '../services/Employee/employeeList'

export default function Table() {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [rowData]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    getEmployees().
      then(res => res.data).
      then(data => setRowData(data.data)).
      catch(err => console.error(err))
  };

  return (
    <Layout>
      <div className={ndStyle.newData}>
        <button className={ndStyle.newDataButton}>
          افزودن کارمند جدید
          </button>
      </div>
      <div className={`table__Container`} style={{ height: '100%' }}>
        <div style={{ marginBottom: '5px' }}>
        </div>
        <div style={{ height: 'calc(100% - 25px)' }} className="ag-theme-alpine">
          <div style={{ width: '100%', height: '100%' }}>
            <AgGridReact
              modules={[ClientSideRowModelModule]}
              rowData={rowData}
              rowClass={`tableRow`}
              onGridReady={onGridReady}>
              <AgGridColumn headerName="نام" field="first_name" width={150} />
              <AgGridColumn headerName="نام خانوادگی" field="last_name" width={150} />
              <AgGridColumn headerName="نام کاربری" field="username" width={150} />
            </AgGridReact>
          </div>
        </div>
      </div>
    </Layout>
  );
};