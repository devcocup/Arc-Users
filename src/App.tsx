import React, { useEffect, useState } from 'react';
import { Table, CircularProgress, Container, TableContainer, Paper, makeStyles, TableHead, TableRow, TableCell, TableBody, Avatar, Button } from '@material-ui/core';

import { User } from './@types/common';
import { getUsers } from './functions/api';

const useStyles = makeStyles({
  app: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    display: 'flex !important',
    flexDirection: 'column'
  },
  error_text: {
    textAlign: 'center',
    fontSize: 'larger',
    fontWeight: 600,
    color: 'red'
  },
  table: {
    minWidth: 650,
  },
  button: {
    alignSelf: 'flex-end',
    margin: 15,
  }
})

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  const fetchUsers = () => {
    setLoading(true);
    getUsers().then((res: User[]) => {
      setUsers(res);
      setLoading(false); 
    }).catch((err: Error) => {
      setError(err.message);
      setLoading(false);
    })
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <Container className={classes.app}><CircularProgress /></Container>
  }

  if (error.length > 0) {
    return <Container className={classes.app}><p className={classes.error_text}>{error}</p></Container>
  }
  return (
    <Container className={classes.app}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => {
          fetchUsers()
        }}
      >
        Refresh
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Password</TableCell>
              <TableCell align="left">Photo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row: User) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.password}</TableCell>
                <TableCell align="left"><Avatar src={row.photo_url} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
