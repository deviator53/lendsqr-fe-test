import React, { useState, useEffect } from 'react'
import UserIcon from "../images/user-icon.png";
import LoanIcon from "../images/loans-icon.png";
import ActiveUser from "../images/active-icon.png";
import SavingsIcon from "../images/savings-icon.png";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';
import { Stack, Box } from '@mui/material';


import Axios from 'axios';

type User = {
  id: number;
  orgName: string;
  userName: string;
  phoneNumber: string;
  email: string;
  createdAt: string;

};

const Users = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios.get('https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users');
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const options = {
      year: 'numeric' as const, 
      month: 'long' as const, 
      day: 'numeric' as const, 
      hour: 'numeric' as const, 
      minute: 'numeric' as const, 
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date); // Format the date using Intl.DateTimeFormat
  };


  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePagination = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // const usersPerPage = 10;
  // const startIndex = (page - 1) * usersPerPage;
  // const endIndex = startIndex + usersPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);
 

  return (
    <>
      <div className="p-5">
        <h2 className="text-[#213F7D] text-2xl font-semibold my-3">Users</h2>
        <div className="flex flex-wrap gap-7">
          <div className="w-[240px] h-[160px] bg-white shadow-md">
            <div className="p-6">
              <div className="w-[50px] h-[50px]">
                <img src={UserIcon} alt="userIcon" className="w-full h-full object-fit" />
              </div>
              <p className="ml-2 my-2 text-[#545F7D]">USERS</p>
              <p className="ml-2 font-semibold text-lg text-[#213F7D]">2,453</p>
            </div>
          </div>

          <div className="w-[240px] h-[160px] bg-white shadow-md">
            <div className="p-6">
              <div className="w-[50px] h-[50px]">
                <img src={ActiveUser} alt="userIcon" className="w-full h-full object-fit" />
              </div>
              <p className="ml-2 my-2 text-[#545F7D]">ACTIVE USERS</p>
              <p className="ml-2 font-semibold text-lg text-[#213F7D]">2,453</p>
            </div>
          </div>

          <div className="w-[240px] h-[160px] bg-white shadow-md">
            <div className="p-6">
              <div className="w-[50px] h-[50px]">
                <img src={LoanIcon} alt="userIcon" className="w-full h-full object-fit" />
              </div>
              <p className="ml-2 my-2 text-[#545F7D]">USERS WITH LOANS</p>
              <p className="ml-2 font-semibold text-lg text-[#213F7D]">12,453</p>
            </div>
          </div>

          <div className="w-[240px] h-[160px] bg-white shadow-md">
            <div className="p-6">
              <div className="w-[50px] h-[50px]">
                <img src={SavingsIcon} alt="userIcon" className="w-full h-full object-fit" />
              </div>
              <p className="ml-2 my-2 text-[#545F7D]">USERS WITH SAVINGS</p>
              <p className="ml-2 font-semibold text-lg text-[#213F7D]">102,453</p>
            </div>
          </div>

        </div>
        <div className="mt-[40px] pb-[100px]">
          <div className="w-full h-full  rounded-md shadow-md bg-white">
            <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                        <TableCell>ORGANIZATION <IconButton><FilterListIcon/></IconButton></TableCell>
                        <TableCell>USERNAME <IconButton><FilterListIcon/></IconButton></TableCell>
                        <TableCell>EMAIL <IconButton><FilterListIcon/></IconButton></TableCell>
                        <TableCell>PHONE NUMBER <IconButton><FilterListIcon/></IconButton></TableCell>
                        <TableCell>DATE JOINED <IconButton><FilterListIcon/></IconButton></TableCell>
                        <TableCell> STATUS <IconButton><FilterListIcon/></IconButton></TableCell>
                     </TableRow>
                </TableHead>
                <TableBody>
                  {error ? (
                    <div>Error: {error}</div>
                    ) : loading ? (
                    <div className="flex justify-center p-[40px] text-2xl font-bold">Loading...</div>
                  ) : (
                    displayedUsers?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.orgName}</TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>{formatCreatedAt(user.createdAt)}</TableCell>
                      <TableCell><IconButton><MoreVertIcon /></IconButton></TableCell>
                   </TableRow>
                    ))
                  )}
                  
                </TableBody>
                </Table>
                
            </TableContainer>
            
          </div>
          <Stack direction="row" justifyContent="between" alignItems="center" spacing={2} mt={2}>
          <TablePagination
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box sx={{ flexGrow: 1 }} />
          <Pagination
            count={Math.ceil(users.length / rowsPerPage)}
            shape="rounded"
            page={page + 1}
              onChange={handleChangePagination}
              sx={{flexDirection: 'flex-end'}}
          />
         </Stack>
        </div>
      </div>
    </>
  )
}

export default Users