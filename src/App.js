import './App.css';
import Navbar from './Navbar.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header" id="home">
        <h1>IndoorNav Pro Prototype</h1>
        <p>Examples of maps we build</p>
      </header>

      <body className="App-body">
        <p style={{ fontSize: '18px' }} >Below is an example of one of our Pro maps.</p>
        <iframe
          title="map"
          id="myFrame"
          href="https://www.mappedin.com/"
          width="80%"
          height="600"
          src="https://app.mappedin.com/map/663e34658004177ee42bce3b?floor=m_f61d50016e33e723&utm_medium=email&_hsenc=p2ANqtz-_Jk3Dwc0xMPRhPeOP2X_n9RTqQl771BP6cPGqE-fkixvzKYh4XpASZi5FEiXYCdg-THdtogx3OHYyqkUKFonMPcKtBvFAejY53VIfIUMFqHIaQUl0&_hsmi=310348920&utm_content=310348920&utm_source=hs_email"
          
        ></iframe>
        <iframe class="w-100 tour-iframe d-block m-0"
        src="https://app.mappedin.com/map/660311437c0c4fe5b4cc4758?"
        height="600"
        width="80%"
        title="map2"
        id="myFrame"></iframe>
      </body>

    </div>
  );
}

export default App;
