import {
    ReactiveBase,
    DataSearch,
    ReactiveList,
    SingleDropdownList,
    SingleDataList,
    SelectedFilters
} from '@appbaseio/reactivesearch'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import ListingHeader from '../../components/ListingHeader'
import { RootState, AppDispatch } from '../../app/store'
import { setCategory } from '../../features/categorySlice'
import { setTicker } from '../../features/tickerSlice'
import { clearSearchProduct } from '../../features/searchSlice'
import { clearTicker } from '../../features/tickerSlice'
import getBufferDate from '../../utils/getBufferDate'
import getStatistics from '../../utils/getStatistics'
import {
    ListWrapper,
    FilterWrapper,
    DataWrapper,
    FilterWrapperMobile,
    FilterButtonWrapper,
    ArrowSmall,
    MobileIconProfile,
    DesktopResultWrapper,
    MobileResultWrapper
} from './styles'
import {
  CommonContainer,
  TitleThree,
  TitleFour,
  FlexBetweenRowContainer,
  FlexCenterColContainer
} from "../../globalStyles"
import { CSVLink } from 'react-csv';


type Result = {
  product: any;
  classification: null|string;
  quantity: null|number;
  unit: null|string;
  uploader: null|string;
  price: null|number;
  type: null|string;
  ticker: null|string;
  currency: null|string;
  store: null|string;
  location_city: null|string;
  location_state: null|string;
  location_country: null|string;
  longitude: null|string;
  latitude: null|string;
  product_image: null|string;
  receipt_image: null|string;
  description: null|string;
  createdAt: null|Date;
};

type Range = {
  range: null|string;
  members: null|Number;
}

function PriceListing() {
    const dispatch = useDispatch<AppDispatch>()
    let navigate = useNavigate()

    const { selectedCategory } = useSelector((state: RootState) => state.category)
    const { selectedTickerState } = useSelector((state: RootState) => state.ticker)
    const { searchProduct } = useSelector((state: RootState) => state.search)


    // Should set the reactivesearch single dropdown value
    const [selectedOption, setSelectedOption] = useState("")

    const [click, setClick] = useState(false);
    const [totalResult, setTotalResult] = useState(50);

    /**
      Variables that controls when to perform stat computations
    **/
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("WORLDWIDE");
    const [selectedTicker, setSelectedTicker] = useState("")
    const [performStat, setPerformStat] = useState(false);

    const [startingDate, setStartingDate] = useState<Date|null>();
    const [bufferDate, setBufferDate] = useState<Date|null>();
    const [currency, setCurrency] = useState<string|null>();
    const [highestPrice, setHighestPrice] = useState<string>();
    const [lowestPrice, setLowestPrice] = useState<string>();
    const [mean, setMean] = useState<string>();
    const [variance, setVariance] = useState<string>();
    const [standardDeviation, setStandardDeviation] = useState<string>();
    const [priceGroup, setPriceGroup] = useState<Range[]>([]);

    let profileUserId = localStorage.getItem('user')
    let token = localStorage.getItem('token')
    const cont = (item: object) => {
        console.log("cont function")
    }

    const handleClick = () => setClick(!click);

    const [ fileData, setFileData ] = useState<Result[]>([]);

    const fileHeaders = [
      {label: 'Type', key: 'type'},
      {label: 'Product', key: 'product.product_name'},
      {label: 'Classification', key: 'classification'},
      {label: 'Quantity', key: 'quantity'},
      {label: 'Unit', key: 'unit'},
      {label: 'Uploader Id', key: 'uploader'},
      {label: 'Price', key: 'price'},
      {label: 'currency', key: 'currency'},
      {label: 'Ticker', key: 'ticker'},
      {label: 'Store / Shop', key: 'store'},
      {label: 'City', key: 'location_city'},
      {label: 'State', key: 'location_state'},
      {label: 'Country', key: 'location_country'},
      {label: 'Longitude', key: 'longitude'},
      {label: 'Latitude', key: 'latitude'},
      {label: 'Product image', key: 'product_image'},
      {label: 'Receipt image', key: 'receipt_image'},
      {label: 'Description', key: 'description'},
      {label: 'Date', key: 'createdAt'},
    ]

    const setProduct = async(value:any) => {
      setSelectedProduct(value)
    }

    const setLocation = async(value:any) => {
      setSelectedLocation(value)
    }

    const setProductTicker = async(value:any) => {
      setSelectedTicker(value)
    }


    useEffect(() => {
      setSelectedProduct("");
      if(!selectedTickerState) setSelectedTicker("");
    }, [])

    useEffect(() => {
      setSelectedProduct(searchProduct)
    }, [searchProduct])

    useEffect(() => {
      if(selectedTickerState) setSelectedTicker(selectedTickerState)
    }, [selectedTickerState])

    useEffect(() => {
      if (selectedProduct && fileData.length > 0) {
        if(fileData[0].product) dispatch(setCategory(fileData[0].product.category.category))
      }
      if (selectedTicker && fileData.length > 0) {
        if(fileData[0].product) dispatch(setCategory(fileData[0].product.category.category))
      }
      if (selectedProduct !== "" && selectedLocation !== "WORLDWIDE") showStatistics()
      else if (selectedTicker !== "") showStatistics()
    }, [fileData])

    const showStatistics = async() => {

      /**
        If user filter the results by produc and location
        filter the response to get the records one month ago
        from the last creation date
      **/
      if(fileData.length > 0) {

        let currency = fileData[0].currency
        let dToday = fileData[0].createdAt
        let monthAgo = await getBufferDate(dToday)

        let bufferedRecords = await fileData.filter(
          function(item:any) {
            return new Date(item.createdAt).valueOf() > new Date(monthAgo).valueOf();
          }
        )

        let pricesArray:number[] = []

        //if (selectedTicker && selectedLocation === "WORLDWIDE") {
        if (selectedTicker) {
          let product = fileData[0].product.product_name
          let city = fileData[0].location_city
          let state = fileData[0].location_state
          let country = fileData[0].location_country

          let location = ""
          if (state) location = city + ", " + state + ", " + country
          else location = city + ", " + country

          setSelectedProduct(product)
          setSelectedLocation(location)
        }

        if ((selectedProduct && selectedLocation !== "WORLDWIDE") || (selectedTicker)) {

          await bufferedRecords.map((item:any) => {
            if(item.price)pricesArray.push(item.price)
          })

          let stats = await getStatistics(pricesArray)
          setCurrency(currency)
          setStartingDate(dToday)
          setBufferDate(monthAgo)
          setHighestPrice(stats.highest.toFixed(2))
          setLowestPrice(stats.lowest.toFixed(2))
          setMean(stats.mean.toFixed(2))
          setVariance(stats.variance.toFixed(2))
          setStandardDeviation(stats.standardDeviation.toFixed(2))
          setPriceGroup(stats.priceGroup)
        }
      }
    }


    useEffect(() => {

      return () => {dispatch(clearSearchProduct())}

    }, [])

    return (
        <>
            <CommonContainer>
              <ListingHeader />

                <FilterButtonWrapper>
                  <span>Show Filters</span>
                  <ArrowSmall
                      src="https://res.cloudinary.com/dba8ifej6/image/upload/v1644293162/arrow_right_y4gllj.png"
                      onClick={handleClick}
                  />
                </FilterButtonWrapper>
                <ReactiveBase
                    app="prices"
                    url={process.env.REACT_APP_ELASTIC_URL}
                    //enableAppbase
                    transformResponse={async(elasticsearchResponse, componentId) => {

                        let arr: Result[] = [];
                        await elasticsearchResponse.hits.hits.map((item:any) => {
                          arr.push(item._source)
                        })
                        setTotalResult(elasticsearchResponse.hits.total.value)
                        setFileData(arr)
                        setPerformStat(true)
                        return { ...elasticsearchResponse }

                    }}
                    className="elasticWrapper"
                >
                    <ListWrapper>
                        <FilterWrapperMobile click={click}>
                            <MobileIconProfile onClick={handleClick}>
                                <span style={{fontSize: '18px'}}>X</span>
                            </MobileIconProfile>
                            <SingleDropdownList
                              componentId="Category"
                              dataField="product.category.category.keyword"
                              title="Category"
                              placeholder="Filter by Category"
                              react={{ and: ['Product', 'Ticker', 'Location', 'mainSearch', 'Type'], }}
                              style={{
                                  marginBottom: 15,
                                  maxWidth: 300
                              }}
                              onValueChange={(value) => {
                                  dispatch(setCategory(value))
                                }
                              }
                              onChange={(value) => {
                                  dispatch(setCategory(value))
                                }
                              }
                              value={selectedCategory}
                            />
                            {selectedOption ?
                              <SingleDropdownList
                                  componentId="Product"
                                  dataField="product.product_name.keyword"
                                  title="Product Name"
                                  placeholder="Filter by product name"
                                  react={{ and: ['Category', 'Ticker', 'Location', 'mainSearch', 'Type'], }}
                                  style={{
                                      marginBottom: 15,
                                      maxWidth: 300
                                  }}
                                  onValueChange={(value) => {
                                      setProduct(value)
                                    }
                                  }
                                  //defaultSelected={selectedOption}
                              />
                              :
                              <SingleDropdownList
                                  componentId="Product"
                                  dataField="product.product_name.keyword"
                                  title="Product Name"
                                  placeholder="Filter by product name"
                                  react={{ and: ['Category', 'Ticker', 'Location', 'mainSearch', 'Type'], }}
                                  style={{
                                      marginBottom: 15,
                                      maxWidth: 300
                                  }}
                                  onValueChange={(value) => {
                                      setProduct(value)
                                    }
                                  }
                              />
                            }

                            <SingleDropdownList
                                componentId="TickerMobile"
                                dataField="ticker.keyword"
                                title="Product Ticker"
                                placeholder="Filter by product ticker"
                                react={{ and: ['CategoryMobile', 'ProductMobile', 'LocationMobile', 'mainSearch', 'TypeMobile'], }}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                                onValueChange={(value) => {
                                    setProductTicker(value)
                                    //if(selectedTickerState) dispatch(clearTicker())
                                  }
                                }

                            />
                            <SingleDataList
                                componentId="TypeMobile"
                                dataField="type.keyword"
                                title="Product type"
                                react={{ and: ['CategoryMobile', 'ProductMobile', 'LocationMobile', 'mainSearch', 'TickerMobile'], }}
                                data={[{
                                    label: "RETAIL",
                                    value: "RETAIL"
                                }, {
                                    label: "SERVICE",
                                    value: "SERVICE"
                                }]}
                                showRadio={true}
                                showSearch={false}
                            />
                            <DataSearch
                                title="Location"
                                dataField={['location_city', 'location_city.search', 'location_state', 'location_state.search', 'location_country', 'location_country.search']}
                                componentId="LocationMobile"
                                //URLParams
                                enablePopularSuggestions
                                size={5}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                                react={{ and: ['CategoryMobile', 'ProductMobile', 'TickerMobile', 'mainSearch', 'TypeMobile'], }}
                                strictSelection={true}
                                onValueSelected={async(value, triggerQuery, event) => {
                                  if (value) {
                                		setLocation(value)
                                  }
                              	}}
                            />

                            <SelectedFilters
                                render={({ clearValues }) => (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        clearValues();
                                        setSelectedProduct("");
                                        setSelectedLocation("WORLDWIDE");
                                        dispatch(setCategory(""))
                                        dispatch(clearSearchProduct())
                                        dispatch(clearTicker())
                                      }}
                                      style={{
                                       padding: '5px',
                                        maxWidth: 300,
                                        marginBottom: 10
                                    }}>
                                        {"Reset Filters"}
                                    </button>
                                )}
                            />
                        </FilterWrapperMobile>
                        <FilterWrapper>

                        <SingleDropdownList
                            componentId="Category"
                            dataField="product.category.category.keyword"
                            title="Category"
                            placeholder="Filter by category"
                            //defaultSelected="Beverages"
                            react={{ and: ['Product', 'Ticker', 'Location', 'mainSearch', 'Type'], }}
                            style={{
                                marginBottom: 15,
                                maxWidth: 300
                            }}
                            onValueChange={(value) => {
                                dispatch(setCategory(value))
                              }
                            }
                            onChange={(value) => {
                                dispatch(setCategory(value))
                              }
                            }
                            value={selectedCategory}
                        />
                        {selectedOption ?
                          <SingleDropdownList
                              componentId="Product"
                              dataField="product.product_name.keyword"
                              title="Product Name"
                              placeholder="Filter by product name"
                              react={{ and: ['Category', 'Ticker', 'Location', 'mainSearch', 'Type'], }}
                              style={{
                                  marginBottom: 15,
                                  maxWidth: 300
                              }}
                              onValueChange={(value) => {
                                  setProduct(value)
                                }
                              }
                              //defaultSelected={selectedOption}
                          />
                          :
                          <SingleDropdownList
                              componentId="Product"
                              dataField="product.product_name.keyword"
                              title="Product Name"
                              placeholder="Filter by product name"
                              react={{ and: ['Category', 'Ticker', 'Location', 'mainSearch', 'Type'], }}
                              style={{
                                  marginBottom: 15,
                                  maxWidth: 300
                              }}
                              onValueChange={(value) => {
                                  setProduct(value)
                                }
                              }
                          />
                        }

                        <SingleDropdownList
                            componentId="Ticker"
                            dataField="ticker.keyword"
                            title="Product Ticker"
                            placeholder="Filter by product ticker"
                            react={{ and: ['Category', 'Product', 'Location', 'mainSearch', 'Type'], }}
                            style={{
                                marginBottom: 15,
                                maxWidth: 300
                            }}
                            onValueChange={(value) => {
                                setProductTicker(value)
                                dispatch(setTicker(value))
                                //if(selectedTickerState) dispatch(clearTicker())
                              }
                            }
                            onChange={(value) => {
                                setProductTicker(value)
                                dispatch(setTicker(value))
                                //if(selectedTickerState) dispatch(clearTicker())
                              }
                            }
                            value={selectedTickerState}
                        />
                        <SingleDataList
                            componentId="Type"
                            dataField="type.keyword"
                            title="Product type"
                            react={{ and: ['Category', 'Product', 'Location', 'mainSearch', 'Ticker'], }}
                            data={[{
                                label: "RETAIL",
                                value: "RETAIL"
                            }, {
                                label: "SERVICE",
                                value: "SERVICE"
                            }]}
                            showRadio={true}
                            showSearch={false}
                        />
                        <DataSearch
                            title="Location"
                            dataField={['location_city', 'location_city.search', 'location_state', 'location_state.search', 'location_country', 'location_country.search']}
                            componentId="Location"
                            URLParams
                            enablePopularSuggestions
                            react={{ and: ['Category', 'Product', 'Type', 'mainSearch', 'Ticker'], }}
                            size={5}
                            style={{
                                marginBottom: 15,
                                maxWidth: 300
                            }}
                            strictSelection={true}
                            onValueSelected={(value, triggerQuery, event) => {
                              if (value) {
                                setLocation(value)
                              }
                            }}
                        />

                        <SelectedFilters
                            render={({ clearValues }) => (
                                <button
                                  type="button"
                                  onClick={() => {
                                    clearValues();
                                    setSelectedProduct("");
                                    setSelectedLocation("WORLDWIDE");
                                    dispatch(setCategory(""))
                                    dispatch(clearSearchProduct())
                                    dispatch(clearTicker())
                                  }}
                                  style={{
                                   padding: '5px',
                                    maxWidth: 300,
                                    marginBottom: 10
                                }}>
                                    {"Reset Filters"}
                                </button>
                            )}
                        />
                        </FilterWrapper>
                        <DataWrapper style={{margin: '0', width: '80%', flexDirection: 'column', }}>

                            <DataSearch
                                title="Search Price Listing"
                                componentId="mainSearch"
                                style={{"paddingBottom": "2.5em", "width": "80%", "borderRadius": "5px", "paddingLeft": "8px"}}
                                autosuggest={false}
                                defaultValue={searchProduct}
                                dataField={[
                                  'location_city',
                                  'location_city.search',
                                  'location_state',
                                  'location_state.search',
                                  'location_country',
                                  'location_country.search',
                                  'product.product_name',
                                  'product.category.category',
                                  'classification.search',
                                  'classification',
                                  'description',
                                  'description.search',
                                  'type',
                                ]}
                            />

                            <div style={{ padding: "0 1em" }}>
                                {fileData?.length > 0 &&
                                  <CSVLink
                                    headers={fileHeaders}
                                    data={fileData}
                                    filename="results.csv"
                                    target="_blank"
                                  >
                                    Dowload csv file
                                  </CSVLink>
                                }
                            </div>

                            {(selectedProduct && selectedLocation !== "WORLDWIDE") || (selectedTicker) ?
                              <FlexCenterColContainer>
                                <TitleThree>Statistics for {selectedProduct} in {selectedLocation}</TitleThree>
                                <TitleFour>Sample data ranging from {moment(bufferDate).format('LL')} - {moment(startingDate).format('LL')}</TitleFour>
                                <FlexBetweenRowContainer>
                                  <table className="table fontSize12 width40">
                                    <tr><td style={{fontWeight: 600}}>Highest Price:</td><td>{highestPrice} {currency}</td></tr>
                                    <tr><td style={{fontWeight: 600}}>Lowest Price:</td><td>{lowestPrice} {currency}</td></tr>
                                    <tr><td style={{fontWeight: 600}}>Mean:</td><td>{mean}</td></tr>
                                    <tr><td style={{fontWeight: 600}}>Variance:</td><td>{variance}</td></tr>
                                    <tr><td style={{fontWeight: 600}}>Standard Deviation:</td><td>{standardDeviation}</td></tr>
                                  </table>

                                  <table className="table fontSize12 width40">
                                    <thead>
                                      <tr>
                                        <th>Price range</th>
                                        <th>Number of records</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {priceGroup ? priceGroup.map((group:any) => {
                                        return (
                                          <tr>
                                            <td style={{textAlign: "center"}}>{group.range}</td>
                                            <td style={{textAlign: "center"}}>{group.members}</td>
                                          </tr>
                                        )
                                      }) : null}
                                    </tbody>
                                  </table>
                                </FlexBetweenRowContainer>
                              </FlexCenterColContainer>
                              : null
                            }

                            <ReactiveList
                                componentId="SearchResult"
                                dataField="title"
                                size={totalResult}
                                infiniteScroll={true}
                                className="result-list-container"
                                showResultStats={false}
                                // showExport={true}
                                // pagination
                                // paginationAt="both"
                                react={{
                                    and: ['mainSearch', 'Location', 'Product', 'Category', 'Ticker', 'Type'],
                                }}
                                defaultQuery={() => ({ track_total_hits: true })}
                                sortOptions={[
                                  {dataField: "createdAt", sortBy: "desc", label: "Sort by Date"},
                                  {dataField: "price", sortBy: "desc", label: "Sort by Price"}
                                ]}
                                render={({ data }) => (
                                    <ReactiveList.ResultListWrapper>
                                      <DesktopResultWrapper>
                                        <table className="table table-bordered table-hover" style={{fontSize: '10px'}}>
                                          <thead>
                                            <tr>
                                              <th>TICKER</th>
                                              <th>PRODUCT NAME</th>
                                              <th>LOCATION</th>
                                              <th>TYPE</th>
                                              <th>PRICE</th>
                                              <th>DATE</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {data.map((item: any) => {
                                              if (item.product && item.product.product_name) {
                                                return <tr
                                                        key={item._id}
                                                        onClick={() => navigate(`/priceRecord/${item._id}`)}
                                                        style={{cursor: 'pointer'}}
                                                      >
                                                      <td>{item.ticker}</td>
                                                      <td>{item.classification}</td>
                                                      <td>{item.location_state !== "undefined" && item.location_state !== null ? `${item.location_city}, ${item.location_state}, ${item.location_country}` : `${item.location_city}, ${item.location_country}`}</td>
                                                      <td>{item.type}</td>
                                                      <td>{item.price} {item.currency}</td>
                                                      <td>{moment(item.createdAt).format('LL')}</td>
                                                    </tr>
                                              }
                                            })}
                                          </tbody>
                                        </table>
                                      </DesktopResultWrapper>

                                      <MobileResultWrapper>
                                        <table className="table" style={{fontSize: '10px'}}>
                                          <tbody>
                                            {data.map((item: any) => {
                                              if (item.product && item.product.product_name) {
                                                return <tr
                                                    key={item._id}
                                                    onClick={() => navigate(`/priceRecord/${item._id}`)}
                                                    style={{cursor: 'pointer'}}
                                                  >
                                                    <td>
                                                      <p><span style={{fontWeight: 'bold'}}>Ticker: </span> <span>{item.ticker}</span></p>
                                                      <p><span style={{fontWeight: 'bold'}}>Classification: </span> <span>{item.classification}</span></p>
                                                      <p><span style={{fontWeight: 'bold'}}>Location: </span> <span>{item.location_state !== "undefined" && item.location_state != null ? `${item.location_city}, ${item.location_state}, ${item.location_country}` : `${item.location_city}, ${item.location_country}`}</span></p>
                                                      <p><span style={{fontWeight: 'bold'}}>Type: </span> <span>{item.type}</span></p>
                                                      <p><span style={{fontWeight: 'bold'}}>Price: </span> <span>{item.price} {item.currency}</span></p>
                                                      <p><span style={{fontWeight: 'bold'}}>Date: </span> <span>{moment(item.createdAt).format('LL')}</span></p>
                                                    </td>
                                                  </tr>
                                              }
                                            })}
                                          </tbody>
                                        </table>
                                      </MobileResultWrapper>
                                    </ReactiveList.ResultListWrapper>
                                )}
                            />
                        </DataWrapper>
                    </ListWrapper>

                </ReactiveBase>
            </CommonContainer>
            <Footer />
        </>
    )
}

export default PriceListing
