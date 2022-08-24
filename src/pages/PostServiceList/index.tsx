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
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import { RootState } from '../../app/store'
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
    MobileIconProfile
} from './styles'
import { CommonContainer } from "../../globalStyles"
import { CSVLink } from 'react-csv';

interface PostServiceData {
    _id: React.Key | null | undefined;
    content: string;
    title: string;
    created_date: Date | null;
    date_departure: Date | null;
    user_profile: string;
    expired: boolean;
}

type Result = {
  accept_crypto: boolean;
  available_seats: null|number;
  content: null|string;
  created_date: string;
  currency: null|string;
  date_departure: null|string;
  destination_city: null|string;
  destination_country: null|string;
  destination_state: null|string;
  expired: boolean;
  from_city: null|string;
  from_country: null|string;
  from_state: null|string;
  package_image: null|string;
  package_size_dimension: null|string;
  phone_calls: null|boolean
  post_type: null|string;
  price_max: null|number;
  price_min: null|number;
  show_phone_number: null|boolean;
  show_price: null|boolean;
  status: null|string;
  text_sms: null|boolean;
  title: null|string;
  user_profile: null|string;
  vehicle_image: null|string;
  vehicle_type: null|string;
};

function PostServiceList() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [click, setClick] = useState(false);

    let profileUserId = localStorage.getItem('user')
    let token = localStorage.getItem('token')
    //const { value, searchAllPost } = useSelector((state: RootState) => state.home)
    const cont = (item: object) => {
        console.log("cont function")
    }

    const handleClick = () => setClick(!click);

    const [ fileData, setFileData ] = useState<Result[]>([]);

  //   const [fileHeaders] = useState[{
  //     {label: 'Status', key: 'post_type'},
  //     {label: 'Status', key: 'title'},
  //     {label: 'Accept Crypto', key: 'accept_crypto'},
  //     {label: 'Available Seats', key: 'available_seats'},
  //     {label: 'Content', key: 'content'},
  //     {label: 'Created Date', key: 'created_date'},
  //     {label: 'Currency', key: 'currency'},
  //     {label: 'Date Departure', key: 'date_departure'},
  //     {label: 'Destination City', key: 'destination_city'},
  //     {label: 'Destination Country', key: 'destination_country'},
  //     {label: 'Destination State', key: 'destination_state'},
  //     {label: 'Expired', key: 'expired'},
  //     {label: 'From City', key: 'from_city'},
  //     {label: 'From Country', key: 'from_country'},
  //     {label: 'From State', key: 'from_state'},
  //     {label: 'Max Price', key: 'price_max'},
  //     {label: 'Min Price', key: 'price_min'},
  //   }]
  // }


    return (
        <>
            <CommonContainer>
                <div style={{ padding: "1em 0" }}>
                    <h3>Export to CSV</h3>
                    {fileData?.length &&
                      <CSVLink
                        //headers={fileHeaders}
                        data={fileData}
                        filename="results.csv"
                        target="_blank"
                      >
                        Export
                      </CSVLink>
                    }
                </div>
                <ReactiveBase
                    app="postservices"
                    url="http://elastic:dnyEZysd2Kif0sjCtm8N@154.12.225.132:9200"
                    //enableAppbase
                    transformResponse={async(elasticsearchResponse, componentId) => {
                        //console.log("elasticsearchResponse ", elasticsearchResponse)

                        let arr: Result[] = [];
                        const hits = await elasticsearchResponse.hits.hits.filter(
                          function(item:any) {
                            if (item._source.expired === true) arr.push(item._source)
                            return item._source.expired === true;
                          }
                        );
                        console.log("elresponse", hits)
                        console.log("results", arr)
                        setFileData(arr)

                        return {
                           ...elasticsearchResponse,
                           hits: {
                               hits,
                               total: {value: hits.length},
                               status: elasticsearchResponse.status,
                               timed_out: elasticsearchResponse.timed_out,
                               took: elasticsearchResponse.took
                           },

                       }
                    }}
                >
                    <ListWrapper>
                        <FilterWrapperMobile click={click}>
                            <MobileIconProfile onClick={handleClick}>
                                <span style={{fontSize: '18px'}}>X</span>
                            </MobileIconProfile>
                            <SingleDataList
                                componentId="PostType"
                                dataField="post_type.keyword"
                                title="Type of post"
                                data={[{
                                    label: "OFFER",
                                    value: "OFFER"
                                }, {
                                    label: "REQUEST",
                                    value: "REQUEST"
                                }]}
                                showRadio={true}
                                showSearch={false}
                                //defaultValue={value}
                            />

                            <DataSearch
                                title="Origin"
                                dataField={['from_city', 'from_city.search', 'from_state', 'from_state.search', 'from_country', 'from_country.search']}
                                componentId="Location"
                                URLParams
                                //enableRecentSearches
                                enablePopularSuggestions
                                //value={location}
                                size={5}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                            />
                            <DataSearch
                                title="Destination"
                                dataField={['destination_city', 'destination_city.search']}
                                componentId="Post"
                                URLParams
                                //enableRecentSearches
                                enablePopularSuggestions
                                size={5}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                            />
                            <DateRange
                                title="Pick a Date"
                                componentId="DateSensor"
                                dataField="date_departure"
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                            />
                            <SingleDropdownList
                                componentId="Vehicle"
                                dataField="vehicle_type.keyword"
                                title="Type of vehicle"
                                placeholder="Choose vehicle type"
                                react={{ and: ['Location', 'Post', 'DateSensor', 'PostType'], }}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
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

                            <SingleDataList
                                componentId="PostType"
                                dataField="post_type.keyword"
                                title="Type of post"
                                data={[{
                                    label: "OFFER",
                                    value: "OFFER"
                                }, {
                                    label: "REQUEST",
                                    value: "REQUEST"
                                }]}
                                showRadio={true}
                                showSearch={false}
                                //defaultValue={value}
                            />

                            <DataSearch
                                title="Origin"
                                dataField={['from_city', 'from_city.search', 'from_state', 'from_state.search', 'from_country', 'from_country.search']}
                                componentId="Location"
                                URLParams
                                //enableRecentSearches
                                enablePopularSuggestions
                                //value={location}
                                size={5}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                                // onChange={(value) => {
                                //     dispatch(updateCity(value))
                                //     localStorage.setItem('city', value)
                                // }}
                            />
                            <DataSearch
                                title="Destination"
                                dataField={['destination_city', 'destination_city.search']}
                                componentId="Post"
                                URLParams
                                //enableRecentSearches
                                enablePopularSuggestions
                                size={5}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                            />
                            <DateRange
                                title="Pick a Date"
                                componentId="DateSensor"
                                dataField="date_departure"
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
                                }}
                            />
                            <SingleDropdownList
                                componentId="Vehicle"
                                dataField="vehicle_type.keyword"
                                title="Type of vehicle"
                                placeholder="Choose vehicle type"
                                react={{ and: ['Location', 'Post', 'DateSensor', 'PostType'], }}
                                style={{
                                    marginBottom: 15,
                                    maxWidth: 300
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
                                title="Search Posts"
                                componentId="mainSearch"
                                style={{"paddingBottom": "2.5em", "width": "50%", "borderRadius": "5px"}}
                                autosuggest={false}
                                //defaultValue={searchAllPost}
                                dataField={[
                                  'from_city',
                                  'from_city.search',
                                  'from_state',
                                  'from_state.search',
                                  'from_country',
                                  'from_country.search',
                                  'title',
                                  'title.search',
                                  'content',
                                  'content.search',
                                  'post_type',
                                  'post_type.search',
                                  'vehicle_type',
                                  'vehicle_type.search',
                                ]}
                            />

                            <ReactiveList
                                componentId="SearchResult"
                                dataField="title"
                                size={50}
                                className="result-list-container"
                                showResultStats={true}
                                react={{
                                    and: ['mainSearch', 'Location', 'Post', 'DateSensor', 'Vehicle', 'PostType', 'PostOrigin'],
                                }}
                                render={({ data }) => (
                                    <ReactiveList.ResultListWrapper>
                                        {data.map((item: PostServiceData) => {
                                            return <div style={{ borderTop: '1px solid #c4c4c4', padding: "1em", cursor: 'pointer', justifyContent: 'flex-start'}} key={item._id}>
                                                <ResultList id={item._id!}>
                                                    <ResultList.Content>
                                                        <ListTitleWrapper>
                                                            <ListTitle onClick={() => navigate(`/post/${item._id}`, { replace: true })}>{item.title}</ListTitle>
                                                            {token && item.user_profile === profileUserId ? <div style={{ width: "20%" }}>
                                                                <Button color="sixth" onClick={() => cont(item)}>Edit</Button>
                                                            </div> : null}
                                                        </ListTitleWrapper>
                                                        <CreateDateWrapper>
                                                            <CreateDateTitle>Date Created:</CreateDateTitle>
                                                            <CreateDate>{moment(item.created_date).format('LL')}</CreateDate>
                                                        </CreateDateWrapper>
                                                        <ResultList.Description>
                                                            <ItemContentWrapper>
                                                                <ItemContent>{item.content}</ItemContent>
                                                            </ItemContentWrapper>
                                                        </ResultList.Description>
                                                        <ResultList.Description>
                                                            <ExpirationWrapper>
                                                                <ExpirationTitle>Expiration:</ExpirationTitle>
                                                                {item.date_departure ?
                                                                  <Expiration>{moment(item.date_departure).format('LL')}</Expiration>
                                                                  :
                                                                  <Expiration>Not set</Expiration>
                                                                }
                                                            </ExpirationWrapper>
                                                        </ResultList.Description>
                                                    </ResultList.Content>
                                                </ResultList>
                                            </div>
                                        })}
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
