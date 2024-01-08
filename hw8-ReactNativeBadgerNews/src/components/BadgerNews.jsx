import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState, useContext } from 'react';
import BadgerTabs from './navigation/BadgerTabs';
import NewsArticle from './NewsArticle';
import PrefContext from "./contexts/PrefContext";



export default function BadgerNews(props) {

  // Just a suggestion for Step 4! Maybe provide this to child components via context...
  const [prefs, setPrefs] = useState({});

  return (
    <PrefContext.Provider value = {[prefs, setPrefs]}>
      <NavigationContainer>
        <BadgerTabs/>
      </NavigationContainer>
    </PrefContext.Provider>
  );
}