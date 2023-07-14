"use client"
import { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';

interface UserData {
  fname: string;
  lname: string;
  email: string;
  userId: string;
}

const ProfilePage = () => {
  const [cookies] = useCookies(['token']);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const endpoint = 'http://127.0.0.1:8000/api/auth/profile';
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + cookies['token'],
      },
    };

    try {
      const response = await fetch(endpoint, options);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        toast.error('Error fetching profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Error fetching profile data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="m-4 p-4 bg-light border border-primary rounded">
      <Card.Body>
        <Card.Title className="mb-4 text-primary fw-bold display-4">
          User Profile
        </Card.Title>
        <Button
          onClick={fetchProfileData}
          variant="primary"
          className="mb-3"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Loading...
            </>
          ) : (
            'Fetch Profile Data'
          )}
        </Button>

        {loading ? (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {userData ? (
              <Card className="border border-primary p-4">
                <Card.Title className="text-primary fw-bold h5 mb-4">
                  Profile Information
                </Card.Title>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong className="text-primary">First Name:</strong>{' '}
                    {userData.fname}
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary">Last Name:</strong>{' '}
                    {userData.lname}
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary">Email:</strong>{' '}
                    {userData.email}
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary">User ID:</strong>{' '}
                    {userData.userId}
                  </li>
                </ul>
              </Card>
            ) : (
              <p className="text-danger">No profile data available.</p>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfilePage;
