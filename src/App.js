import React, {useState} from "react";
import Form from "@rjsf/core";
import {Container, Row, Col} from "react-bootstrap";

function App() {
    const [formData, setFormData] = useState(null);
    // const cascade = {
    //   blank: {
    //     type: "string",
    //     enum: ["Other"],
    //     enumNames: ["Other"],
    //   },
    //   country: {
    //     type: "string",
    //     enum: ["DE", "IT", "JP", "US", "Other"],
    //     enumNames: ["Deutch", "Italia", "Japan", "United State", "Other"],
    //   },
    //   US: {
    //     type: "string",
    //     enum: ["AZ", "CA", "NY"],
    //     enumNames: ["Arizona", "California", "New York"],
    //   },
    // };

    /*const schema = {
      type: "object",
      description: "This is Example Form",
      definitions: cascade,
      properties: {
        questionGroup1: {
          title: "Question Group 1",
          description: "We can have Form Descripition here",
          type: "object",
          properties: {
            name: {
              type: "string",
              title: "1. Please enter your name",
              default: "A new task",
            },
            Gender: {
              title: "2. Gender",
              type: "boolean",
            },
            birthDate: {
              type: "string",
              title: "3. Please enter your birth date",
              format: "date",
            },
            address: {
              title: "",
              type: "object",
              properties: {
                country: {
                  type: "string",
                  title: "4.1 Country",
                  $ref: "#/definitions/country",
                },
              },
              dependencies: {
                country: {
                  properties: {
                    state: {
                      type: "string",
                      title: "4.2 State",
                      $ref: cascade?.[formData?.questionGroup1?.address?.country]
                        ? `#/definitions/${formData.questionGroup1.address.country}`
                        : `#/definitions/blank`,
                    },
                  },
                  required: ["state"],
                },
              },
            },
            tags: {
              type: "string",
              title: "5. Interested in",
              examples: ["Comic Books", "Computer", "Science"],
            },
          },
          required: ["name"],
        },
      },
    };*/

    const schema = {
        title: "Form title",
        description: "Form description",
        type: "object",
        properties: {
            group1: {
                type: "object",
                title: "group1",
                properties: {
                   // required: [123456, 567890],
                    123456: {type: "string", title: "1. Title", default: "A new task"},
                    546785: {type: "boolean", title: "2. Done", default: false},
                    567890: {type: "string", title: "3. date", format: "date"},
                    231456: {
                        "type": "string",
                        "format": "data-url",
                        "title": "4. We only accept .png files"
                    }
                }
            },
            group2: {
                type: "object",
                title: "group2",
                properties: {
                    required: ["123897"],
                    123897: {
                        title: "Repeated question group with 2 questions",
                        description: "Press the blue add button to add responses, the red one to delete iteration",
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                123654789: {
                                    title: "1. Name of pet",
                                    type: "string",
                                    default: "Bethoven"
                                },
                                1236547895: {
                                    title: "2. Age of pet",
                                    type: "string",
                                    default: "2"
                                },
                                7236547895: {
                                    title: "3. Type",
                                    type: "string",
                                    default: "Cat",
                                    enum: [
                                        "Cat",
                                        "Dog",
                                        "Snake"
                                    ],
                                    enumNames: [
                                        "Cat",
                                        "Dog",
                                        "Snake"
                                    ]
                                }
                            }
                        }
                    },
                    123: {
                        type: "object",
                        title: "Dependent questions made different",
                        anyOf: [
                            {
                                title: "First method of identification",
                                properties: {
                                    firstName: {
                                        type: "string",
                                        title: "First name",
                                        default: "Chuck"
                                    },
                                    lastName: {
                                        type: "string",
                                        title: "Last name"
                                    }
                                }
                            },
                            {
                                title: "Second method of identification",
                                properties: {
                                    idCode: {
                                        type: "string",
                                        title: "ID code"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
    };

    /* const uiSchema = {
       questionGroup1: {
         classNames: "custom-class-name",
         birthDate: { "ui:widget": "date", classNames: "test" },
         address: { "ui:widget": "custom" },
         tags: {
           "ui:help": "Please Type",
         },
       },
     };*/
    const uiSchema = {
        group1: {
            231456: {
                "ui:options": {
                    "accept": [".png", ".jpg"]
                }
            },
            //order questions else they are shown in the wrong order
            "ui:order": [
                "123456",
                "546785",
                "567890",
                "231456"
            ]
        }
    };
    return (
        <Container>
            <Row>
                <Col>
                    <Form
                        schema={schema}
                        formData={formData}
                        onChange={(e) => setFormData(e.formData)}
                        onSubmit={(e) => console.log(e)}
                        uiSchema={uiSchema}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
