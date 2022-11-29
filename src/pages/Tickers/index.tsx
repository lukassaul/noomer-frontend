import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store"
import Button from '../../components/Button'
import Alert from '../../components/AlertMessage'
import Footer from '../../components/Footer';
import { getTickers } from '../../features/pageTickerSlice'
import { setTicker } from '../../features/tickerSlice'
import { clearSearchProduct } from '../../features/searchSlice'
import { formatCurrency } from '../../utils/formatCurrency'

import { useTable, useGlobalFilter, usePagination } from 'react-table'

import styled from 'styled-components';
import { CommonContainer, CommonContentContainer } from '../../globalStyles'
import { DesktopResultWrapper, MobileResultWrapper } from './styles'


// Our table component
function Table({ columns, data }: any) {
  const props = useTable(
    {
      columns,
      data
    },
    useGlobalFilter, // useGlobalFilter!
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter }
  } = props;
  console.log(props);
  React.useEffect(() => {
    // props.dispatch({ type: actions.resetPage })
    console.log(globalFilter);
  }, [globalFilter]);

  return (
    <>
      Search
      <input
        className="search-form-control"
        type="text"
        value={globalFilter || ""}
        onChange={e => setGlobalFilter(e.target.value)}
      />
      <DesktopResultWrapper>
        <table className="table table-whitebg" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    {/* Render the columns filter UI */}
                  </th>
                ))
                }

              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, i: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </DesktopResultWrapper>

      <MobileResultWrapper>
        <table className="table" style={{fontSize: '10px'}}>
          <tbody>
            {page.map((row: any, i: any) => {

              return <tr {...row.getRowProps()} >
                  <td>
                    {row.cells.map((cell: any) => {
                      return (
                        <p {...cell.getCellProps()}>{cell.render("Cell")}</p>
                      );
                    })}
                  </td>
                </tr>

            })}
          </tbody>
        </table>
      </MobileResultWrapper>


      <div className="rt-pagination">
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <span>
            Page{" "}

            {pageIndex + 1} of {pageOptions.length}
            {" "}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {">>"}
          </button>{" "}

        </div>
        <DesktopResultWrapper>
          <span style={{marginLeft: "8px"}}>
            Go to page:
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>
        </DesktopResultWrapper>
        <div style={{marginLeft: "8px"}}>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows:any, id:any, filterValue:any) {
  return rows.filter((row:any) => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val:any) => typeof val !== 'number'



function Tickers() {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {
    pageTickers,
    isGetTickerSuccess,
    isFetchingTicker,
    errorFetchingTickerMessage
  } = useSelector((state: RootState) => state.pageTickers)

  useEffect(() => {
    dispatch(getTickers("tickers"));
  }, [dispatch]);

  //console.log("pageTickers: ", pageTickers)

  const tickerColorArray = ["#EE1D52", "#F7931A", "#0D5EBA", "#B23B3B", "#22A39F"]
  const getRandomColor = () => {
    return Math.floor(Math.random() * 5)
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Product Tickers',
        columns: [
          {
            Header: 'Ticker',
            accessor: '_id.ticker',
            filter: 'fuzzyText',
            Cell: (props: any) => {
              return (
                <p style={{ color: tickerColorArray[getRandomColor()] }}>
                  {props.value}
                </p>
              );
            }
          },
          // {
          //   Header: 'Country',
          //   accessor: 'country',
          //   filter: 'fuzzyText',
          // },
          {
            Header: 'Location',
            accessor: 'state',
            filter: 'fuzzyText',
            Cell: (props: any) => props?.cell?.value !== "undefined" ?  `${props.row.original.country}, ${props.row.original.state}, ${props.row.original.city}` : `${props.row.original.country}, ${props.row.original.city}`
          },
          // {
          //   Header: 'City',
          //   accessor: 'city',
          //   filter: 'fuzzyText',
          // },
          {
            Header: 'Average Price',
            accessor: 'average',
            filter: 'fuzzyText',
            Cell: (props: any) => { return (
              <p>{props?.cell?.value ? formatCurrency(props.cell.value, props.row.original.currency) : null}</p>
            )}
          },
          {
            Header: "",
            accessor: "view",
            Cell: (instance:any) => (
              <div>
                <Button
                  onClick={() => {
                    console.log("open ticker page")
                    dispatch(setTicker(instance.row.original._id.ticker))
                    dispatch(clearSearchProduct())
                    navigate('/listing')
                  }}
                  color="noomerRed"
                >
                  View
                </Button>
              </div>
            )
          },
        ],
      },
    ],
    []
  )

  return (
    <>
      <CommonContainer>
        <CommonContentContainer className="p2emreponsive">

        {isGetTickerSuccess ? <Table columns={columns} data={pageTickers} /> : "Fetching tickers"}

        </CommonContentContainer>
      </CommonContainer>
      <Footer />
    </>
  )
}

export default Tickers;
