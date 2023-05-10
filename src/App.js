import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import("./components/dashboard/dashboard"))
    
function App() {
    return (
    <div>
        <Suspense fallback={<div>isLoading...</div>}>
            <Dashboard />
        </Suspense>
    </div>
    );
}
export default App;