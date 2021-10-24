import React, { useCallback, useState } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import Datetime from 'react-datetime';
import { v4 as uuid } from "uuid";
// import moment from 'moment';
import "react-datetime/css/react-datetime.css";
import { IVoucher } from '../Model/Voucher.Model';
import { VoucherActions } from '../redux/Voucher.Action';
import { useDispatch } from 'react-redux';

type VoucherOptions = {
  value: string
  label: string
}

const voucherOptions: VoucherOptions[] = [
  { value: 'payment', label: 'Payment' },
  { value: 'sales', label: 'Sales' },
  { value: 'creditNote', label: 'Credit Note' },
  { value: 'journal', label: 'Journal' },
];

let currentdate = new Date();
let last4months = new Date(currentdate.setMonth(currentdate.getMonth() - 4));
let valid = function (current: any) {
  return current.isAfter(last4months);
};

const MyVerticallyCenteredModal = (props: any) => {
  const [voucherNumber, setVoucherNumber] = useState(0);
  const [voucherType, setVoucherType] = useState(voucherOptions);
  const [voucherData, setvoucherData] = useState([
    { accountName: '', debit: 0, credit: 0, narration: '' }
  ]);

  const dispatch = useDispatch();

  const handleChange = (index: any, event: any) => {
    const values = [...voucherData];
    if (event.target.name === 'accountName') {
      values[index].accountName = event.target.value
    } else if (event.target.name === 'debit' && event.target.value > 0) {
      values[index].debit = event.target.value
    } else if (event.target.name === 'credit' && event.target.value > 0) {
      values[index].credit = event.target.value
    } else if (event.target.name === 'narration') {
      values[index].narration = event.target.value
    }
    setvoucherData(values)
  }

  const handleInputChange = (e: any) => {
    setVoucherType(e.value)
  }

  const handleVoucherNumberChange = (e: any) => {
    setVoucherNumber(e.target.value)
  }

  const handleAddFields = () => {
    const values = [...voucherData];
    values.push({ accountName: '', debit: 0, credit: 0, narration: '' })
    setvoucherData(values);
  };

  const handleRemoveFields = () => {
    const values = [...voucherData];
    if (values.length > 1) values.pop();
    setvoucherData(values);
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault()
  //   alert(JSON.stringify(voucherData, null, 2))
  // }

  const handleSubmit = useCallback((e: any) => {
    let newVoucherdata = voucherData;
    if (!newVoucherdata) {
      console.error("Voucher Data should not be empty");
      return;
    }

    const voucherObject: IVoucher = {
      id: uuid(),
      voucherNumber: voucherNumber,
      voucherData: voucherData
    }

    dispatch(VoucherActions.CreateVoucher(voucherObject));
  }, [dispatch, voucherData, voucherNumber])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="voucherType">Voucher Type</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              name="voucherType"
              options={voucherType}
              defaultValue={voucherOptions[0]}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="voucherDate">Vocuher Date</label>
            <Datetime
              isValidDate={valid}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="voucherNumber">Voucher Number</label>
            <input
              type="text"
              className="form-control"
              name="voucherNumber"
              id="voucherNumber"
              placeholder="Type here"
              value={voucherNumber}
              onChange={handleVoucherNumberChange}
            />
          </div>
        </div>
        <Form>
          {
            voucherData.map((data, i) => {
              return (
                <Row className='mt-3' key={i}>
                  <Col xs={4}>
                    <Form.Group controlId="formAccountName">
                      <Form.Label>Account Name</Form.Label>
                      <Form.Control type="text" placeholder="Mehta (90475)" name="accountName"
                        value={data.accountName} onChange={event => handleChange(i, event)} />
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group controlId="formDebit">
                      <Form.Label>Debit</Form.Label>
                      <Form.Control type="number" placeholder="0" name="debit"
                        value={data.debit} onChange={event => handleChange(i, event)} />
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group controlId="formCredit">
                      <Form.Label>Credit</Form.Label>
                      <Form.Control type="number" placeholder="0" name="credit"
                        value={data.credit} onChange={event => handleChange(i, event)} />
                    </Form.Group>
                  </Col>
                  <Row>
                    <Form.Group controlId="formNarration">
                      <Form.Label>Narration</Form.Label>
                      <Form.Control type="text" placeholder="Type here" name="narration"
                        value={data.narration} onChange={event => handleChange(i, event)} />
                    </Form.Group>
                  </Row>
                </Row>
              )
            })
          }
          <Row>
            <Col className='pt-3 d-flex justify-content-between'>
              <Button variant="warning" onClick={handleAddFields}>Add More</Button>
              <div className="col-md-3 mb-3">
                <label htmlFor="debitAmount">Dr. 10000</label>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="creditAmount">Cr. 10000</label>
              </div>
              <Button variant="danger" onClick={handleRemoveFields}>Remove</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;

