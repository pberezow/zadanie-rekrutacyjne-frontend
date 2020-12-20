import React, {useState} from 'react'

import 'semantic-ui-css/semantic.min.css'
import TopNav from './components/topNav/TopNav'
import MainContainer from './components/mainContainer/MainContainer'

import './App.css';
import Locale from './locale'

const App = () => {
    const [lang, setLang] = useState(Locale.defaultLocale)

    const setLanguage = () => {
        lang === 'pl' ? setLang('en') : setLang('pl')
    }

    return (
        <div className="App" style={{minHeight: '100vh'}}>

            <TopNav language={lang} setLanguage={setLanguage} />
            <MainContainer language={lang} />

        </div>

    );
}

export default App;
