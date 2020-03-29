import React, { useState, useEffect } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Getcountries() {
  const clr = [
    "",
    "primary",
    "success",
    "secondary",

    "danger",
    "warning",
    "info",
    "secondary",
    "dark"
  ];

  const [data, setData] = useState({});
  // const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(
      `https://thevirustracker.com/free-api?countryTotals=ALL`
    );

    const json = await response.json();

    //console.log(json.results);
    const d = json.countryitems[0];

    // d.sort((a, b) => {
    //   debugger;
    //   return a.total_cases - b.total_cases;
    // });

    setData(d);

    //setLoading(false;
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  //return [data, loading];
  return (
    <Container fluid>
      {Object.keys(data).map((key, index) => (
        <Alert key={index} variant={"info"}>
          <div
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: "19px"
            }}
          >
            {data[key].title}
          </div>
          <hr />
          <Row key={index} style={{ textAlign: "center" }}>
            {Object.keys(data[key]).map((keyName, i) =>
              keyName.includes("total") ? (
                <Col
                  key={i}
                  style={{
                    textTransform: "capitalize",
                    border: "1px solid #C4C4C4",
                    fontWeight: "bold"
                  }}
                >
                  <p
                    style={{
                      fontSize: "28px",
                      textShadow: "1px 2px 2px #666",
                      fontFamily: "calibri,Open Sans"
                    }}
                    className={`text-${clr[i - 3]}`}
                  >
                    {data[key][keyName]}
                  </p>
                  <p style={{ fontSize: "9px", padding: "5px 0px 0px 1px" }}>
                    {keyName
                      .replace("_", " ")
                      .replace("_", " ")
                      .replace("_", " ")}
                  </p>
                </Col>
              ) : (
                ""
              )
            )}
          </Row>
        </Alert>
      ))}
    </Container>
  );
}
export { Getcountries };
