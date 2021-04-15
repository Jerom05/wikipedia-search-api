import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './search.css'

const Search = ()=>{
    const [term,setTerm] = useState('')
    const [results , setResults] = useState([])


    useEffect(()=>{
        const search = async()=>{
            const result = await axios.get("http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=",{
                params:{
                    action:'query',
                    list:'search',
                    origin:'*',
                    format:'json',
                    srsearch: term
                  }
            })
            setResults(result.data.query.search)
        }
        if(term){
            search()
        } 
    },[term])
    

    return(
        <div className='body'>
            <div className='header-section'> 

                
                <div className='logo-section'>
                    <div className='logo'>
                        <div className='wikiLogo'>
                            Wiki
                        </div>
                        <div className='Search-logo'>
                           Search 
                        </div>
                    </div>   
                </div>

                <hr />

                <div className='search-section'>
                    <div className='content-s'>
                        <h4 className='search-label'>Search</h4>
                        <div className='input-field'>
                            <input 
                                placeholder='Type here anything'
                                type='text'
                                className='input-form'
                                value={term}
                                onChange ={event=>setTerm(event.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {
            results.length === 0 ? <span></span>
                : <div className='body-section'>
                        <div className='content-box'>
                            <div className='suggestions'>Search Results</div>
                            {results.map((result)=>{
                                return(
                                    <div key={result.pageid}className='item-i'>
                                        <a target="_blank" rel="noreferrer" href={`http://en.wikipedia.org?curid=${result.pageid}`}>
                                            <div className='content'>
                                                <div className='header'>
                                                    {result.title}
                                                </div>
                                                <span dangerouslySetInnerHTML ={{__html:result.snippet}}></span>
                                            </div>
                                        </a>
                                        
                                    </div>
                                )
                            })}
                        </div>
            </div>
            }
            

            {
                results.length ===0 ? 
                <div className='no-result'>
                    <div>
                        <p>Nothing To Search</p>
                    </div>
                </div>

                : <p></p>
            }

            <div className='footer'>
                Design & Developed by Jeromio Ghagra Calvin
            </div>
        </div>
    )
}

export default Search

//target="_blank" rel="noreferrer"

//