import { motion } from 'framer-motion';
import { FiEdit2, FiPlus, FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';

interface Employee {
  id: number;
  name: string;
  designation: string;
  empId: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
}

const Employee = () => {
  // Sample employee data
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Smith', designation: 'Software Engineer', empId: 'EMP001', phone: '9876543210', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Sarah Johnson', designation: 'HR Manager', empId: 'EMP002', phone: '8765432109', email: 'sarah@example.com', status: 'active' },
    { id: 3, name: 'Michael Brown', designation: 'Product Manager', empId: 'EMP003', phone: '7654321098', email: 'michael@example.com', status: 'inactive' },
    { id: 4, name: 'Emily Davis', designation: 'UX Designer', empId: 'EMP004', phone: '6543210987', email: 'emily@example.com', status: 'active' },
    { id: 5, name: 'Robert Wilson', designation: 'QA Engineer', empId: 'EMP005', phone: '5432109876', email: 'robert@example.com', status: 'inactive' },
    { id: 6, name: 'Jennifer Lee', designation: 'Frontend Developer', empId: 'EMP006', phone: '4321098765', email: 'jennifer@example.com', status: 'active' },
    { id: 7, name: 'David Miller', designation: 'Backend Developer', empId: 'EMP007', phone: '3210987654', email: 'david@example.com', status: 'active' },
    { id: 8, name: 'Jessica Taylor', designation: 'Marketing Specialist', empId: 'EMP008', phone: '2109876543', email: 'jessica@example.com', status: 'inactive' },
    { id: 9, name: 'Daniel Anderson', designation: 'DevOps Engineer', empId: 'EMP009', phone: '1098765432', email: 'daniel@example.com', status: 'active' },
    { id: 10, name: 'Lisa Martinez', designation: 'Data Analyst', empId: 'EMP010', phone: '0987654321', email: 'lisa@example.com', status: 'active' },
    { id: 11, name: 'James Wilson', designation: 'Team Lead', empId: 'EMP011', phone: '9876543211', email: 'james@example.com', status: 'active' },
    { id: 12, name: 'Emma Thompson', designation: 'Content Writer', empId: 'EMP012', phone: '8765432110', email: 'emma@example.com', status: 'inactive' },
  ]);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Filter employees based on search term
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm)
    );
  }, [employees, searchTerm]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredEmployees.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);

  // Toggle employee status
  const toggleStatus = (id: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' } : emp
    ));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
          </div>
          <Link 
            to="/employee/add-employee" 
            className="flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add Employee
          </Link>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emp ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.length > 0 ? (
                records.map((employee, index) => (
                  <motion.tr 
                    key={employee.id}
                    variants={itemVariants}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{firstIndex + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.designation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.empId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        onClick={() => toggleStatus(employee.id)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                          employee.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {employee.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/employees/edit/${employee.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                        aria-label={`Edit ${employee.name}`}
                      >
                        <FiEdit2 className="inline" />
                      </Link>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr 
                  variants={itemVariants}
                  className="hover:bg-gray-50"
                >
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    No employees found
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredEmployees.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{firstIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(lastIndex, filteredEmployees.length)}</span> of{' '}
                  <span className="font-medium">{filteredEmployees.length}</span> employees
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    aria-label="First page"
                  >
                    <span className="sr-only">First</span>
                    <FiChevronLeft className="h-5 w-5" />
                    <FiChevronLeft className="h-5 w-5 -ml-2" />
                  </button>
                  <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    aria-label="Previous page"
                  >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum 
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' 
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                        aria-label={`Page ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    aria-label="Next page"
                  >
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    aria-label="Last page"
                  >
                    <span className="sr-only">Last</span>
                    <FiChevronRight className="h-5 w-5" />
                    <FiChevronRight className="h-5 w-5 -ml-2" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Employee;