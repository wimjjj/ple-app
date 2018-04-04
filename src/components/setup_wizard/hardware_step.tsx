import * as React from "react";
import * as Immutable from "immutable";
import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Icon,
  Modal,
  Collapse,
  InputNumber,
  Input,
  Form,
  Select,
  List
} from "antd";
import { ArduinoCodeblockData, BlockUIData } from "../../code_generator/types";
import {
  constructButtonData,
  constructLedData
} from "../../code_generator/templates";
import { Info } from "../info";
import { getMetadata } from "../metadata";

type HardwareStepProps = {
  availableTemplates: Immutable.List<ArduinoCodeblockData>;
  setAvailableTemplates: (b: Immutable.List<ArduinoCodeblockData>) => void;
  next: () => void;
};

export const HardwareStep = (props: HardwareStepProps) => (
  <div>
    <Row>
      <Col span={18} offset={3} style={{ marginBottom: 20 }}>
        <h2>
          Configure your setup{" "}
          <Button
            style={{ float: "right" }}
            onClick={() => props.next()}
            type="primary"
          >
            <Icon type="arrow-right" />Start prototyping
          </Button>{" "}
        </h2>
      </Col>
      <Col span={6} offset={5}>
        <h3>Select your hardware</h3>
        <Collapse
          bordered={false}
          accordion
          defaultActiveKey={["0"]}
          style={{ borderRadius: 4, border: "1px solid #d9d9d9" }}
        >
          <Collapse.Panel
            key="1"
            showArrow={false}
            header={
              <h3>
                Button{" "}
                <span
                  style={{ float: "right", marginRight: 15 }}
                  onClick={e =>
                    e.stopPropagation() ||
                    Modal.info({ title: "Button", content: Info.button })
                  }
                >
                  <Icon type="question" />
                </span>
              </h3>
            }
          >
            <ButtonBlock
              addBlock={b =>
                props.setAvailableTemplates(props.availableTemplates.push(b))
              }
            />
          </Collapse.Panel>
          <Collapse.Panel
            key="2"
            showArrow={false}
            header={
              <h3>
                LED{" "}
                <span
                  style={{ float: "right", marginRight: 15 }}
                  onClick={e =>
                    e.stopPropagation() ||
                    Modal.info({ title: "Button", content: Info.button })
                  }
                >
                  <Icon type="question" />
                </span>
              </h3>
            }
          >
            <LedBlock
              addBlock={b =>
                props.setAvailableTemplates(props.availableTemplates.push(b))
              }
            />
          </Collapse.Panel>
        </Collapse>
      </Col>
      <Col span={6} offset={1}>
        <h3>Your selection</h3>
        <List
          bordered
          dataSource={props.availableTemplates.toArray()}
          renderItem={(i: ArduinoCodeblockData) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{i.label.substring(0, 1)}</Avatar>}
                title={
                  <h3>
                    {i.label}{" "}
                    <Button
                      style={{ float: "right" }}
                      onClick={() =>
                        props.setAvailableTemplates(
                          props.availableTemplates.remove(
                            props.availableTemplates.indexOf(i)
                          )
                        )
                      }
                    >
                      <Icon type="delete" />
                    </Button>
                  </h3>
                }
                description={getMetadata(i)
                  .map(d => `${d.key}: ${d.value}`)
                  .join(" | ")}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  </div>
);

class ButtonBlock extends React.Component<
  { addBlock: (b: ArduinoCodeblockData) => void },
  { label: string; port: string }
> {
  constructor(props) {
    super(props);
    this.state = { label: "Button", port: "1" };
  }

  add() {
    this.props.addBlock(constructButtonData(this.state.port, this.state.label));
    this.setState({ label: "Button", port: "1" });
  }

  render() {
    return (
      <Form onSubmit={e => e.preventDefault() && this.add()}>
        <Form.Item>
          <label>Label</label>
          <Input
            value={this.state.label}
            onChange={e =>
              this.setState({ ...this.state, label: e.currentTarget.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <label>Port</label>
          <Select
            value={this.state.port}
            onChange={e => this.setState({ ...this.state, port: e.toString() })}
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="5">5</Select.Option>
            <Select.Option value="6">6</Select.Option>
            <Select.Option value="7">7</Select.Option>
            <Select.Option value="8">8</Select.Option>
            <Select.Option value="9">9</Select.Option>
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="11">11</Select.Option>
            <Select.Option value="12">12</Select.Option>
            <Select.Option value="13">13</Select.Option>
            <Select.Option value="A1">A1</Select.Option>
            <Select.Option value="A2">A2</Select.Option>
            <Select.Option value="A3">A3</Select.Option>
            <Select.Option value="A4">A4</Select.Option>
            <Select.Option value="A5">A5</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={e => this.add()} type="primary">
            <Icon type="plus" />Add
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

class LedBlock extends React.Component<
  { addBlock: (b: ArduinoCodeblockData) => void },
  { label: string; port: string; color: string }
> {
  constructor(props) {
    super(props);
    this.state = { label: "LED", port: "1", color: "white" };
  }

  add() {
    this.props.addBlock(
      constructLedData(this.state.port, this.state.label, this.state.color)
    );
    this.setState({ label: "LED", port: "1", color: "white" });
  }

  render() {
    return (
      <Form onSubmit={e => e.preventDefault() && this.add()}>
        <Form.Item>
          <label>Label</label>
          <Input
            value={this.state.label}
            onChange={e =>
              this.setState({ ...this.state, label: e.currentTarget.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <label>Port</label>
          <Select
            value={this.state.port}
            onChange={e => this.setState({ ...this.state, port: e.toString() })}
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="5">5</Select.Option>
            <Select.Option value="6">6</Select.Option>
            <Select.Option value="7">7</Select.Option>
            <Select.Option value="8">8</Select.Option>
            <Select.Option value="9">9</Select.Option>
            <Select.Option value="10">10</Select.Option>
            <Select.Option value="11">11</Select.Option>
            <Select.Option value="12">12</Select.Option>
            <Select.Option value="13">13</Select.Option>
            <Select.Option value="A1">A1</Select.Option>
            <Select.Option value="A2">A2</Select.Option>
            <Select.Option value="A3">A3</Select.Option>
            <Select.Option value="A4">A4</Select.Option>
            <Select.Option value="A5">A5</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <label>Color</label>
          <Select
            value={this.state.color}
            onChange={c =>
              this.setState({ ...this.state, color: c.toString() })
            }
          >
            <Select.Option value="white">white</Select.Option>
            <Select.Option value="blue">blue</Select.Option>
            <Select.Option value="yellow">yellow</Select.Option>
            <Select.Option value="red">red</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={e => this.add()} type="primary">
            <Icon type="plus" />Add
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
