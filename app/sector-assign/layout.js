

import CreatePage from "./assign/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SectorLayout({ children} ) {
    return (
        <div className='container mx-auto px-4 py-4'>
        {children}    
        <ToastContainer />                
        </div>

    )
}
