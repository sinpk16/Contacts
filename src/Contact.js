import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: '',
      contactData: [
        {
          name: 'Abet',
          phone: '010-0000-0001',
        },
        {
          name: 'Betty',
          phone: '010-0000-0002',
        },
        {
          name: 'Charlie',
          phone: '010-0000-0003',
        },
        {
          name: 'Duty',
          phone: '010-0000-0004',
        },
      ],
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);

    this._handleCreate = this._handleCreate.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
  }

  _handleCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData, { $push: [contact] }),
    });
  }

  _handleRemove() {
    if (this.state.selectedKey < 0) {
      return;
    }

    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]],
      }),
      selectedKey: -1,
    });
  }

  _handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: { $set: name },
          phone: { $set: phone },
        },
      }),
    });
  }

  _handleChange(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  _handleClick(key) {
    this.setState({
      selectedKey: key,
    });

    console.log(key, 'is selected');
  }

  render() {
    const mapToComponent = data => {
      data.sort();
      data = data.filter(contact => {
        return (
          contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) >
          -1
        );
      });
      return data.map((contact, idx) => {
        return (
          <ContactInfo
            contact={contact}
            key={idx}
            onClick={() => this._handleClick(idx)}
          />
        );
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this._handleChange}
        />
        {mapToComponent(this.state.contactData)}
        <ContactDetails
          isSelected={this.state.selectedKey != -1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this._handleRemove}
          onEdit={this._handleEdit}
        />
        <ContactCreate onCreate={this._handleCreate} />
      </div>
    );
  }
}
