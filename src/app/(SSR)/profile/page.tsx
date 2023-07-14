"use client"
import { useEffect, useState } from 'react';
import { Card, Button, Spinner, Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import  Accordion  from '../../../components/Accordion';


import { toast } from 'react-hot-toast';

interface UserData {
  fname: string;
  lname: string;
  email: string;
  userId: string;
}

const ProfilePage = () => {
  const [cookies] = useCookies(['token']);
  const [username, setUserName] = useState(null);
  const [email, setUserEmail] = useState(null);
  const [fname, setUserFname] = useState(null);
  const [lname, setUserLname] = useState(null);
  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchdata(){
      
      const endpoint = 'http://127.0.0.1:8000/api/auth/profile';
      const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + cookies['token'],
      }
    }
      try{
      const response = await fetch(endpoint, options);
      const data = await response.json();
      const obj = JSON.parse(data)
     
      setUserName(obj.username)
      setUserEmail(obj.email)
      setUserLname(obj.lname)
      setUserFname(obj.fname)
      setLoading(false)
      }catch{
        console.log("err")
        setUserName(null)
      }
      }
  fetchdata()
 
}, []);

  // const fetchProfileData = async () => {
  //   const endpoint = 'http://127.0.0.1:8000/api/auth/profile';
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + cookies['token'],
  //     },
  //   };

  //   try {
      

  //     if (response.ok) {
  //       setUserData(data);
  //     } else {
  //       toast.error('Error fetching profile data');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching profile data:', error);
  //     toast.error('Error fetching profile data');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const accordionItems = [
    {
      title: 'Item #1',
      content: (
        <div>
          <strong>This is the first item's accordion body.</strong> It is hidden
          by default, but shown when the title is clicked. It will also be
          hidden if the title is clicked again or when another item is clicked.
        </div>
      ),
    },
    {
      title: 'Item #2',
      content: (
        <div>
          <strong>This is the second item's accordion body.</strong> It is
          hidden by default, but shown when the title is clicked. It will also
          be hidden if the title is clicked again or when another item is
          clicked. 
        </div>
      ),
    },
    {
      title: 'Item #3',
      content: (
        <div>
          <strong>This is the third item's accordion body.</strong> It is hidden
          by default, but shown when the title is clicked. It will also be
          hidden if the title is clicked again or when another item is clicked.
          
        </div>
      ),
    },
  ];







  return (
    
    <Card className="m-4 p-4 bg-light border border-primary rounded">
      <Card.Body>
        <Card.Title className="mb-4 text-primary fw-bold display-4">
          User Profile
        </Card.Title>
            

        {loading ? (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div>
          <Container className='mb-4'>
            {username ? (
              <Card className="border border-primary p-4">
                <Card.Title className="text-primary fw-bold h5 mb-4">
                  Profile Information
                </Card.Title>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong className="text-primary">First Name:</strong>{' '}
                    {fname}
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary">Last Name:</strong>{' '}
                    {lname}
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary">Email:</strong>{' '}
                    {email}
                  </li>
                  
                </ul>
              </Card>
              


            ) : (
              <p className="text-danger">No profile data available.</p>
            )}
          </Container>
          
          
          <Container>
            {username ? (
              <Card className="border border-primary p-4">
                <Card.Title className="text-primary fw-bold h5 mb-4">
                  Coding Status
                </Card.Title>
                <ul className="list-unstyled">
                <Accordion items={accordionItems} />
                </ul>

              </Card>
              


            ) : (
              <p className="text-danger">No profile data available.</p>
            )}
          </Container>
          </div>
          
        )}
      </Card.Body>
    </Card>
    
    

   
    
  );
};

export default ProfilePage;
