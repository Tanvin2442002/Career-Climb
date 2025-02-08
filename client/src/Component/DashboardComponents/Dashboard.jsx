import EmpolyeeDash from './EmployeeDashboard';
import EmpolyerDash from './EmployerDashboard/[EmployerDashboard]'

const Dashboard = () => {

    const tempData = JSON.parse(sessionStorage.getItem('tempData'));

    return (
        <div>
            {tempData.isEmployee ? <EmpolyeeDash /> : <EmpolyerDash />}
        </div>
    )
}

export default Dashboard;