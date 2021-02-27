import Layout from '../layout'
import ndStyle from '../assets/styles/utils/newData.module.scss'
import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

export default () => {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [rowData]);

  const onGridReady = (params) => {
    setGridApi(params.api);

    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://www.ag-grid.com/example-assets/olympic-winners.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var httpResult = JSON.parse(httpRequest.responseText);
        setRowData(httpResult);
      }
    };
  };

  return (
    <Layout>
      <div className={ndStyle.newData}>
        <button className={ndStyle.newDataButton}>
          درخواست مساعده
          </button>
      </div>
      <div style={{ height: '100%' }}>
        <div style={{ marginBottom: '5px' }}>
        </div>
        <div style={{ height: 'calc(100% - 25px)' }} className="ag-theme-alpine">
          <div style={{ width: '100%', height: '100%' }}>
            <AgGridReact
              modules={[ClientSideRowModelModule]}
              rowData={rowData}
              onGridReady={onGridReady}>
              <AgGridColumn headerName="ورزشکار" field="athlete" width={150} />
              <AgGridColumn field="age" width={90} />
              <AgGridColumn field="country" width={150} />
              <AgGridColumn field="year" width={90} />
              <AgGridColumn field="date" width={150} />
              <AgGridColumn field="sport" width={150} />
              <AgGridColumn field="gold" width={100} />
              <AgGridColumn field="silver" width={100} />
              <AgGridColumn field="bronze" width={100} />
              <AgGridColumn field="total" width={100} />
            </AgGridReact>
          </div>
        </div>
      </div>
    </Layout>
  );
};