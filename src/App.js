import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, Suspense } from 'react'
import { Spinner } from 'react-bootstrap';

const Dashboard = lazy(() => import("./components/dashboard/dashboard"))
    
function App() {
    return (
    <div>
        <Suspense fallback={
            <div style={{height:"98vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center", overflow:'hidden'}} className="loader" key={0}>
            Loading<Spinner style={{dispaly:"flex",justifyContent:"center"}} animation="border" variant="success" />
        </div>
        }>
            <Dashboard />
        </Suspense>
    </div>
    );
}
export default App;