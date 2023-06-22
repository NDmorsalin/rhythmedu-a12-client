import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const useChangeTitle = () => {
  const location = useLocation();
  const { id } = useParams()
  // console.log(id);
  useEffect(() => {

    if (location.pathname !== "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    document.title = 'RhythmEdu | ' + getTitle(location.pathname, id);
  }, [location.pathname])
};

function getTitle(pathname, id) {
  switch (pathname) {
    case '/':
      return 'Home';
    case '/instructors':
      return 'Instructors';
    case `/instructors/${id}/Classes`:
      return 'Instructors Classes';
    case '/classes':
      return 'Classes';
    case '/dashboard/student':
      return 'Selected Classes';
    case '/dashboard/student/enrolledClass':
      return 'Enrolled Class';
    case '/dashboard/student/paymenthistory':
      return 'Payment History';
    case '/auth/login':
      return 'Login';
    case '/auth/register':
      return 'Login';
    case '/dashboard/admin':
      return 'Manage Users';
    case 'dashboard/admin/manageClasses':
      return 'Manage Classes';
    case '/dashboard/instructor':
      return 'Add A Class';
    case '/dashboard/instructor/myClasses':
      return 'My Classes';

    default:
      return '';
  }
}

export default useChangeTitle;