import Parse from 'parse';
import { Record } from 'immutable';
import { withState, withHandlers, pipe, withLifecycle, } from '../../util';


const onCreate = ({ setData }) => {
  console.log('componentDidMount');
  const query = new Parse.Query('Person');
  query.find().then((response) => {
    setData((d) => d.set('personsList', response));
  });
};

const addPerson = ({ data, setData }) => () => {
  const obj = new Parse.Object('Person');
  obj.save({
    name: data.personName,
  }).then(() => setData((d) => d.merge({
    personName: undefined,
    personsList: d.personsList.concat(obj),
  })));
};

const setPersonName = ({ setData }) => (personName) => {
  setData((d) => d.set('personName', personName));
};

const deletePerson = ({ setData, data }) => (index) => {
  const selectedPerson = data.personsList[index];
  const query = new Parse.Query('Person');
  query.get(selectedPerson.id).then((response) => {
    response.destroy().then(() => setData((d) => d.set('personsList', d.personsList.filter((value, i) => i !== index))));
  });
};

const editPerson = ({ data, setData }) => (index) => {
  const selectedPerson = data.personsList[index].toJSON();
  setData((d) => d.merge({
    personName: selectedPerson.name,
    selectedPersonId: selectedPerson.objectId,
    selectedPersonIndex: index,
    editing: !data.editing,
  }));
};

const onSearch = ({ setData, data }) => (value) => {
  console.log('finding', value)
  const query = new Parse.Query('Person');
  query.contains('name', value);
  console.log('query', query)
  query.find().then((response) => {
    setData((d) => d.set('personsList', response));
  });
}

const confirmEdit = ({ setData, data }) => () => {
  const query = new Parse.Query('Person');
  query.get(data.selectedPersonId).then((response) => {
    response.save({
      name: data.personName,
    }).then((updatedPerson) => {
      const tempList = [...data.personsList];
      tempList.splice(data.selectedPersonIndex, 1, updatedPerson);
      setData((d) => d.merge({
        personsList: tempList,
        editing: !data.editing,
        personName: undefined,
      }));
    });
  });
};

const init = () => Record({
  personName: undefined,
  personsList: [],
  selectedPersonId: undefined,
  selectedPersonIndex: undefined,
  editing: false,
  personSearched: [],
});

const tableController = pipe(
  withState(() => init(), 'data', 'setData'),
  withHandlers({
    addPerson,
    setPersonName,
    onSearch,
    deletePerson,
    editPerson,
    confirmEdit,
  }),
  withLifecycle({
    onCreate,
  }),
);

export default tableController;
