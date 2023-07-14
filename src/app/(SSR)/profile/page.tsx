"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Spinner,
  Container,
  Collapse,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import data from "./data.json";

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
  const [cookies] = useCookies(["token"]);
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
      const endpoint = "http://127.0.0.1:8000/api/auth/profile";
      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + cookies["token"],
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
          toast.error("Error fetching profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Error fetching profile data");
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
    <center>
    <Card className="p-4 bg-dark">
      <Card.Body>
        <Card.Title className="mb-4  fw-bold display-4" >
          User Profile
        </Card.Title>

        {loading ? (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Container>
            {username && (
              <Card className="border border-light p-4 mb-4">
                <Card.Title className=" fw-bold h5 mb-4">
                  Profile Information
                </Card.Title>
                <ul className="list-unstyled">
                  <li>
                    <strong className="">First Name:</strong>{" "}
                    {fname}
                  </li>
                  <li>
                    <strong className="">Last Name:</strong> {lname}
                  </li>
                  <li>
                    <strong className="">Email:</strong> {email}
                  </li>
                </ul>
              </Card>
            )}

            {/* Double collapsible widgets */}
            <Card className="border border-light p-4">
              <Card.Title className=" fw-bold h5 mb-4">
                Collapsible Widgets
              </Card.Title>
              {stepData.length > 0 &&
                stepData.map((step: StepData, index: number) => {
                  const subHeadings = step.sub_headings || [];
                  const urls = step.urls || [];

                  return (
                    <Card
                      className="border border-light p-4 mb-4"
                      key={index}
                    >
                      <Card.Title className=" fw-bold h5 mb-4">
                        {step.heading}
                      </Card.Title>
                      {subHeadings.length > 0 &&
                        subHeadings.map(
                          (subHeading: string, subIndex: number) => {
                            const urlData: UrlData[] = urls[subIndex] || [];

                            return (
                              <div key={subIndex}>
                                <Button
                                  variant="link"
                                  onClick={toggleOuterCollapse}
                                  aria-expanded={outerOpen}
                                  aria-controls={`outer-collapse-content-${index}-${subIndex}`}
                                  className={`d-flex align-items-center mt-3 ${outerOpen ? "rotate" : ""
                                    }`}
                                >
                                  <span
                                    className={`me-2 ${outerOpen ? "rotate" : ""
                                      }`}
                                  >
                                    {outerOpen ? (
                                      <FaAngleDown />
                                    ) : (
                                      <FaAngleRight />
                                    )}
                                  </span>
                                  <strong>{subHeading}</strong>
                                </Button>
                                <Collapse in={outerOpen}>
                                  <div
                                    id={`outer-collapse-content-${index}-${subIndex}`}
                                    className="my-3"
                                  >
                                    {urlData.length > 0 &&
                                      urlData.map(
                                        (urlObj: any, innerIndex: number) => {
                                          const innerKey =
                                            Object.keys(urlObj)[0];
                                          const { topic, link, status } =
                                            urlObj[innerKey];

                                          return (
                                            <Card
                                              className="border border-light p-4 mb-4"
                                              key={innerIndex}
                                            >
                                              <Card.Title className=" fw-bold h5 mb-4">
                                                {topic}
                                              </Card.Title>
                                              <ul className="list-unstyled">
                                                <li>
                                                  <Button className="my-4">
                                                    <a href={link}>Solve</a>
                                                  </Button>
                                                  <br />
                                                  <DropdownButton
                                                    id="dropdown-basic-button"
                                                    title="Status"
                                                  >
                                                    <Dropdown.Item href="#/action-1">
                                                      Visited
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2" cl>
                                                      Unvisited
                                                    </Dropdown.Item>

                                                  </DropdownButton>

                                                </li>
                                              </ul>
                                            </Card>
                                          );
                                        }
                                      )}
                                  </div>
                                </Collapse>
                              </div>
                            );
                          }
                        )}
                    </Card>
                  );
                })}
            </Card>
          </Container>
        )}
      </Card.Body>
    </Card>
    </center>
  );
};

export default ProfilePage;
