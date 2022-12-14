import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import './Spots.css';
import SpotCard from '../SpotCard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { clearBookings } from '../../store/bookings';

const SpotsBrowser = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);
    const spotsArray = Object.values(spots)
    const [isLoaded, setIsLoaded] = useState(false);
    const [count, setCount] = useState(0);
    useEffect(() => {
        dispatch(getSpots())
        dispatch(clearBookings())
    }, [dispatch])

    useEffect(() => {
        let counter = count;
        const interval = setInterval(() => {
          if (counter >= spotsArray.length) {
            clearInterval(interval);
          } else {
            setCount(count => count + 1);
            counter++; // local variable that this closure will see
          }
        }, 35);
        return () => clearInterval(interval);
      }, [spotsArray]);

      const spotsArrayList = spotsArray.slice(0, count).map(spot => (
        <SpotCard key={spot.id} spot={spot}/>
    ))

    setTimeout(() => setIsLoaded(true), 100)

    return (
        <div className='spots-container'>
            {isLoaded && spotsArrayList}
            <div className='bott-bar'>
                <div className='bott-inner'>
                    <div className='bott-left'>
                        <span
                        style={{fontWeight: '250', fontSize: '14px'}}
                        >© 2022 Airbenbe, Inc.</span>
                    </div>
                    <div className='bott-right'>
                        <i className="fa-brands fa-github"
                        style={{marginRight: '5px'}}
                        />
                        <a
                        className='git-linked'
                        style={{color: 'black', cursor: 'pointer'}}
                        href='https://github.com/Dylluu/API-project' target='_blank'>Github</a>
                        <i className="fa-brands fa-linkedin"
                        style={{marginLeft: '20px'}}
                        />
                        <a
                        className='git-linked'
                        style={{color: 'black', marginLeft: '5px', cursor: 'pointer'}}
                        href='https://www.linkedin.com/in/dylan-luu-0a869b1b8/' target='_blank'>LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotsBrowser;
