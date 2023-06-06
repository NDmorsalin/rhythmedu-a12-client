import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const useChangeTitle = () => {
    const location = useLocation();
    const {id} = useParams()
    // console.log(id);
    useEffect(()=>{

        if (location.pathname !== "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }

        document.title = 'KhelaGor | '+getTitle(location.pathname,id);
    },[location.pathname])
};

function getTitle(pathname,id) {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/alldolls':
        return 'All Dolls';
      case '/mydolls':
        return 'My Dolls';
      case '/addtoy':
        return 'Add a New Doll';
      case '/blog':
        return 'Blog page';
      case '/aboutus':
        return 'About us';
      case `/doll/${id}`:
        return 'Single Doll info';
      default:
        return 'KhelaGor';
    }
  }

export default useChangeTitle;