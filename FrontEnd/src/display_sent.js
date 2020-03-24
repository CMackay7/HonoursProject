import React from 'react';
import {Link} from 'react-router-dom'

function DataDisplay() {
    return(        
    <nav>
        <h3>Logo</h3>
        <ul>
            <Link to='/'>
                <li>Standard</li>
            </Link>
            <Link to='/ranked'>
                <li>Ranked</li>
            </Link>
            <Link to='/score'>
                <li>Score</li>
            </Link>
        </ul>
    </nav>
    );
}

export default DataDisplay;