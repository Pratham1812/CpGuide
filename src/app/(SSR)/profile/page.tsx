"use client"
import { useEffect, useState } from 'react';
import { Card, Button, Spinner, Container, Collapse } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import data from './data.json';

interface UserData {
  fname: string;
  lname: string;
  email: string;
  userId: string;
}

interface UrlData {
  topic: string;
  link: string;
  status: string;
}

interface StepData {
  heading: string;
  sub_headings: string[];
  urls: UrlData[][];
}

const ProfilePage: React.FC = () => {
  const [cookies] = useCookies(['token']);
  const [username, setUserName] = useState<string | null>(null);
  const [email, setUserEmail] = useState<string | null>(null);
  const [fname, setUserFname] = useState<string | null>(null);
  const [lname, setUserLname] = useState<string | null>(null);
  const [outerOpen, setOuterOpen] = useState<boolean>(false);
  const [innerOpen, setInnerOpen] = useState<boolean>(false);
  const [stepData, setStepData] = useState<StepData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleOuterCollapse = () => {
    setOuterOpen(!outerOpen);
  };

  const toggleInnerCollapse = () => {
    setInnerOpen(!innerOpen);
  };

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

  useEffect(() => {
    const parsedData: StepData[] = Object.values(data).map((step: any) => ({
      heading: step.heading,
      sub_headings: step.sub_headings,
      urls: step.urls,
    }));

    setStepData(parsedData);
    setLoading(false);
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

            {/* Double collapsible widgets */}
            <Card className="border border-primary p-4">
              <Card.Title className="text-primary fw-bold h5 mb-4">
                Collapsible Widgets
              </Card.Title>
              {stepData.length > 0 &&
                stepData.map((step: StepData, index: number) => {
                  const subHeadings = step.sub_headings || [];
                  const urls = step.urls || [];

                  return (
                    <Card className="border border-primary p-4 mb-4" key={index}>
                      <Card.Title className="text-primary fw-bold h5 mb-4">
                        {step.heading}
                      </Card.Title>
                      {subHeadings.length > 0 &&
                        subHeadings.map((subHeading: string, subIndex: number) => {
                          const urlData = urls[subIndex] || [];

                          return (
                            <div key={subIndex}>
                              <Button
                                variant="link"
                                onClick={toggleOuterCollapse}
                                aria-expanded={outerOpen}
                                aria-controls={`outer-collapse-content-${index}-${subIndex}`}
                                className={`d-flex align-items-center mt-3 ${
                                  outerOpen ? 'rotate' : ''
                                }`}
                              >
                                <span
                                  className={`me-2 ${
                                    outerOpen ? 'rotate' : ''
                                  }`}
                                >
                                  {outerOpen ? <FaAngleDown /> : <FaAngleRight />}
                                </span>
                                <strong>{subHeading}</strong>
                              </Button>
                              <Collapse in={outerOpen}>
                                <div
                                  id={`outer-collapse-content-${index}-${subIndex}`}
                                  className="my-3"
                                >
                                  {urlData.length > 0 &&
                                    urlData.map((urlObj: UrlData, innerIndex: number) => {
                                      const innerKey = Object.keys(urlObj)[0];
                                      const { topic, link, status } = urlObj[innerKey];

                                      return (
                                        <Card
                                          className="border border-primary p-4 mb-4"
                                          key={innerIndex}
                                        >
                                          <Card.Title className="text-primary fw-bold h5 mb-4">
                                            {topic}
                                          </Card.Title>
                                          <ul className="list-unstyled">
                                            <li>
                                              <a href={link}>{innerKey}</a> - {status}
                                            </li>
                                          </ul>
                                        </Card>
                                      );
                                    })}
                                </div>
                              </Collapse>
                            </div>
                          );
                        })}
                    </Card>
                  );
                })}
            </Card>
          </Container>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfilePage;
