import {
    ReactiveBase,
    DataSearch,
    ReactiveList,
    ResultList,
    SingleDropdownList,
    SingleDataList,
    DateRange,
    SelectedFilters
} from '@appbaseio/reactivesearch'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import ListingHeader from '../../components/ListingHeader'
import { RootState } from '../../app/store'
import getBufferDate from '../../utils/getBufferDate'
import getStatistics from '../../utils/getStatistics'
import {
    ListWrapper,
    FilterWrapper,
    DataWrapper,
    ListTitleWrapper,
    ListTitle,
    CreateDateWrapper,
    CreateDateTitle,
    CreateDate,
    ExpirationWrapper,
    ExpirationTitle,
    Expiration,
    ItemContentWrapper,
    ItemContent,
    FilterWrapperMobile,
    ArrowSmall,
    MobileIconProfile,
} from './styles'
import { CommonContainer, HeaderContainer, TitleThree } from "../../globalStyles"
import { CSVLink } from 'react-csv';

interface PostServiceData {
    _id: React.Key | null | undefined;
    uploader: string;
    classification: string;
    product: string;
    type: string;
    ticker: string;
    currency: string;
    location_city: string;
    location_state: string | null;
    location_country: string;
    price: number;
    rating: number | null;
}

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

function PostServiceList() {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const { selectedCategory } = useSelector((state: RootState) => state.category)

    const [click, setClick] = useState(false);
    const [totalResult, setTotalResult] = useState(50);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("WORLDWIDE");
    const [startingDate, setStartingDate] = useState<Date>();
    const [bufferDate, setBufferDate] = useState<Date>();
    const [highestPrice, setHighestPrice] = useState<string>();
    const [lowestPrice, setLowestPrice] = useState<string>();
    const [mean, setMean] = useState<string>();
    const [variance, setVariance] = useState<string>();
    const [standardDeviation, setStandardDeviation] = useState<string>();

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
      console.log("set location: ", value)
      setSelectedLocation(value)
    }

    useEffect(() => {
      console.log("useEffect selectedProduct: ", selectedProduct)
      console.log("useEffect selectedLocation: ", selectedLocation)
      showStatistics()
    }, [selectedProduct, selectedLocation])

    const showStatistics = async() => {

      /**
        If user filter the results by product,
        filter the response to get the records one month ago
        from the last creation date
      **/
      console.log("records[0] ", fileData[0])
      if(fileData.length > 0 && fileData[0].createdAt) {
        let dToday = fileData[0].createdAt
        //console.log("dToday: ", dToday)
        let monthAgo = await getBufferDate(dToday)
        //console.log("month ago: ", monthAgo)

        let bufferedRecords = await fileData.filter(
          function(item:any) {
            return new Date(item.createdAt).valueOf() > new Date(monthAgo).valueOf();
          }
        )
        //console.log("bufferedRecords: ", bufferedRecords)

        let pricesArray:number[] = []
        await bufferedRecords.map((item:any) => {
          if(item.price)pricesArray.push(item.price)
        })
        //console.log("prices array: ", pricesArray)
        console.log("selected location: ", selectedLocation)

        let stats = await getStatistics(pricesArray)

        setStartingDate(dToday)
        setBufferDate(monthAgo)
        setHighestPrice(stats.highest.toFixed(2))
        setLowestPrice(stats.lowest.toFixed(2))
        setMean(stats.mean.toFixed(2))
        setVariance(stats.variance.toFixed(2))
        setStandardDeviation(stats.standardDeviation.toFixed(2))
      }
    }

    return (
        <>
            <CommonContainer>
              <ListingHeader />

                <div style={{ padding: "1em 0" }}>
                    {fileData?.length &&
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
                <ReactiveBase
                    app="prices"
                    url="http://localhost:9200"
                    //enableAppbase
                    transformResponse={async(elasticsearchResponse, componentId) => {
                        //console.log("componentId: ", componentId)
                        let arr: Result[] = [];
                        await elasticsearchResponse.hits.hits.map((item:any) => {
                          arr.push(item._source)
                        })
                        setTotalResult(elasticsearchResponse.hits.total.value)
                        setFileData(arr)
                        //showStatistics(arr)
                        return { ...elasticsearchResponse }


                        // const hits = elasticsearchResponse.hits.hits
                        // let sortedHits = await hits.sort((a:any,b:any)=>{
                        //   return new Date(b._source.createdAt).valueOf() - new Date(a._source.createdAt).valueOf();
                        // })
                        //
                        // let dToday = sortedHits[0]._source.createdAt
                        // //console.log("dToday: ", dToday)
                        // let monthAgo = await getBufferDate(dToday)
                        // //console.log("month ago: ", monthAgo)
                        //
                        // ///console.log("sortedHits: ", sortedHits)
                        // await sortedHits.map((item:any) => {
                        //   arr.push(item._source)
                        // })
                        // setTotalResult(elasticsearchResponse.hits.total.value)
                        // setFileData(arr)
                        //
                        // return { ...elasticsearchResponse }
                       //  return {
                       //     ...elasticsearchResponse,
                       //     hits: {
                       //        hits: sortedHits,
                       //        total: {value: sortedHits.length},
                       //        status: elasticsearchResponse.status,
                       //        timed_out: elasticsearchResponse.timed_out,
                       //        took: elasticsearchResponse.took
                       //    },
                       // }
                    }}
                >
                    <ListWrapper>
                        <FilterWrapperMobile click={click}>
                            <MobileIconProfile onClick={handleClick}>
                                <span style={{fontSize: '18px'}}>X</span>
                            </MobileIconProfile>
                            <SingleDropdownList
                              componentId="ProductMobile"
                              dataField="product.product_name.keyword"
                              title="Product Name"
                              placeholder="Filter by product name"
                              react={{ and: ['Ticker', 'Location', 'mainSearch', 'Type'], }}
                              style={{
                                  marginBottom: 15,
                                  maxWidth: 300
                              }}
                              onValueChange={(value) => {
                                  setProduct(value)
                                }
                              }
                            />
                            <SingleDropdownList
                                componentId="TickerMobile"
                                dataField="ticker.keyword"
                                title="Product Ticker"
                                placeholder="Filter by product ticker"
                                react={{ and: ['Location', 'Product', 'Ticker', 'mainSearch', 'Type'], }}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                            />
                            <SingleDataList
                                componentId="TypeMobile"
                                dataField="type.keyword"
                                title="Product type"
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
                                title="LocationMobile"
                                dataField={['location_city', 'location_city.search', 'location_state', 'location_state.search', 'location_country', 'location_country.search']}
                                componentId="Location"
                                URLParams
                                enablePopularSuggestions
                                size={5}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                                onChange={async(value, triggerQuery, event) => {
                              		await setLocation(value)
                                  triggerQuery()
                              	}}
                            />

                            <SelectedFilters
                                render={({ clearValues }) => (
                                    <button type="button" onClick={clearValues} style={{
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
                            componentId="ProductWeb"
                            dataField="product.product_name.keyword"
                            title="Product Name"
                            placeholder="Filter by product name"
                            react={{ and: ['Ticker', 'Location', 'mainSearch', 'Type'], }}
                            style={{
                                marginBottom: 15,
                                maxWidth: 300
                            }}
                            onValueChange={(value) => {
                                setProduct(value)
                              }
                            }
                        />
                        <SingleDropdownList
                            componentId="TickerWeb"
                            dataField="ticker.keyword"
                            title="Product Ticker"
                            placeholder="Filter by product ticker"
                            react={{ and: ['Location', 'Product', 'Ticker', 'mainSearch', 'Type'], }}
                            style={{
                                marginBottom: 15,
                                maxWidth: 300
                            }}
                        />
                        <SingleDataList
                            componentId="TypeWeb"
                            dataField="type.keyword"
                            title="Product type"
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
                            title="LocationWeb"
                            dataField={['location_city', 'location_city.search', 'location_state', 'location_state.search', 'location_country', 'location_country.search']}
                            componentId="Location"
                            URLParams
                            enablePopularSuggestions
                            size={5}
                            style={{
                                marginBottom: 15,
                                maxWidth: 300
                            }}
                            onChange={async(value, triggerQuery, event) => {
                              await setLocation(value)
                              triggerQuery()
                            }}
                        />

                        <SelectedFilters
                            render={({ clearValues }) => (
                                <button type="button" onClick={clearValues} style={{
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
                                style={{"paddingBottom": "2.5em", "width": "50%", "borderRadius": "5px"}}
                                autosuggest={false}
                                //defaultValue={searchAllPost}
                                dataField={[
                                  'location_city',
                                  'location_city.search',
                                  'location_state',
                                  'location_state.search',
                                  'location_country',
                                  'location_country.search',
                                  'product.product_name',
                                  'classification.search',
                                  'description',
                                  'type',
                                ]}
                            />

                            {selectedProduct ?
                              <div>
                                <TitleThree>Statistics for {selectedProduct}</TitleThree>
                                <p>Highest Price: {highestPrice}</p>
                                <p>Lowest Price: {lowestPrice}</p>
                                <p>Mean: {mean}</p>
                                <p>Variance: {variance}</p>
                                <p>Standard Deviation: {standardDeviation}</p>
                              </div>
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
                                    and: ['mainSearch', 'Location', 'Product', 'Ticker', 'Type'],
                                }}
                                defaultQuery={() => ({ track_total_hits: true })}
                                sortOptions={[{dataField: "createdAt", sortBy: "desc", label: "Sort by Date"}]}
                                render={({ data }) => (
                                    <ReactiveList.ResultListWrapper>
                                      <table className="table table-bordered" style={{fontSize: '10px'}}>
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
                                              let productName = item.product.product_name
                                              return <tr key={item._id!}>
                                                    <td>{item.ticker}</td>
                                                    <td>{item.classification}</td>
                                                    <td>{item.location_state ? `${item.location_city}, ${item.location_state}, ${item.location_country}` : `${item.location_city}, ${item.location_country}`}</td>
                                                    <td>{item.type}</td>
                                                    <td>{item.price} {item.currency}</td>
                                                    <td>{moment(item.createdAt).format('LL')}</td>
                                                  </tr>
                                            }
                                          })}
                                        </tbody>
                                      </table>
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

export default PostServiceList
