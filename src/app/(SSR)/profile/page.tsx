"use client"
import { useEffect, useState } from 'react';
import { Card, Button, Spinner, Container, Collapse } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

interface UserData {
  fname: string;
  lname: string;
  email: string;
  userId: string;
}

const ProfilePage = () => {
  const [cookies] = useCookies(['token']);
  const [username, setUserName] = useState<string | null>(null);
  const [email, setUserEmail] = useState<string | null>(null);
  const [fname, setUserFname] = useState<string | null>(null);
  const [lname, setUserLname] = useState<string | null>(null);
  const [outerOpen, setOuterOpen] = useState<boolean>(false);
  const [innerOpen, setInnerOpen] = useState<boolean>(false);

  const toggleOuterCollapse = () => {
    setOuterOpen(!outerOpen);
  };

  const toggleInnerCollapse = () => {
    setInnerOpen(!innerOpen);
  };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
        const obj = await JSON.parse(data);

        if (response.ok) {
          setUserName(obj.username);
          setUserEmail(obj.email);
          setUserLname(obj.lname);
          setUserFname(obj.fname);
        } else {
          toast.error('Error fetching profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Error fetching profile data');
        setUserName(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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
          <Container>
            {username && (
              <Card className="border border-primary p-4 mb-4">
                <Card.Title className="text-primary fw-bold h5 mb-4">
                  Profile Information
                </Card.Title>
                <ul className="list-unstyled">
                  <li>
                    <strong className="text-primary">First Name:</strong>{' '}
                    {fname}
                  </li>
                  <li>
                    <strong className="text-primary">Last Name:</strong>{' '}
                    {lname}
                  </li>
                  <li>
                    <strong className="text-primary">Email:</strong> {email}
                  </li>
                </ul>
              </Card>
            )}

            <Card className="border border-primary p-4">
              <Card.Title className="text-primary fw-bold h5 mb-4">
                Collapsible Widgets
              </Card.Title>
              <Button
                variant="link"
                onClick={toggleOuterCollapse}
                aria-expanded={outerOpen}
                aria-controls="outer-collapse-content"
                className={`d-flex align-items-center mt-3 ${
                  outerOpen ? 'rotate' : ''
                }`}
              >
                <span className={`me-2 ${outerOpen ? 'rotate' : ''}`}>
                  {outerOpen ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleRight />
                  )}
                </span>
                <strong>Toggle Outer Widget</strong>
              </Button>
              <Collapse in={outerOpen}>
                <div id="outer-collapse-content">
                  <hr className="my-4" />
                  <Card className="border border-primary p-4">
                    <Card.Title className="text-primary fw-bold h5 mb-4">
                      Inner Widget
                    </Card.Title>
                    <Button
                      variant="link"
                      onClick={toggleInnerCollapse}
                      aria-expanded={innerOpen}
                      aria-controls="inner-collapse-content"
                      className={`d-flex align-items-center mt-3 ${
                        innerOpen ? 'rotate' : ''
                      }`}
                    >
                      <span className={`me-2 ${innerOpen ? 'rotate' : ''}`}>
                        {innerOpen ? (
                          <FaAngleDown />
                        ) : (
                          <FaAngleRight />
                        )}
                      </span>
                      <strong>Toggle Inner Widget</strong>
                    </Button>
                    <Collapse in={innerOpen}>
                      <div id="inner-collapse-content">
                        <Card.Body>
                          <p>
                            This is the inner widget content. It can be
                            expanded or collapsed based on the button click.
                          </p>
                        </Card.Body>
                      </div>
                    </Collapse>
                  </Card>
                </div>
              </Collapse>
            </Card>
          </Container>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfilePage;
