import Header from '../Header';
import KpiCard from '../KpiCard';
import EmptyState from '../EmptyState';

const EmployeesModule = ({ userProfile, onOpenModal, onLogout, onNavigate, kpiData, employees, onDeleteEmployee }) => {
    return (
        <div className="module-container active" id="employees-module">
            <div className="kpi-cards">
                <KpiCard title="Total Employees" value={kpiData.totalEmployees} />
                <KpiCard title="Present Today" value={kpiData.totalEmployees} />
                <KpiCard title="Attendance Rate" value="100%" />
                <KpiCard title="On Leave" value="0" />
            </div>

            <div className="data-table">
                <div className="table-header"><h3>Employee Directory</h3></div>
                <table>
                    <thead>
                        <tr><th>Employee</th><th>Position</th><th>Department</th><th>Project</th><th>Contact</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr><td colSpan="7"><EmptyState icon="users" title="No Employees" message="Add your first employee to get started" /></td></tr>
                        ) : (
                            employees.map(employee => {
                                const initials = employee.name.split(' ').map(n => n[0]).join('').toUpperCase();
                                return (
                                    <tr key={employee.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div className="user-avatar" style={{ width: '35px', height: '35px', fontSize: '0.8rem' }}>{initials}</div>
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{employee.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>ID: EMP{employee.id.substring(0, 4)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{employee.position}</td>
                                        <td>{employee.department.charAt(0).toUpperCase() + employee.department.slice(1)}</td>
                                        <td>{employee.project}</td>
                                        <td>{employee.email}</td>
                                        <td><span className={`status-badge status-${employee.status}`}>{employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}</span></td>
                                        <td>
                                            <button className="chart-actions button"><i className="fas fa-edit"></i></button>
                                            <button className="chart-actions button" onClick={() => onDeleteEmployee(employee.id)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeesModule;