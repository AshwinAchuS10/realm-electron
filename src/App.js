import React, { useEffect } from 'react';
import Realm from 'realm';
import './App.css';
import logo from './logo.svg';

// eslint-disable-next-line react-hooks/exhaustive-deps

function App() {

  async function initRealm() {
const realmApp = new Realm.App({ id: 'wawa-hbesp' }); // create a new instance of the Realm.App
    console.log('asas');
      let user = await realmApp.logIn(Realm.Credentials.anonymous());
      console.log('user: ', user);
    console.log('logIn: ');

    const KioskSchema = {
      name: 'Kiosk',
      properties: {
        _id: 'objectId',
        products: 'Product[]',
        storeId: 'objectId',
      },
      primaryKey: '_id',
    };

    const ProductSchema = {
      name: 'Product',
      properties: {
        _id: 'objectId',
        name: 'string',
        numInStock: 'int',
        price: 'double',
        storeId: 'objectId',
      },
      primaryKey: '_id',
    };

    const StoreSchema = {
      name: 'Store',
      properties: {
        _id: 'objectId',
        kiosks: 'Kiosk[]',
      },
      primaryKey: '_id',
    };

    const config = {
      schema: [ProductSchema, KioskSchema, StoreSchema],
      user: user,
      path: 'my.realm',
      sync: {
        flexible: true,
        user: realmApp.currentUser,
      },
    };
    let realm = null;
    console.log('1111 realm: ');

    // open a synced realm
    realm = await Realm.open(config);
    console.log('realm: ');

    realm.write(() => {
      realm.deleteAll();
    });

    const products = realm.objects('Product');
    console.log(`Main: Number of Product objects: ${products.length}`);  }
  useEffect( () => {
     initRealm();
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
