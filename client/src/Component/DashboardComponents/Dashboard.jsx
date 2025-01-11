import EmpolyeeDash from './EmployeeDashboard';
import EmpolyerDash from './EmployerDashboard/[EmployerDashboard]'

const Dashboard = () => {

    const data = localStorage.getItem('userType');

    return (
        <div>
            {data === 'user' ? <EmpolyeeDash /> : <EmpolyerDash />}
        </div>
    )
}

export default Dashboard;