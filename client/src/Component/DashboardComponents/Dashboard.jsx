import EmpolyeeDash from './EmployeeDashboard';
import EmpolyerDash from './EmployerDashboard/[EmployerDashboard]'

const Dashboard = () => {

    const tempData = localStorage.getItem('user');
    const type = JSON.parse(tempData).type;
    return (
        <div>
            {type==="employee"? <EmpolyeeDash /> : <EmpolyerDash />}
        </div>
    )
}

export default Dashboard;