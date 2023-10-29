import {FaSearchDollar} from 'react-icons/fa';
const SearchBar = (props)=>{
    return (
        <div className=" p-2 px-4  mb-2 rounded d-flex  align-items-center justify-content-between">
                <div className="input-group-sm d-flex">
                     <input  type ="text" placeholder="search by ticker name" className="form-control mx-2" />
                     <button className='btn btn-primary'> <FaSearchDollar/></button>
                </div>
        </div>
    )
}

export default SearchBar;