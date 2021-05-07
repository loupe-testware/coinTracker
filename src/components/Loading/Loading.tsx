import loadingGear from '../../assets/loadingSpinner.svg'

import './Loading.css'

const Loading: React.FC = () => {

    return(
        <div className='loadingContainer'>
            <h1 className='loadingTitle'>LOADING</h1>
            <img className='loadingGear' src={loadingGear} alt='a spinning gear displayed whilst laoding the next page'/>
        </div>
    )
}

export default Loading